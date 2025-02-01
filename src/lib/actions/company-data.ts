"use server";

import * as z from "zod";
import { formSchema } from "@/components/company-form/schema";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { companyData } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export const getCompaniesData = async () => {
  const data = await db.select().from(companyData);
  return data;
};

export const addCompanyData = async (
  id: string,
  values: z.infer<typeof formSchema>
) => {
  const finalData = {
    ...values,
    domains: values.domains.join(",") as string,
  };

  await db.insert(companyData).values({ ...finalData, id });

  revalidatePath("/profile");
};

export const deleteCompanyData = async (id: string) => {
  await db.delete(companyData).where(eq(companyData.id, id));

  revalidatePath("/profile");
};

export const editCompanyData = async (
  id: string,
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
