import { relations } from "drizzle-orm";
import { text, pgTable, timestamp, integer } from "drizzle-orm/pg-core";

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
  companyId: integer("companyId"),
});

export const userRelations = relations(userData, ({ many, one }) => ({
  applications: many(applicationData),
  company: one(companyData, {
    fields: [userData.companyId],
    references: [companyData.id],
  }),
}));

export const companyData = pgTable("companyData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  name: text("name").notNull(),
  domains: text("projectDomains").notNull(),
  size: text("number").notNull(),
  location: text("location").notNull(),
  url: text("url").notNull(),
  userId: text("userId").notNull(),
});

export const companyRelations = relations(companyData, ({ many, one }) => ({
  user: one(userData, {
    fields: [companyData.userId],
    references: [userData.userId],
  }),
  vacancies: many(vacancyData),
  applications: many(applicationData),
  projects: many(projectData),
}));

export const projectData = pgTable("projectData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  name: text("name").notNull(),
  status: text("status").$type<"open" | "closed">().notNull(),
  description: text("description").notNull(),
  url: text("url"),
  companyId: integer("companyId").notNull(),
  logo: text("projectLogo"),
  domain: text("domain").notNull(),
});

export const projectsRelations = relations(projectData, ({ many, one }) => ({
  vacancies: many(vacancyData),
  company: one(companyData, {
    fields: [projectData.companyId],
    references: [companyData.id],
  }),
}));

export const vacancyData = pgTable("vacancyData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: integer("projectId").notNull(),
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
  companyId: integer("companyId").notNull(),
});

export const vacancyRelations = relations(vacancyData, ({ one, many }) => ({
  project: one(projectData, {
    fields: [vacancyData.projectId],
    references: [projectData.id],
  }),
  company: one(companyData, {
    fields: [vacancyData.companyId],
    references: [companyData.id],
  }),
  applications: many(applicationData),
}));

export const applicationData = pgTable("applicationData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  status: text("status").$type<"pending" | "accepted" | "rejected">().notNull(),
  companyId: integer("companyId").notNull(),
  vacancyId: text("vacancyId").notNull(),
  userId: text("userId").notNull(),
});

export const applicationRelations = relations(applicationData, ({ one }) => ({
  user: one(userData, {
    fields: [applicationData.userId],
    references: [userData.userId],
  }),
  vacancy: one(vacancyData, {
    fields: [applicationData.vacancyId],
    references: [vacancyData.id],
  }),
  company: one(companyData, {
    fields: [applicationData.companyId],
    references: [companyData.id],
  }),
}));
