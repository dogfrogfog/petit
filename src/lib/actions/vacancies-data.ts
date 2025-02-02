"use server";

import * as z from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { vacancyData } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { formSchema } from "@/components/vacancy-form/schema";

export async function getVacancy(id: string) {
  const data = await db
    .select()
    .from(vacancyData)
    .where(eq(vacancyData.id, parseInt(id)));

  return data;
}

export async function getVacancies() {
  const data = await db.select().from(vacancyData);

  return data;
}

export async function getVacancyData(id: number) {
  const data = await db
    .select()
    .from(vacancyData)
    .where(eq(vacancyData.id, id));

  return data;
}

export const getProjectVacanciesData = async (projectId: number) => {
  const data = await db
    .select()
    .from(vacancyData)
    .where(eq(vacancyData.projectId, projectId));

  return data;
};

export const addVacancyData = async (
  _: number,
  values: z.infer<typeof formSchema> & { projectId: number; companyId: number }
) => {
  const finalData = {
    ...values,
    status: values.status || "open",
  };

  console.log("finalDatafinalDatafinalDatafinalDatafinalData: ", finalData);

  await db.insert(vacancyData).values(finalData);

  revalidatePath("/dashboard/projects");
};

export const deleteVacancyData = async (id: number) => {
  await db.delete(vacancyData).where(eq(vacancyData.id, id));

  revalidatePath("/dashboard/projects");
};

export const editVacancyData = async (
  id: number,
  values: z.infer<typeof formSchema>
) => {
  const finalData = {
    ...values,
    updatedAt: new Date(),
  };

  console.log("finalData");
  console.log(id, finalData);

  const result = await db
    .update(vacancyData)
    .set(finalData)
    .where(eq(vacancyData.id, id))
    .returning();

  console.log("result");
  console.log(result);

  revalidatePath("/dashboard/projects");
};
