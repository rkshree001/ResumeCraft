import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Resume templates
export const templates = pgTable("templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(), // modern, classic, creative, etc.
  description: text("description"),
  isPremium: boolean("is_premium").default(false),
  previewImage: varchar("preview_image"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User resumes
export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  templateId: varchar("template_id").notNull().references(() => templates.id),
  title: varchar("title").notNull(),
  personalInfo: jsonb("personal_info"), // name, email, phone, address, etc.
  summary: text("summary"),
  experiences: jsonb("experiences"), // array of experience objects
  education: jsonb("education"), // array of education objects
  skills: jsonb("skills"), // array of skill objects
  projects: jsonb("projects"), // array of project objects
  certifications: jsonb("certifications"), // array of certification objects
  languages: jsonb("languages"), // array of language proficiency objects
  awards: jsonb("awards"), // array of awards and honors
  volunteering: jsonb("volunteering"), // array of volunteer experience
  interests: jsonb("interests"), // array of interests and hobbies
  customSections: jsonb("custom_sections"), // additional sections
  settings: jsonb("settings"), // color scheme, font, etc.
  isPublic: boolean("is_public").default(false),
  viewCount: integer("view_count").default(0),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Resume shares (for public links)
export const resumeShares = pgTable("resume_shares", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resumeId: varchar("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
  shareToken: varchar("share_token").notNull().unique(),
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Job Applications table
export const jobApplications = pgTable("job_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  company: varchar("company").notNull(),
  position: varchar("position").notNull(),
  location: varchar("location"),
  salary: varchar("salary"),
  status: varchar("status").notNull().default("applied"), // applied, interview, offer, rejected
  appliedDate: timestamp("applied_date").notNull(),
  jobUrl: varchar("job_url"),
  notes: text("notes"),
  resumeId: varchar("resume_id").references(() => resumes.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Export schemas and types
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTemplateSchema = createInsertSchema(templates).omit({ id: true, createdAt: true });
export const insertResumeSchema = createInsertSchema(resumes).omit({ id: true, createdAt: true, updatedAt: true, viewCount: true, downloadCount: true });
export const insertResumeShareSchema = createInsertSchema(resumeShares).omit({ id: true, createdAt: true });
export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({ id: true, createdAt: true, updatedAt: true });

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type ResumeShare = typeof resumeShares.$inferSelect;
export type InsertResumeShare = z.infer<typeof insertResumeShareSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
