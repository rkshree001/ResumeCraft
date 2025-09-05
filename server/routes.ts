import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertResumeSchema, insertTemplateSchema, insertResumeShareSchema, insertJobApplicationSchema } from "@shared/schema";
import { randomBytes } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Template routes
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  app.post("/api/templates", isAuthenticated, async (req, res) => {
    try {
      const templateData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(templateData);
      res.status(201).json(template);
    } catch (error) {
      console.error("Error creating template:", error);
      res.status(400).json({ message: "Failed to create template" });
    }
  });

  // Resume routes
  app.get("/api/resumes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumes = await storage.getUserResumes(userId);
      res.json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.get("/api/resumes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      // Check if user owns this resume
      const userId = req.user.claims.sub;
      if (resume.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  app.post("/api/resumes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumeData = insertResumeSchema.parse({
        ...req.body,
        userId,
      });
      const resume = await storage.createResume(resumeData);
      res.status(201).json(resume);
    } catch (error) {
      console.error("Error creating resume:", error);
      res.status(400).json({ message: "Failed to create resume" });
    }
  });

  app.patch("/api/resumes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const resumeId = req.params.id;
      const userId = req.user.claims.sub;
      
      // Check if user owns this resume
      const existingResume = await storage.getResume(resumeId);
      if (!existingResume || existingResume.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const resumeData = insertResumeSchema.partial().parse(req.body);
      const updatedResume = await storage.updateResume(resumeId, resumeData);
      res.json(updatedResume);
    } catch (error) {
      console.error("Error updating resume:", error);
      res.status(400).json({ message: "Failed to update resume" });
    }
  });

  app.delete("/api/resumes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const resumeId = req.params.id;
      const userId = req.user.claims.sub;
      
      // Check if user owns this resume
      const existingResume = await storage.getResume(resumeId);
      if (!existingResume || existingResume.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deleteResume(resumeId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting resume:", error);
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  // Resume analytics
  app.post("/api/resumes/:id/view", async (req, res) => {
    try {
      await storage.incrementResumeView(req.params.id);
      res.status(200).json({ message: "View recorded" });
    } catch (error) {
      console.error("Error recording view:", error);
      res.status(500).json({ message: "Failed to record view" });
    }
  });

  app.post("/api/resumes/:id/download", async (req, res) => {
    try {
      await storage.incrementResumeDownload(req.params.id);
      res.status(200).json({ message: "Download recorded" });
    } catch (error) {
      console.error("Error recording download:", error);
      res.status(500).json({ message: "Failed to record download" });
    }
  });

  // Resume sharing
  app.post("/api/resumes/:id/share", isAuthenticated, async (req: any, res) => {
    try {
      const resumeId = req.params.id;
      const userId = req.user.claims.sub;
      
      // Check if user owns this resume
      const existingResume = await storage.getResume(resumeId);
      if (!existingResume || existingResume.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const shareToken = randomBytes(32).toString('hex');
      const shareData = insertResumeShareSchema.parse({
        resumeId,
        shareToken,
      });
      
      const share = await storage.createResumeShare(shareData);
      res.status(201).json(share);
    } catch (error) {
      console.error("Error creating share:", error);
      res.status(400).json({ message: "Failed to create share" });
    }
  });

  app.get("/api/shared/:token", async (req, res) => {
    try {
      const resume = await storage.getResumeByShareToken(req.params.token);
      if (!resume) {
        return res.status(404).json({ message: "Shared resume not found" });
      }
      
      // Record view
      await storage.incrementResumeView(resume.id);
      
      res.json(resume);
    } catch (error) {
      console.error("Error fetching shared resume:", error);
      res.status(500).json({ message: "Failed to fetch shared resume" });
    }
  });

  // Initialize default templates
  app.post("/api/init-templates", async (req, res) => {
    try {
      const defaultTemplates = [
        {
          name: "Modern Professional",
          category: "modern",
          description: "Clean and contemporary design",
          isPremium: false,
        },
        {
          name: "Classic Traditional",
          category: "classic",
          description: "Time-tested professional format",
          isPremium: false,
        },
        {
          name: "Creative Bold",
          category: "creative",
          description: "Stand out with unique design",
          isPremium: true,
        },
        {
          name: "Minimalist Clean",
          category: "minimal",
          description: "Simple and elegant layout",
          isPremium: false,
        },
        {
          name: "Executive",
          category: "executive",
          description: "Professional leadership template",
          isPremium: true,
        },
      ];

      const templates = [];
      for (const template of defaultTemplates) {
        const created = await storage.createTemplate(template);
        templates.push(created);
      }
      
      res.json(templates);
    } catch (error) {
      console.error("Error initializing templates:", error);
      res.status(500).json({ message: "Failed to initialize templates" });
    }
  });

  // Job Application routes
  app.get("/api/job-applications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const jobs = await storage.getUserJobApplications(userId);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Failed to fetch job applications" });
    }
  });

  app.post("/api/job-applications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const jobData = insertJobApplicationSchema.parse(req.body);
      const job = await storage.createJobApplication(userId, jobData);
      res.status(201).json(job);
    } catch (error) {
      console.error("Error creating job application:", error);
      res.status(400).json({ message: "Failed to create job application" });
    }
  });

  app.patch("/api/job-applications/:id", isAuthenticated, async (req: any, res) => {
    try {
      const job = await storage.updateJobApplication(req.params.id, req.body);
      res.json(job);
    } catch (error) {
      console.error("Error updating job application:", error);
      res.status(400).json({ message: "Failed to update job application" });
    }
  });

  app.delete("/api/job-applications/:id", isAuthenticated, async (req: any, res) => {
    try {
      await storage.deleteJobApplication(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting job application:", error);
      res.status(400).json({ message: "Failed to delete job application" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
