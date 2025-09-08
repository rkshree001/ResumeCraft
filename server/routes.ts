import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeSchema, insertTemplateSchema, insertResumeShareSchema, insertJobApplicationSchema } from "@shared/schema";
import { randomBytes } from "crypto";
import { registerAdvancedTemplateRoutes } from "./advanced-template-routes";

export async function registerRoutes(app: Express): Promise<Server> {

  // Mock user for demo purposes
  app.get('/api/auth/user', async (req: any, res) => {
    res.json({ 
      id: 'demo-user', 
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User' 
    });
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

  app.post("/api/templates", async (req, res) => {
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
  app.get("/api/resumes", async (req: any, res) => {
    try {
      const userId = 'demo-user';
      const resumes = await storage.getUserResumes(userId);
      res.json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.get("/api/resumes/:id", async (req: any, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  app.post("/api/resumes", async (req: any, res) => {
    try {
      const userId = 'demo-user';
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

  app.patch("/api/resumes/:id", async (req: any, res) => {
    try {
      const resumeId = req.params.id;
      
      const resumeData = insertResumeSchema.partial().parse(req.body);
      const updatedResume = await storage.updateResume(resumeId, resumeData);
      res.json(updatedResume);
    } catch (error) {
      console.error("Error updating resume:", error);
      res.status(400).json({ message: "Failed to update resume" });
    }
  });

  app.delete("/api/resumes/:id", async (req: any, res) => {
    try {
      const resumeId = req.params.id;
      
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
  app.post("/api/resumes/:id/share", async (req: any, res) => {
    try {
      const resumeId = req.params.id;
      
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

  // Initialize all 200+ templates with AI suggestions and ATS optimization
  app.post("/api/init-templates", async (req, res) => {
    try {
      // Import template generator (dynamic import to avoid build issues)
      const { generateAllTemplates } = await import("../client/src/lib/template-generator.js");
      const allTemplates = generateAllTemplates();
      
      const createdTemplates = [];
      
      // Clear existing templates if reinitializing
      if (req.body.clearExisting) {
        await storage.clearAllTemplates();
      }
      
      // Create templates in batches to avoid overwhelming the database
      const batchSize = 10;
      for (let i = 0; i < allTemplates.length; i += batchSize) {
        const batch = allTemplates.slice(i, i + batchSize);
        
        for (const templateData of batch) {
          try {
            const dbTemplate = {
              name: templateData.name,
              category: templateData.category,
              description: templateData.description,
              isPremium: templateData.isPremium,
              previewImage: `/templates/${templateData.style}-${templateData.colorScheme}.jpg`
            };
            
            const created = await storage.createTemplate(dbTemplate);
            createdTemplates.push({
              ...created,
              metadata: templateData // Include full metadata
            });
          } catch (error) {
            console.warn(`Failed to create template ${templateData.name}:`, error);
          }
        }
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      res.json({
        message: `Successfully created ${createdTemplates.length} templates`,
        templates: createdTemplates.slice(0, 20), // Return first 20 for preview
        total: createdTemplates.length
      });
    } catch (error) {
      console.error("Error initializing templates:", error);
      res.status(500).json({ message: "Failed to initialize templates" });
    }
  });
  
  // Get AI content suggestions for resume sections
  app.post("/api/ai-suggestions", async (req, res) => {
    try {
      const { role, industry, sectionType, customization } = req.body;
      
      // Import AI suggestions (dynamic import)
      const { generateContentSuggestions, generateResumeSection } = await import("../client/src/lib/ai-content-suggestions.js");
      
      if (sectionType && role) {
        const section = generateResumeSection(sectionType, role, industry, customization);
        res.json({ section, sectionType });
      } else {
        const suggestions = generateContentSuggestions(role, industry);
        res.json(suggestions);
      }
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      res.status(500).json({ message: "Failed to generate suggestions" });
    }
  });
  
  // Get ATS optimization analysis
  app.post("/api/ats-check", async (req, res) => {
    try {
      const { content, targetKeywords } = req.body;
      
      // Import ATS optimization (dynamic import)
      const { atsOptimization } = await import("../client/src/lib/ai-content-suggestions.js");
      
      const compliance = atsOptimization.checkAtsCompliance(content);
      const improvements = atsOptimization.suggestImprovements(content, targetKeywords || []);
      
      res.json({
        compliance,
        improvements,
        recommendations: improvements.slice(0, 3)
      });
    } catch (error) {
      console.error("Error checking ATS compliance:", error);
      res.status(500).json({ message: "Failed to analyze ATS compliance" });
    }
  });
  
  // Get recommended templates based on user profile
  app.post("/api/templates/recommendations", async (req, res) => {
    try {
      const { role, industry, experienceLevel } = req.body;
      
      // Import template generator
      const { generateAllTemplates, getRecommendedTemplates } = await import("../client/src/lib/template-generator.js");
      
      const allTemplates = generateAllTemplates();
      const recommended = getRecommendedTemplates(allTemplates, { role, industry, experienceLevel });
      
      // Get corresponding database templates
      const dbTemplates = await storage.getAllTemplates();
      const enrichedRecommendations = recommended.map(template => {
        const dbTemplate = dbTemplates.find(db => db.category === template.category);
        return {
          ...template,
          dbId: dbTemplate?.id,
          dbData: dbTemplate
        };
      });
      
      res.json({
        recommendations: enrichedRecommendations.slice(0, 12),
        total: recommended.length,
        userProfile: { role, industry, experienceLevel }
      });
    } catch (error) {
      console.error("Error getting template recommendations:", error);
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  // Job Application routes
  app.get("/api/job-applications", async (req: any, res) => {
    try {
      const userId = 'demo-user';
      const jobs = await storage.getUserJobApplications(userId);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Failed to fetch job applications" });
    }
  });

  app.post("/api/job-applications", async (req: any, res) => {
    try {
      const userId = 'demo-user';
      const jobData = insertJobApplicationSchema.parse(req.body);
      const job = await storage.createJobApplication(userId, jobData);
      res.status(201).json(job);
    } catch (error) {
      console.error("Error creating job application:", error);
      res.status(400).json({ message: "Failed to create job application" });
    }
  });

  app.patch("/api/job-applications/:id", async (req: any, res) => {
    try {
      const job = await storage.updateJobApplication(req.params.id, req.body);
      res.json(job);
    } catch (error) {
      console.error("Error updating job application:", error);
      res.status(400).json({ message: "Failed to update job application" });
    }
  });

  app.delete("/api/job-applications/:id", async (req: any, res) => {
    try {
      await storage.deleteJobApplication(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting job application:", error);
      res.status(400).json({ message: "Failed to delete job application" });
    }
  });

  // Register advanced template routes
  registerAdvancedTemplateRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
