"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { companyData, projectData } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function getCompanyWithProjects(userId: string) {
  const result = await db
    .select({
      company: companyData,
      projects: projectData,
    })
    .from(companyData)
    .leftJoin(projectData, eq(projectData.companyId, companyData.id))
    .where(eq(companyData.userId, userId));

  if (result.length === 0) {
    return { company: null, projects: [] };
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

  return { company, projects };
}

export async function deleteCompanyWithProjects(companyId: number) {
  await db.transaction(async (tx) => {
    await tx.delete(projectData).where(eq(projectData.companyId, companyId));
    await tx.delete(companyData).where(eq(companyData.id, companyId));
  });

  revalidatePath("/dashboard/company");
  revalidatePath("/dashboard/projects");
}
