export interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa?: string;
  relevantCoursework?: string;
}

export interface Skill {
  name: string;
  category: string;
  level: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Award {
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Volunteering {
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string;
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface CustomSection {
  title: string;
  content: string;
}

export interface ResumeSettings {
  templateId: string;
  colorScheme: string;
  fontSize: string;
}

export interface ResumeData {
  templateId?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  awards?: Award[];
  volunteering?: Volunteering[];
  interests?: string[];
  customSections: CustomSection[];
  settings: ResumeSettings;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description?: string;
  isPremium: boolean;
  previewImage?: string;
  createdAt: string;
}

export interface Resume {
  id: string;
  userId: string;
  templateId: string;
  title: string;
  personalInfo: PersonalInfo;
  summary?: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  awards?: Award[];
  volunteering?: Volunteering[];
  interests?: string[];
  customSections: CustomSection[];
  settings: ResumeSettings;
  isPublic: boolean;
  viewCount: number;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeShare {
  id: string;
  resumeId: string;
  shareToken: string;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
