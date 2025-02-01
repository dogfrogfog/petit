"use server";

import * as z from "zod";
import { formSchema } from "@/components/company-form/schema";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { companyData } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { userData } from "@/lib/db/schema";

export const getCompaniesData = async () => {
  const data = await db.select().from(companyData);

  return data;
};

export const addCompanyData = async (
  id: number,
  values: z.infer<typeof formSchema> & { userId: string }
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

  revalidatePath("/profile");
};

export const deleteCompanyData = async (id: number) => {
  await db.delete(companyData).where(eq(companyData.id, id));

  revalidatePath("/profile");
};

export const editCompanyData = async (
  id: number,
  values: z.infer<typeof formSchema>
) => {
  const finalData = {
    ...values,
    updatedAt: new Date(),
    domains: values.domains?.length ? values.domains.join(",") : "",
  };

  await db.update(companyData).set(finalData).where(eq(companyData.id, id));

  revalidatePath("/profile");
};
