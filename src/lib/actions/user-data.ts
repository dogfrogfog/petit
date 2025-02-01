"use server";

import * as z from "zod";
import { formSchema } from "@/components/profile-form/schema";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { userData } from "@/lib/db/schema";

export const getUsersData = async () => {
  const data = await db.select().from(userData);

  return data;
};

export const addUserData = async (values: z.infer<typeof formSchema>) => {
  const finalData = {
    ...values,
    projectRoles: values.projectRoles.join(",") as string,
    projectDomains: values.projectDomains.join(",") as string,
    spokenLanguages: values.spokenLanguages.join(",") as string,
    programmingLanguages: values.programmingLanguages.join(",") as string,
  };

  await db.insert(userData).values(finalData);
};

export const deleteUserData = async (userId: string) => {
  await db.delete(userData).where(eq(userData.userId, userId));
};

export const editUserData = async ({
  userId,
  type,
  description,
}: {
  userId: string;
  type: "person" | "company";
  description: string;
}) => {
  await db
    .update(userData)
    .set({
      type,
      description,
    })
    .where(eq(userData.userId, userId));
};
