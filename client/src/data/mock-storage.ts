import type { Resume, Template } from "@/types/resume";
import { mockTemplates } from "./template-variations";

// Mock local storage for resumes with sample data
let mockResumes: Resume[] = [
  {
    id: "sample-resume-1",
    userId: "demo-user",
    title: "Software Engineer Resume",
    templateId: "modern-1",
    personalInfo: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      website: "johnsmith.dev",
      linkedin: "linkedin.com/in/johnsmith",
      github: "github.com/johnsmith"
    },
    summary: "Experienced Software Engineer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies. Proven track record of delivering scalable solutions and leading cross-functional teams.",
    experiences: [
      {
        jobTitle: "Senior Software Engineer",
        company: "TechCorp Inc",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "",
        isCurrentJob: true,
        description: "Led development of microservices architecture\nImplemented automated testing and CI/CD pipelines\nMentored junior developers and conducted code reviews"
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        graduationYear: "2019",
        gpa: "3.8"
      }
    ],
    skills: [
      { name: "JavaScript", category: "Programming Languages", level: "Expert" },
      { name: "React", category: "Frontend", level: "Advanced" },
      { name: "Node.js", category: "Backend", level: "Advanced" }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        technologies: "React, Node.js, PostgreSQL",
        description: "Built a full-stack e-commerce platform with real-time inventory management",
        startDate: "2023-01",
        endDate: "2023-06",
        link: "https://demo.com",
        github: "https://github.com/demo"
      }
    ],
    certifications: [],
    languages: [],
    awards: [],
    volunteering: [],
    interests: [],
    customSections: [],
    settings: {
      templateId: "modern-1",
      colorScheme: "blue",
      fontSize: "medium",
    },
    isPublic: false,
    viewCount: 12,
    downloadCount: 3,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z",
  }
];
let resumeIdCounter = 2;

export const mockStorage = {
  // Resume operations
  async getResumes(): Promise<Resume[]> {
    return mockResumes;
  },

  async getResume(id: string): Promise<Resume | null> {
    return mockResumes.find(r => r.id === id) || null;
  },

  async createResume(data: Partial<Resume>): Promise<Resume> {
    const newResume: Resume = {
      id: `resume-${resumeIdCounter++}`,
      userId: "demo-user",
      title: data.title || "Untitled Resume",
      templateId: data.templateId || "modern-1",
      personalInfo: data.personalInfo || {},
      summary: data.summary || "",
      experiences: data.experiences || [],
      education: data.education || [],
      skills: data.skills || [],
      projects: data.projects || [],
      certifications: data.certifications || [],
      languages: data.languages || [],
      awards: data.awards || [],
      volunteering: data.volunteering || [],
      interests: data.interests || [],
      customSections: data.customSections || [],
      settings: data.settings || {
        templateId: "modern-1",
        colorScheme: "blue",
        fontSize: "medium",
      },
      isPublic: data.isPublic || false,
      viewCount: 0,
      downloadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockResumes.push(newResume);
    return newResume;
  },

  async updateResume(id: string, data: Partial<Resume>): Promise<Resume> {
    const index = mockResumes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error("Resume not found");
    }
    
    mockResumes[index] = {
      ...mockResumes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return mockResumes[index];
  },

  async deleteResume(id: string): Promise<void> {
    mockResumes = mockResumes.filter(r => r.id !== id);
  },

  // Template operations
  async getTemplates(): Promise<Template[]> {
    return mockTemplates.map(t => ({
      ...t,
      previewImage: '',
      createdAt: new Date().toISOString()
    }));
  },

  async getTemplate(id: string): Promise<Template | null> {
    const template = mockTemplates.find(t => t.id === id);
    return template ? {
      ...template,
      previewImage: '',
      createdAt: new Date().toISOString()
    } : null;
  }
};