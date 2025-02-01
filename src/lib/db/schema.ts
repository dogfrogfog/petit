import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const userData = pgTable("userData", {
  userId: text("userId").primaryKey(),
  type: text("type").$type<"person" | "company">().notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
