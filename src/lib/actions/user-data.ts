"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { userData } from "@/lib/db/schema";

export const getUsersData = async () => {
  const data = await db.select().from(userData);

  return data;
};

export const addUserData = async (data: unknown) => {
  console.log("data121212: ", data);

  return {};

  await db.insert(userData).values(data);
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
