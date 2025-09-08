import type { Express } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { nanoid } from "nanoid";
import { storage } from "./storage.js";
import { insertResumeSchema } from "@shared/schema.js";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  }
});

interface ExtractedData {
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  achievements: string[];
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
}

export function registerResumeUploadRoutes(app: Express) {
  app.post('/api/resumes/upload', upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      console.log('Processing uploaded file:', req.file.originalname);

      // Extract text from uploaded file
      let extractedText = '';
      
      if (req.file.mimetype === 'application/pdf') {
        const fileBuffer = await fs.readFile(req.file.path);
        const pdfData = await pdfParse(fileBuffer);
        extractedText = pdfData.text;
      } else if (req.file.mimetype.includes('word')) {
        const fileBuffer = await fs.readFile(req.file.path);
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value;
      }

      console.log('Extracted text length:', extractedText.length);

      // Parse the extracted text to extract structured data
      const extractedData = parseResumeText(extractedText);

      // Create a new resume record in the database
      const resumeData = {
        id: nanoid(),
        userId: (req.session as any)?.user?.id || 'demo-user',
        title: extractedData.personalInfo.name ? `${extractedData.personalInfo.name}'s Resume` : 'Uploaded Resume',
        templateId: 'template-1', // Default template
        data: {
          personalInfo: extractedData.personalInfo,
          summary: extractedData.summary || '',
          experience: extractedData.experience,
          education: extractedData.education,
          skills: extractedData.skills,
          projects: extractedData.projects,
          certifications: extractedData.certifications,
          achievements: extractedData.achievements,
          languages: extractedData.languages,
          references: [],
          customSections: []
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Validate and insert the resume
      const validatedData = insertResumeSchema.parse(resumeData);
      await storage.createResume(validatedData);

      // Clean up uploaded file
      await fs.unlink(req.file.path).catch(console.error);

      res.json({
        resumeId: resumeData.id,
        extractedData,
        message: 'Resume uploaded and processed successfully'
      });

    } catch (error) {
      console.error('Error processing uploaded resume:', error);
      
      // Clean up file if it exists
      if (req.file?.path) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      
      res.status(500).json({ 
        message: 'Failed to process uploaded resume',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
}

function parseResumeText(text: string): ExtractedData {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const result: ExtractedData = {
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: []
  };

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.personalInfo.email = emailMatch[0];
  }

  // Extract phone number
  const phoneMatch = text.match(/(?:\+?1[-\s]?)?\(?([0-9]{3})\)?[-\s]?([0-9]{3})[-\s]?([0-9]{4})/);
  if (phoneMatch) {
    result.personalInfo.phone = phoneMatch[0];
  }

  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) {
    result.personalInfo.linkedin = linkedinMatch[0];
  }

  // Extract name (usually the first line or near email)
  const firstLine = lines[0];
  if (firstLine && firstLine.length < 50 && !firstLine.includes('@')) {
    result.personalInfo.name = firstLine;
  }

  // Extract skills section
  const skillsIndex = lines.findIndex(line => 
    /^(skills|technical skills|core competencies|technologies)/i.test(line)
  );
  
  if (skillsIndex !== -1) {
    const skillsSection = lines.slice(skillsIndex + 1, skillsIndex + 10);
    const skillsText = skillsSection.join(' ');
    
    // Split by common delimiters
    const skills = skillsText
      .split(/[,•·|]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0 && skill.length < 30);
      
    result.skills = skills.slice(0, 15); // Limit to 15 skills
  }

  // Extract experience section
  const experienceKeywords = ['experience', 'employment', 'work history', 'professional experience'];
  const experienceIndex = lines.findIndex(line => 
    experienceKeywords.some(keyword => line.toLowerCase().includes(keyword))
  );
  
  if (experienceIndex !== -1) {
    const experienceLines = lines.slice(experienceIndex + 1);
    let currentJob: any = null;
    
    for (const line of experienceLines) {
      // Stop if we hit another section
      if (/^(education|skills|projects|certifications)/i.test(line)) break;
      
      // Check if this looks like a job title/company line
      if (line.includes('–') || line.includes('-') || line.includes('|')) {
        if (currentJob) {
          result.experience.push(currentJob);
        }
        
        const parts = line.split(/[–|-|]/).map(p => p.trim());
        currentJob = {
          title: parts[0] || 'Position',
          company: parts[1] || 'Company',
          startDate: '2020',
          endDate: '2023',
          description: ''
        };
      } else if (currentJob && line.length > 20) {
        // Add to description
        currentJob.description += (currentJob.description ? ' ' : '') + line;
      }
    }
    
    if (currentJob) {
      result.experience.push(currentJob);
    }
  }

  // Extract education section
  const educationIndex = lines.findIndex(line => 
    /^(education|academic background|qualifications)/i.test(line)
  );
  
  if (educationIndex !== -1) {
    const educationLines = lines.slice(educationIndex + 1, educationIndex + 10);
    
    for (const line of educationLines) {
      if (/^(experience|skills|projects)/i.test(line)) break;
      
      if (line.length > 10) {
        result.education.push({
          degree: line,
          institution: 'University',
          startDate: '2016',
          endDate: '2020'
        });
        break; // Just take the first education entry for now
      }
    }
  }

  // Extract summary/objective
  const summaryKeywords = ['summary', 'objective', 'profile', 'about'];
  const summaryIndex = lines.findIndex(line => 
    summaryKeywords.some(keyword => line.toLowerCase().includes(keyword))
  );
  
  if (summaryIndex !== -1 && lines[summaryIndex + 1]) {
    const summaryLines = lines.slice(summaryIndex + 1, summaryIndex + 5);
    result.summary = summaryLines.join(' ').substring(0, 500);
  }

  return result;
}