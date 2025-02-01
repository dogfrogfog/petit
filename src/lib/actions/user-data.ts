"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { userData } from "@/lib/db/schema";

export const getUsersData = async () => {
  const data = await db.select().from(userData);

  return data;
};

export const addUserData = async ({
  userId,
  type,
  description,
}: {
  userId: string;
  type: "person" | "company";
  description: string;
}) => {
  await db.insert(userData).values({
    userId,
    type,
    description,
  });
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
