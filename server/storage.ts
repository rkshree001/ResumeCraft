import {
  users,
  templates,
  resumes,
  resumeShares,
  jobApplications,
  type User,
  type UpsertUser,
  type Template,
  type InsertTemplate,
  type Resume,
  type InsertResume,
  type ResumeShare,
  type InsertResumeShare,
  type JobApplication,
  type InsertJobApplication,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Template operations
  getAllTemplates(): Promise<Template[]>;
  getTemplate(id: string): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  clearAllTemplates(): Promise<void>;
  
  // Resume operations
  getUserResumes(userId: string): Promise<Resume[]>;
  getResume(id: string): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume>;
  deleteResume(id: string): Promise<void>;
  incrementResumeView(id: string): Promise<void>;
  incrementResumeDownload(id: string): Promise<void>;
  
  // Resume sharing operations
  createResumeShare(share: InsertResumeShare): Promise<ResumeShare>;
  getResumeByShareToken(token: string): Promise<Resume | undefined>;
  deactivateResumeShare(id: string): Promise<void>;
  
  // Job application operations
  createJobApplication(userId: string, jobData: Omit<InsertJobApplication, 'userId'>): Promise<JobApplication>;
  getUserJobApplications(userId: string): Promise<JobApplication[]>;
  getJobApplication(id: string): Promise<JobApplication | undefined>;
  updateJobApplication(id: string, jobData: Partial<Omit<InsertJobApplication, 'userId'>>): Promise<JobApplication>;
  deleteJobApplication(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Template operations
  async getAllTemplates(): Promise<Template[]> {
    return await db.select().from(templates).orderBy(templates.name);
  }

  async getTemplate(id: string): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template;
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const [newTemplate] = await db.insert(templates).values(template).returning();
    return newTemplate;
  }
  
  async clearAllTemplates(): Promise<void> {
    await db.delete(templates);
  }

  // Resume operations
  async getUserResumes(userId: string): Promise<Resume[]> {
    return await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, userId))
      .orderBy(desc(resumes.updatedAt));
  }

  async getResume(id: string): Promise<Resume | undefined> {
    const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
    return resume;
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const [newResume] = await db.insert(resumes).values(resume).returning();
    return newResume;
  }

  async updateResume(id: string, resumeData: Partial<InsertResume>): Promise<Resume> {
    const [updatedResume] = await db
      .update(resumes)
      .set({ ...resumeData, updatedAt: new Date() })
      .where(eq(resumes.id, id))
      .returning();
    return updatedResume;
  }

  async deleteResume(id: string): Promise<void> {
    await db.delete(resumes).where(eq(resumes.id, id));
  }

  async incrementResumeView(id: string): Promise<void> {
    await db
      .update(resumes)
      .set({ viewCount: sql`view_count + 1` })
      .where(eq(resumes.id, id));
  }

  async incrementResumeDownload(id: string): Promise<void> {
    await db
      .update(resumes)
      .set({ downloadCount: sql`download_count + 1` })
      .where(eq(resumes.id, id));
  }

  // Resume sharing operations
  async createResumeShare(share: InsertResumeShare): Promise<ResumeShare> {
    const [newShare] = await db.insert(resumeShares).values(share).returning();
    return newShare;
  }

  async getResumeByShareToken(token: string): Promise<Resume | undefined> {
    const [share] = await db
      .select()
      .from(resumeShares)
      .where(and(eq(resumeShares.shareToken, token), eq(resumeShares.isActive, true)));
    
    if (!share) return undefined;
    
    const [resume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, share.resumeId));
    
    return resume;
  }

  async deactivateResumeShare(id: string): Promise<void> {
    await db
      .update(resumeShares)
      .set({ isActive: false })
      .where(eq(resumeShares.id, id));
  }
  // Job application methods
  async createJobApplication(userId: string, jobData: Omit<InsertJobApplication, 'userId'>): Promise<JobApplication> {
    const [job] = await db
      .insert(jobApplications)
      .values({ ...jobData, userId })
      .returning();
    return job;
  }

  async getUserJobApplications(userId: string): Promise<JobApplication[]> {
    return db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.userId, userId))
      .orderBy(desc(jobApplications.appliedDate));
  }

  async getJobApplication(id: string): Promise<JobApplication | undefined> {
    const [job] = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.id, id));
    return job;
  }

  async updateJobApplication(id: string, jobData: Partial<Omit<InsertJobApplication, 'userId'>>): Promise<JobApplication> {
    const [job] = await db
      .update(jobApplications)
      .set({ ...jobData, updatedAt: new Date() })
      .where(eq(jobApplications.id, id))
      .returning();
    return job;
  }

  async deleteJobApplication(id: string): Promise<void> {
    await db
      .delete(jobApplications)
      .where(eq(jobApplications.id, id));
  }
}

export const storage = new DatabaseStorage();
