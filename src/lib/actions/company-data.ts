"use server";

import * as z from "zod";
import { formSchema } from "@/components/company-form/schema";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { companyData, projectData, userData } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

type Company = typeof companyData.$inferSelect;
type Project = typeof projectData.$inferSelect;

type CompanyWithProjects = {
  company: Company | null;
  projects: Project[];
};

type CompanyDataReturn<T extends boolean> = T extends true
  ? CompanyWithProjects
  : Company[];

export async function getCompanyData<T extends boolean = false>(
  userId: string,
  includeProjects: T = false as T,
): Promise<CompanyDataReturn<T>> {
  if (includeProjects) {
    const result = await db
      .select({
        company: companyData,
        projects: projectData,
      })
      .from(companyData)
      .leftJoin(projectData, eq(projectData.companyId, companyData.id))
      .where(eq(companyData.userId, userId));

    if (result.length === 0) {
      return {
        company: null,
        projects: [],
      } as CompanyWithProjects as CompanyDataReturn<T>;
    }

    const company = result[0].company;
    const projects = result
      .filter(
        (
          row,
        ): row is typeof row & { projects: NonNullable<typeof row.projects> } =>
          row.projects !== null,
      )
      .map((row) => row.projects);

    return {
      company,
      projects,
    } as CompanyWithProjects as CompanyDataReturn<T>;
  } else {
    const data = await db
      .select()
      .from(companyData)
      .where(eq(companyData.userId, userId));

    return data as CompanyDataReturn<T>;
  }
}

export const getCompaniesData = async () => {
  const data = await db.select().from(companyData);

  return data;
};

export const addCompanyData = async (
  id: number,
  values: z.infer<typeof formSchema> & { userId: string },
) => {
  const finalData = {
    ...values,
    domains: values.domains.join(",") as string,
  };

  const [newCompany] = await db
    .insert(companyData)
    .values(finalData)
    .returning({ id: companyData.id });

  await db
    .update(userData)
    .set({ companyId: newCompany.id })
    .where(eq(userData.userId, values.userId));

  revalidatePath("/dashboard/company");
};

export const deleteCompanyData = async (id: number) => {
  await db.delete(companyData).where(eq(companyData.id, id));

  revalidatePath("/dashboard/company");
};

export const editCompanyData = async (
  id: number,
  values: z.infer<typeof formSchema>,
) => {
  const finalData = {
    ...values,
    updatedAt: new Date(),
    domains: values.domains?.length ? values.domains.join(",") : "",
  };

  await db.update(companyData).set(finalData).where(eq(companyData.id, id));

  revalidatePath("/dashboard/company");
};

export async function deleteCompanyWithProjects(companyId: number) {
  await db.transaction(async (tx) => {
    await tx.delete(projectData).where(eq(projectData.companyId, companyId));
    await tx.delete(companyData).where(eq(companyData.id, companyId));
  });

  revalidatePath("/dashboard/company");
  revalidatePath("/dashboard/projects");
}
