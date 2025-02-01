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

export const addProjectData = async (
  id: number,
  values: z.infer<typeof formSchema> & { companyId: number }
) => {
  const finalData = {
    ...values,
    status: values.status || "open",
  };

  await db.insert(projectData).values(finalData);

  revalidatePath("/profile/projects");
};

export const deleteProjectData = async (id: number) => {
  await db.delete(projectData).where(eq(projectData.id, id));

  revalidatePath("/profile/projects");
};

export const editProjectData = async (
  id: number,
  values: z.infer<typeof formSchema>
) => {
  const finalData = {
    ...values,
    updatedAt: new Date(),
  };

  console.log("ididididiididid: ", id);
  console.log("finalDatafinalDatafinalData: ", finalData);

  const a = await db
    .update(projectData)
    .set(finalData)
    .where(eq(projectData.id, id))
    .returning({ companyId: projectData.companyId });

  console.log("a_________", a);

  revalidatePath("/profile/projects");
};
