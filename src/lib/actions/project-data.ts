"use server";

import * as z from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { projectData } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { formSchema } from "@/components/project-form/schema";

export async function getProjectData(id: number) {
  const data = await db
    .select()
    .from(projectData)
    .where(eq(projectData.id, id));

  return data;
}

export const getCompanyProjectsData = async (companyId: number) => {
  const data = await db
    .select()
    .from(projectData)
    .where(eq(projectData.companyId, companyId));

  return data;
};

export const getProjectsData = async () => {
  const data = await db.select().from(projectData);

  return data;
};

export const addProjectData = async (
  id: number,
  values: z.infer<typeof formSchema> & { companyId: number }
) => {
  const finalData = {
    ...values,
    status: values.status || "open",
  };

  await db.insert(projectData).values(finalData);

  revalidatePath("/dashboard/projects");
};

export const deleteProjectData = async (id: number) => {
  await db.delete(projectData).where(eq(projectData.id, id));

  revalidatePath("/dashboard/projects");
};

export const editProjectData = async (
  id: number,
  values: z.infer<typeof formSchema>
) => {
  const finalData = {
    ...values,
    updatedAt: new Date(),
  };

  await db
    .update(projectData)
    .set(finalData)
    .where(eq(projectData.id, id))
    .returning({ companyId: projectData.companyId });

  revalidatePath("/dashboard/projects");
};
