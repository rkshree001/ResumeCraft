import type { ResumeData } from "@/types/resume";

// Template categories and their variations
export const templateCategories = [
  { id: 'modern', name: 'Modern', description: 'Clean, contemporary designs' },
  { id: 'classic', name: 'Classic', description: 'Traditional, professional layouts' },
  { id: 'creative', name: 'Creative', description: 'Colorful, unique designs' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple, clean layouts' },
  { id: 'executive', name: 'Executive', description: 'High-level professional designs' },
  { id: 'tech', name: 'Tech', description: 'Technology-focused layouts' },
  { id: 'healthcare', name: 'Healthcare', description: 'Medical industry designs' },
  { id: 'academic', name: 'Academic', description: 'Education and research layouts' },
  { id: 'sales', name: 'Sales', description: 'Sales and marketing focused' },
  { id: 'finance', name: 'Finance', description: 'Financial industry layouts' }
];

// Mock templates data (120+ templates)
export const mockTemplates = [
  // Modern Category (15 templates)
  { id: 'modern-1', name: 'Modern Blue', category: 'modern', colorScheme: 'blue', isPremium: false },
  { id: 'modern-2', name: 'Modern Green', category: 'modern', colorScheme: 'green', isPremium: false },
  { id: 'modern-3', name: 'Modern Purple', category: 'modern', colorScheme: 'purple', isPremium: true },
  { id: 'modern-4', name: 'Modern Red', category: 'modern', colorScheme: 'red', isPremium: false },
  { id: 'modern-5', name: 'Modern Teal', category: 'modern', colorScheme: 'teal', isPremium: true },
  { id: 'modern-6', name: 'Modern Orange', category: 'modern', colorScheme: 'orange', isPremium: false },
  { id: 'modern-7', name: 'Modern Pink', category: 'modern', colorScheme: 'pink', isPremium: true },
  { id: 'modern-8', name: 'Modern Indigo', category: 'modern', colorScheme: 'indigo', isPremium: false },
  { id: 'modern-9', name: 'Modern Cyan', category: 'modern', colorScheme: 'cyan', isPremium: true },
  { id: 'modern-10', name: 'Modern Emerald', category: 'modern', colorScheme: 'emerald', isPremium: false },
  { id: 'modern-11', name: 'Modern Violet', category: 'modern', colorScheme: 'violet', isPremium: true },
  { id: 'modern-12', name: 'Modern Rose', category: 'modern', colorScheme: 'rose', isPremium: false },
  { id: 'modern-13', name: 'Modern Amber', category: 'modern', colorScheme: 'amber', isPremium: true },
  { id: 'modern-14', name: 'Modern Lime', category: 'modern', colorScheme: 'lime', isPremium: false },
  { id: 'modern-15', name: 'Modern Sky', category: 'modern', colorScheme: 'sky', isPremium: true },

  // Classic Category (12 templates)
  { id: 'classic-1', name: 'Classic Professional', category: 'classic', colorScheme: 'blue', isPremium: false },
  { id: 'classic-2', name: 'Classic Business', category: 'classic', colorScheme: 'gray', isPremium: false },
  { id: 'classic-3', name: 'Classic Executive', category: 'classic', colorScheme: 'black', isPremium: true },
  { id: 'classic-4', name: 'Classic Corporate', category: 'classic', colorScheme: 'navy', isPremium: false },
  { id: 'classic-5', name: 'Classic Traditional', category: 'classic', colorScheme: 'brown', isPremium: true },
  { id: 'classic-6', name: 'Classic Formal', category: 'classic', colorScheme: 'charcoal', isPremium: false },
  { id: 'classic-7', name: 'Classic Elegant', category: 'classic', colorScheme: 'gold', isPremium: true },
  { id: 'classic-8', name: 'Classic Timeless', category: 'classic', colorScheme: 'silver', isPremium: false },
  { id: 'classic-9', name: 'Classic Conservative', category: 'classic', colorScheme: 'darkblue', isPremium: true },
  { id: 'classic-10', name: 'Classic Standard', category: 'classic', colorScheme: 'darkgray', isPremium: false },
  { id: 'classic-11', name: 'Classic Premium', category: 'classic', colorScheme: 'platinum', isPremium: true },
  { id: 'classic-12', name: 'Classic Distinguished', category: 'classic', colorScheme: 'bronze', isPremium: false },

  // Creative Category (15 templates)
  { id: 'creative-1', name: 'Creative Burst', category: 'creative', colorScheme: 'rainbow', isPremium: true },
  { id: 'creative-2', name: 'Creative Flow', category: 'creative', colorScheme: 'gradient', isPremium: false },
  { id: 'creative-3', name: 'Creative Edge', category: 'creative', colorScheme: 'neon', isPremium: true },
  { id: 'creative-4', name: 'Creative Splash', category: 'creative', colorScheme: 'vibrant', isPremium: false },
  { id: 'creative-5', name: 'Creative Vision', category: 'creative', colorScheme: 'artistic', isPremium: true },
  { id: 'creative-6', name: 'Creative Design', category: 'creative', colorScheme: 'colorful', isPremium: false },
  { id: 'creative-7', name: 'Creative Studio', category: 'creative', colorScheme: 'palette', isPremium: true },
  { id: 'creative-8', name: 'Creative Bold', category: 'creative', colorScheme: 'bold', isPremium: false },
  { id: 'creative-9', name: 'Creative Fresh', category: 'creative', colorScheme: 'fresh', isPremium: true },
  { id: 'creative-10', name: 'Creative Modern', category: 'creative', colorScheme: 'trendy', isPremium: false },
  { id: 'creative-11', name: 'Creative Dynamic', category: 'creative', colorScheme: 'dynamic', isPremium: true },
  { id: 'creative-12', name: 'Creative Unique', category: 'creative', colorScheme: 'unique', isPremium: false },
  { id: 'creative-13', name: 'Creative Artistic', category: 'creative', colorScheme: 'art', isPremium: true },
  { id: 'creative-14', name: 'Creative Innovative', category: 'creative', colorScheme: 'innovation', isPremium: false },
  { id: 'creative-15', name: 'Creative Expression', category: 'creative', colorScheme: 'expression', isPremium: true },

  // Minimalist Category (10 templates)
  { id: 'minimal-1', name: 'Minimal Clean', category: 'minimalist', colorScheme: 'white', isPremium: false },
  { id: 'minimal-2', name: 'Minimal Simple', category: 'minimalist', colorScheme: 'light', isPremium: false },
  { id: 'minimal-3', name: 'Minimal Pure', category: 'minimalist', colorScheme: 'pure', isPremium: true },
  { id: 'minimal-4', name: 'Minimal Space', category: 'minimalist', colorScheme: 'spacious', isPremium: false },
  { id: 'minimal-5', name: 'Minimal Zen', category: 'minimalist', colorScheme: 'zen', isPremium: true },
  { id: 'minimal-6', name: 'Minimal Focus', category: 'minimalist', colorScheme: 'focused', isPremium: false },
  { id: 'minimal-7', name: 'Minimal Essence', category: 'minimalist', colorScheme: 'essence', isPremium: true },
  { id: 'minimal-8', name: 'Minimal Clarity', category: 'minimalist', colorScheme: 'clear', isPremium: false },
  { id: 'minimal-9', name: 'Minimal Elegant', category: 'minimalist', colorScheme: 'elegant', isPremium: true },
  { id: 'minimal-10', name: 'Minimal Perfect', category: 'minimalist', colorScheme: 'perfect', isPremium: false },

  // Executive Category (12 templates)
  { id: 'exec-1', name: 'Executive Leader', category: 'executive', colorScheme: 'executive', isPremium: true },
  { id: 'exec-2', name: 'Executive CEO', category: 'executive', colorScheme: 'ceo', isPremium: true },
  { id: 'exec-3', name: 'Executive Director', category: 'executive', colorScheme: 'director', isPremium: true },
  { id: 'exec-4', name: 'Executive Manager', category: 'executive', colorScheme: 'manager', isPremium: false },
  { id: 'exec-5', name: 'Executive VP', category: 'executive', colorScheme: 'vp', isPremium: true },
  { id: 'exec-6', name: 'Executive Senior', category: 'executive', colorScheme: 'senior', isPremium: true },
  { id: 'exec-7', name: 'Executive Premium', category: 'executive', colorScheme: 'premium', isPremium: true },
  { id: 'exec-8', name: 'Executive Elite', category: 'executive', colorScheme: 'elite', isPremium: true },
  { id: 'exec-9', name: 'Executive Professional', category: 'executive', colorScheme: 'professional', isPremium: false },
  { id: 'exec-10', name: 'Executive Authority', category: 'executive', colorScheme: 'authority', isPremium: true },
  { id: 'exec-11', name: 'Executive Power', category: 'executive', colorScheme: 'power', isPremium: true },
  { id: 'exec-12', name: 'Executive Excellence', category: 'executive', colorScheme: 'excellence', isPremium: true },

  // Tech Category (15 templates)
  { id: 'tech-1', name: 'Tech Developer', category: 'tech', colorScheme: 'code', isPremium: false },
  { id: 'tech-2', name: 'Tech Engineer', category: 'tech', colorScheme: 'engineer', isPremium: false },
  { id: 'tech-3', name: 'Tech Frontend', category: 'tech', colorScheme: 'frontend', isPremium: true },
  { id: 'tech-4', name: 'Tech Backend', category: 'tech', colorScheme: 'backend', isPremium: false },
  { id: 'tech-5', name: 'Tech Fullstack', category: 'tech', colorScheme: 'fullstack', isPremium: true },
  { id: 'tech-6', name: 'Tech DevOps', category: 'tech', colorScheme: 'devops', isPremium: false },
  { id: 'tech-7', name: 'Tech Data Science', category: 'tech', colorScheme: 'datascience', isPremium: true },
  { id: 'tech-8', name: 'Tech AI/ML', category: 'tech', colorScheme: 'aiml', isPremium: false },
  { id: 'tech-9', name: 'Tech Cybersecurity', category: 'tech', colorScheme: 'security', isPremium: true },
  { id: 'tech-10', name: 'Tech Mobile', category: 'tech', colorScheme: 'mobile', isPremium: false },
  { id: 'tech-11', name: 'Tech Cloud', category: 'tech', colorScheme: 'cloud', isPremium: true },
  { id: 'tech-12', name: 'Tech Product', category: 'tech', colorScheme: 'product', isPremium: false },
  { id: 'tech-13', name: 'Tech Startup', category: 'tech', colorScheme: 'startup', isPremium: true },
  { id: 'tech-14', name: 'Tech Innovation', category: 'tech', colorScheme: 'innovation', isPremium: false },
  { id: 'tech-15', name: 'Tech Architect', category: 'tech', colorScheme: 'architect', isPremium: true },

  // Healthcare Category (10 templates)
  { id: 'health-1', name: 'Healthcare Doctor', category: 'healthcare', colorScheme: 'medical', isPremium: false },
  { id: 'health-2', name: 'Healthcare Nurse', category: 'healthcare', colorScheme: 'nursing', isPremium: false },
  { id: 'health-3', name: 'Healthcare Specialist', category: 'healthcare', colorScheme: 'specialist', isPremium: true },
  { id: 'health-4', name: 'Healthcare Admin', category: 'healthcare', colorScheme: 'admin', isPremium: false },
  { id: 'health-5', name: 'Healthcare Research', category: 'healthcare', colorScheme: 'research', isPremium: true },
  { id: 'health-6', name: 'Healthcare Clinical', category: 'healthcare', colorScheme: 'clinical', isPremium: false },
  { id: 'health-7', name: 'Healthcare Therapy', category: 'healthcare', colorScheme: 'therapy', isPremium: true },
  { id: 'health-8', name: 'Healthcare Pharmacy', category: 'healthcare', colorScheme: 'pharmacy', isPremium: false },
  { id: 'health-9', name: 'Healthcare Mental Health', category: 'healthcare', colorScheme: 'mental', isPremium: true },
  { id: 'health-10', name: 'Healthcare Emergency', category: 'healthcare', colorScheme: 'emergency', isPremium: false },

  // Academic Category (12 templates)
  { id: 'academic-1', name: 'Academic Professor', category: 'academic', colorScheme: 'professor', isPremium: false },
  { id: 'academic-2', name: 'Academic Researcher', category: 'academic', colorScheme: 'researcher', isPremium: false },
  { id: 'academic-3', name: 'Academic PhD', category: 'academic', colorScheme: 'phd', isPremium: true },
  { id: 'academic-4', name: 'Academic Postdoc', category: 'academic', colorScheme: 'postdoc', isPremium: false },
  { id: 'academic-5', name: 'Academic Faculty', category: 'academic', colorScheme: 'faculty', isPremium: true },
  { id: 'academic-6', name: 'Academic Student', category: 'academic', colorScheme: 'student', isPremium: false },
  { id: 'academic-7', name: 'Academic Publications', category: 'academic', colorScheme: 'publications', isPremium: true },
  { id: 'academic-8', name: 'Academic Conference', category: 'academic', colorScheme: 'conference', isPremium: false },
  { id: 'academic-9', name: 'Academic Grant', category: 'academic', colorScheme: 'grant', isPremium: true },
  { id: 'academic-10', name: 'Academic Teaching', category: 'academic', colorScheme: 'teaching', isPremium: false },
  { id: 'academic-11', name: 'Academic Curriculum', category: 'academic', colorScheme: 'curriculum', isPremium: true },
  { id: 'academic-12', name: 'Academic Vitae', category: 'academic', colorScheme: 'vitae', isPremium: false },

  // Sales Category (10 templates)
  { id: 'sales-1', name: 'Sales Executive', category: 'sales', colorScheme: 'sales', isPremium: false },
  { id: 'sales-2', name: 'Sales Manager', category: 'sales', colorScheme: 'manager', isPremium: false },
  { id: 'sales-3', name: 'Sales Representative', category: 'sales', colorScheme: 'rep', isPremium: true },
  { id: 'sales-4', name: 'Sales Director', category: 'sales', colorScheme: 'director', isPremium: false },
  { id: 'sales-5', name: 'Sales Business Dev', category: 'sales', colorScheme: 'bizdev', isPremium: true },
  { id: 'sales-6', name: 'Sales Account', category: 'sales', colorScheme: 'account', isPremium: false },
  { id: 'sales-7', name: 'Sales Marketing', category: 'sales', colorScheme: 'marketing', isPremium: true },
  { id: 'sales-8', name: 'Sales Growth', category: 'sales', colorScheme: 'growth', isPremium: false },
  { id: 'sales-9', name: 'Sales Revenue', category: 'sales', colorScheme: 'revenue', isPremium: true },
  { id: 'sales-10', name: 'Sales Performance', category: 'sales', colorScheme: 'performance', isPremium: false },

  // Finance Category (10 templates)
  { id: 'finance-1', name: 'Finance Analyst', category: 'finance', colorScheme: 'analyst', isPremium: false },
  { id: 'finance-2', name: 'Finance Manager', category: 'finance', colorScheme: 'manager', isPremium: false },
  { id: 'finance-3', name: 'Finance Investment', category: 'finance', colorScheme: 'investment', isPremium: true },
  { id: 'finance-4', name: 'Finance Banking', category: 'finance', colorScheme: 'banking', isPremium: false },
  { id: 'finance-5', name: 'Finance Accounting', category: 'finance', colorScheme: 'accounting', isPremium: true },
  { id: 'finance-6', name: 'Finance Controller', category: 'finance', colorScheme: 'controller', isPremium: false },
  { id: 'finance-7', name: 'Finance CFO', category: 'finance', colorScheme: 'cfo', isPremium: true },
  { id: 'finance-8', name: 'Finance Risk', category: 'finance', colorScheme: 'risk', isPremium: false },
  { id: 'finance-9', name: 'Finance Compliance', category: 'finance', colorScheme: 'compliance', isPremium: true },
  { id: 'finance-10', name: 'Finance Audit', category: 'finance', colorScheme: 'audit', isPremium: false }
];

// Industry-specific mock data variations
export const industryMockData: Record<string, Partial<ResumeData>> = {
  tech: {
    personalInfo: {
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      website: "alexjohnson.dev",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson"
    },
    summary: "Experienced Software Engineer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies. Proven track record of delivering scalable solutions and leading cross-functional teams.",
    skills: [
      { name: "JavaScript", category: "Programming Languages", level: "Expert" },
      { name: "TypeScript", category: "Programming Languages", level: "Advanced" },
      { name: "React", category: "Frontend", level: "Expert" },
      { name: "Node.js", category: "Backend", level: "Advanced" },
      { name: "AWS", category: "Cloud", level: "Advanced" }
    ]
  },
  healthcare: {
    personalInfo: {
      name: "Dr. Sarah Williams",
      email: "s.williams@hospital.com",
      phone: "(555) 987-6543",
      location: "Boston, MA",
      website: "drsarahwilliams.com",
      linkedin: "linkedin.com/in/drsarahwilliams"
    },
    summary: "Board-certified physician with 8+ years of experience in internal medicine. Committed to providing exceptional patient care and advancing medical knowledge through research and education.",
    skills: [
      { name: "Internal Medicine", category: "Medical Specialties", level: "Expert" },
      { name: "Patient Care", category: "Clinical Skills", level: "Expert" },
      { name: "Electronic Health Records", category: "Technology", level: "Advanced" },
      { name: "Medical Research", category: "Research", level: "Advanced" }
    ]
  },
  finance: {
    personalInfo: {
      name: "Michael Chen",
      email: "m.chen@investment.com",
      phone: "(555) 456-7890",
      location: "New York, NY",
      website: "michaelchen.finance",
      linkedin: "linkedin.com/in/michaelchen"
    },
    summary: "Senior Financial Analyst with 6+ years of experience in investment banking and portfolio management. Expertise in financial modeling, risk assessment, and strategic planning.",
    skills: [
      { name: "Financial Modeling", category: "Analysis", level: "Expert" },
      { name: "Risk Management", category: "Finance", level: "Advanced" },
      { name: "Excel", category: "Tools", level: "Expert" },
      { name: "Bloomberg Terminal", category: "Technology", level: "Advanced" }
    ]
  },
  academic: {
    personalInfo: {
      name: "Dr. Emily Rodriguez",
      email: "e.rodriguez@university.edu",
      phone: "(555) 321-9876",
      location: "Cambridge, MA",
      website: "emilyrodriguez.edu",
      linkedin: "linkedin.com/in/dremilyrodriguez"
    },
    summary: "Associate Professor of Computer Science with expertise in machine learning and artificial intelligence. Published researcher with 20+ peer-reviewed papers and grant funding experience.",
    skills: [
      { name: "Machine Learning", category: "Research Areas", level: "Expert" },
      { name: "Data Science", category: "Technical Skills", level: "Expert" },
      { name: "Python", category: "Programming", level: "Expert" },
      { name: "Grant Writing", category: "Academic Skills", level: "Advanced" }
    ]
  },
  sales: {
    personalInfo: {
      name: "David Martinez",
      email: "d.martinez@sales.com",
      phone: "(555) 654-3210",
      location: "Chicago, IL",
      website: "davidmartinez.sales",
      linkedin: "linkedin.com/in/davidmartinez"
    },
    summary: "Results-driven Sales Manager with 7+ years of experience exceeding quotas and building lasting client relationships. Proven track record of leading high-performing teams and driving revenue growth.",
    skills: [
      { name: "B2B Sales", category: "Sales Skills", level: "Expert" },
      { name: "CRM Management", category: "Technology", level: "Advanced" },
      { name: "Negotiation", category: "Communication", level: "Expert" },
      { name: "Team Leadership", category: "Management", level: "Advanced" }
    ]
  },
  creative: {
    personalInfo: {
      name: "Jessica Taylor",
      email: "j.taylor@design.com",
      phone: "(555) 789-0123",
      location: "Los Angeles, CA",
      website: "jessicataylor.design",
      linkedin: "linkedin.com/in/jessicataylor"
    },
    summary: "Creative UX/UI Designer with 5+ years of experience crafting user-centered digital experiences. Passionate about combining aesthetics with functionality to create impactful design solutions.",
    skills: [
      { name: "UI/UX Design", category: "Design", level: "Expert" },
      { name: "Figma", category: "Design Tools", level: "Expert" },
      { name: "Prototyping", category: "Design Process", level: "Advanced" },
      { name: "User Research", category: "Research", level: "Advanced" }
    ]
  }
};