"use server";

import * as z from "zod";
import { formSchema } from "@/components/profile-form/schema";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { userData } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export const getUsersData = async () => {
  const data = await db.select().from(userData);

  return data;
};

export const addUserData = async (
  userId: string,
  values: z.infer<typeof formSchema>
) => {
  const finalData = {
    ...values,
    projectRoles: values.projectRoles.join(",") as string,
    projectDomains: values.projectDomains.join(",") as string,
    spokenLanguages: values.spokenLanguages.join(",") as string,
    programmingLanguages: values.programmingLanguages.join(",") as string,
  };

  await db.insert(userData).values({ ...finalData, userId });

  revalidatePath("/profile");
};

export const deleteUserData = async (userId: string) => {
  await db.delete(userData).where(eq(userData.userId, userId));

  revalidatePath("/profile");
};

export const editUserData = async (
  userId: string,
  values: z.infer<typeof formSchema>
) => {
  const finalData = {
    ...values,
    updatedAt: new Date(),
    projectRoles: values.projectRoles?.length
      ? values.projectRoles.join(",")
      : "",
    projectDomains: values.projectDomains?.length
      ? values.projectDomains.join(",")
      : "",
    spokenLanguages: values.spokenLanguages?.length
      ? values.spokenLanguages.join(",")
      : "",
    programmingLanguages: values.programmingLanguages?.length
      ? values.programmingLanguages.join(",")
      : "",
  };

  await db.update(userData).set(finalData).where(eq(userData.userId, userId));

  revalidatePath("/profile");
};
