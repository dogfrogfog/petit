import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const userData = pgTable("userData", {
  userId: text("userId").primaryKey(),
  name: text("name").notNull(),
  lastName: text("lastName").notNull(),
  userName: text("userName").unique().notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  projectRoles: text("projectRoles").notNull(),
  projectDomains: text("projectDomains").notNull(),
  expertiseLevel: text("expertiseLevel").notNull(),
  spokenLanguages: text("spokenLanguages").notNull(),
  programmingLanguages: text("programmingLanguages").notNull(),
});
