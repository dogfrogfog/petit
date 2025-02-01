import { relations } from "drizzle-orm";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const userData = pgTable("userData", {
  userId: text("userId").primaryKey(),
  name: text("name").notNull(),
  lastName: text("lastName").notNull(),
  userName: text("userName").unique().notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  projectRoles: text("projectRoles").notNull(),
  projectDomains: text("projectDomains").notNull(),
  expertiseLevel: text("expertiseLevel").notNull(),
  spokenLanguages: text("spokenLanguages").notNull(),
  programmingLanguages: text("programmingLanguages").notNull(),
});

export const companyData = pgTable("companyData", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  name: text("name").notNull(),
  domains: text("projectDomains").notNull(),
  size: text("number").notNull(),
  location: text("location").notNull(),
  url: text("url").notNull(),
});

export const projectData = pgTable("projectData", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  name: text("name").notNull(),
  status: text("status").$type<"open" | "closed">().notNull(),
  description: text("description").notNull(),
});

export const vacancyData = pgTable("vacancyData", {
  projectId: text("projectId").notNull(),
  id: text("id").primaryKey(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  status: text("status").$type<"open" | "closed">().notNull(),
  salary: text("salary").notNull(),
  projectRoles: text("projectRoles").notNull(),
  projectDomains: text("projectDomains").notNull(),
  expertiseLevel: text("expertiseLevel").notNull(),
  location: text("location").notNull(),
});

export const applicationData = pgTable("applicationData", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  userId: text("userId").notNull(),
  vacancyId: text("vacancyId").notNull(),
  status: text("status").$type<"pending" | "accepted" | "rejected">().notNull(),
});

export const vacanciesRelations = relations(vacancyData, ({ one }) => ({
  project: one(projectData, {
    fields: [vacancyData.projectId],
    references: [projectData.id],
  }),
}));

export const projectsRelations = relations(projectData, ({ many }) => ({
  vacancies: many(vacancyData),
}));

export const applicationsRelations = relations(applicationData, ({ one }) => ({
  user: one(userData, {
    fields: [applicationData.userId],
    references: [userData.userId],
  }),
  vacancy: one(vacancyData, {
    fields: [applicationData.vacancyId],
    references: [vacancyData.id],
  }),
}));

export const userRelations = relations(userData, ({ many }) => ({
  applications: many(applicationData),
}));

export const vacancyApplicationsRelations = relations(
  vacancyData,
  ({ many }) => ({
    applications: many(applicationData),
  })
);
