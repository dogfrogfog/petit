"use server";

import { db } from "@/lib/db/drizzle";
import { applicationData } from "@/lib/db/schema";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getUserApplicationsData = async (userId: string) => {
  const data = await db
    .select()
    .from(applicationData)
    .where(eq(applicationData.userId, userId));

  return data;
};

export const getProjectApplicationsData = async (vacancyId: string) => {
  const data = await db
    .select()
    .from(applicationData)
    .where(eq(applicationData.vacancyId, vacancyId));

  return data;
};

export const addApplicationData = async ({
  userId,
  companyId,
  vacancyId,
}: {
  userId: string;
  companyId: number;
  vacancyId: string;
}) => {
  await db.insert(applicationData).values({
    userId,
    companyId,
    vacancyId,
    status: "pending",
  });

  revalidatePath("/dashboard/applications");
};

export const deleteApplicationData = async (id: number) => {
  await db.delete(applicationData).where(eq(applicationData.id, id));

  revalidatePath("/dashboard/applications");
};

export const updateApplicationStatus = async (
  id: number,
  status: "accepted" | "rejected"
) => {
  await db
    .update(applicationData)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(applicationData.id, id));

  revalidatePath("/dashboard/applications");
};
