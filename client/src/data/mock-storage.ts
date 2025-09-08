import type { Resume, Template } from "@/types/resume";
import { mockTemplates } from "./template-variations";

// Import the realistic mock profiles
import { getAllMockProfiles } from "./mock-resume-data";

// Generate 120+ realistic resume entries
function generateMockResumes(): Resume[] {
  const profiles = getAllMockProfiles();
  return profiles.slice(0, 120).map((profile, index) => ({
    id: `resume-${index + 1}`,
    userId: "demo-user",
    title: `${profile.personalInfo.name}'s Resume`,
    templateId: `modern-${(index % 5) + 1}`,
    personalInfo: profile.personalInfo,
    summary: profile.summary,
    experiences: profile.experiences || [],
    education: profile.education || [],
    skills: profile.skills || [],
    projects: profile.projects || [],
    certifications: profile.certifications || [],
    languages: profile.languages || [],
    awards: profile.awards || [],
    volunteering: profile.volunteering || [],
    interests: profile.interests || [],
    customSections: [],
    settings: {
      templateId: `modern-${(index % 5) + 1}`,
      colorScheme: ['blue', 'green', 'purple', 'red', 'orange'][index % 5],
      fontSize: 'medium',
    },
    isPublic: Math.random() > 0.7,
    viewCount: Math.floor(Math.random() * 100),
    downloadCount: Math.floor(Math.random() * 20),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

// Initialize with generated resumes
let mockResumes: Resume[] = generateMockResumes();

// Keep a few sample resumes at the beginning
mockResumes.unshift(
  {
    id: "sample-resume-featured",
    userId: "demo-user",
    title: "John Doe - Full Stack Developer",
    templateId: "modern-1",
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      website: "johndoe.dev",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe"
    },
    summary: "Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives.",
    experiences: [
      {
        jobTitle: "Senior Full Stack Developer",
        company: "Tech Innovations Inc",
        location: "San Francisco, CA",
        startDate: "Jan 2022",
        endDate: "",
        isCurrentJob: true,
        description: "Led development of microservices architecture serving 1M+ users\nImplemented CI/CD pipelines reducing deployment time by 60%\nMentored junior developers and conducted technical interviews\nCollaborated with product teams to define technical requirements"
      },
      {
        jobTitle: "Frontend Developer",
        company: "StartupXYZ",
        location: "Palo Alto, CA",
        startDate: "Jun 2019",
        endDate: "Dec 2021",
        isCurrentJob: false,
        description: "Developed React applications and web interfaces\nOptimized application performance by 40%\nImplemented automated testing increasing code coverage to 90%\nParticipated in agile development and sprint planning"
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Stanford University",
        location: "Stanford, CA",
        graduationYear: "2019",
        gpa: "3.8",
        relevantCoursework: "Data Structures, Algorithms, Database Systems, Software Engineering"
      }
    ],
    skills: [
      { name: "JavaScript", category: "Programming Languages", level: "Expert" },
      { name: "TypeScript", category: "Programming Languages", level: "Advanced" },
      { name: "React", category: "Frontend", level: "Expert" },
      { name: "Node.js", category: "Backend", level: "Advanced" },
      { name: "PostgreSQL", category: "Databases", level: "Advanced" },
      { name: "AWS", category: "Cloud & DevOps", level: "Advanced" }
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        technologies: "React, Node.js, PostgreSQL, AWS",
        description: "Built a full-stack e-commerce platform with payment integration and real-time inventory management",
        startDate: "2023",
        endDate: "2024",
        link: "https://ecommerce-demo.com",
        github: "https://github.com/johndoe/ecommerce"
      }
    ],
    certifications: [],
    languages: [],
    awards: [],
    volunteering: [],
    interests: ["Open Source", "Machine Learning", "Rock Climbing"],
    customSections: [],
    settings: {
      templateId: "modern-1",
      colorScheme: "blue",
      fontSize: "medium",
    },
    isPublic: true,
    viewCount: 89,
    downloadCount: 15,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z",
  }
);
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