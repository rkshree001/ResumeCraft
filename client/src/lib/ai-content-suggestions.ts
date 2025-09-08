import type { ResumeData } from "@/types/resume";

// AI-powered content suggestions for different resume sections
export interface ContentSuggestion {
  type: 'experience' | 'skills' | 'summary' | 'projects' | 'education' | 'achievements';
  industry: string;
  role: string;
  suggestions: string[];
  keywords: string[];
  actionVerbs: string[];
}

// ATS-friendly action verbs by category
export const actionVerbs = {
  leadership: ['Led', 'Managed', 'Directed', 'Supervised', 'Coordinated', 'Oversaw', 'Spearheaded', 'Orchestrated'],
  technical: ['Developed', 'Implemented', 'Designed', 'Built', 'Engineered', 'Programmed', 'Automated', 'Optimized'],
  analytical: ['Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated', 'Measured', 'Quantified', 'Forecasted'],
  creative: ['Created', 'Designed', 'Innovated', 'Conceptualized', 'Authored', 'Produced', 'Crafted', 'Illustrated'],
  communication: ['Presented', 'Communicated', 'Negotiated', 'Facilitated', 'Collaborated', 'Consulted', 'Mentored', 'Trained'],
  achievement: ['Achieved', 'Exceeded', 'Increased', 'Improved', 'Reduced', 'Generated', 'Delivered', 'Accelerated'],
  problem_solving: ['Resolved', 'Troubleshot', 'Streamlined', 'Enhanced', 'Restructured', 'Revitalized', 'Transformed', 'Modernized']
};

// Industry-specific keywords for ATS optimization
export const industryKeywords = {
  tech: [
    'Agile', 'Scrum', 'CI/CD', 'Cloud Computing', 'AWS', 'Azure', 'DevOps', 'Microservices',
    'API', 'Database', 'Full-Stack', 'Machine Learning', 'Artificial Intelligence', 'Cybersecurity',
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Docker', 'Kubernetes'
  ],
  healthcare: [
    'Patient Care', 'HIPAA', 'Electronic Health Records', 'Medical Coding', 'Clinical Research',
    'Quality Assurance', 'Patient Safety', 'Healthcare Analytics', 'Telemedicine', 'Evidence-Based Practice',
    'Joint Commission', 'CMS', 'Medicare', 'Medicaid', 'Healthcare Administration'
  ],
  finance: [
    'Financial Analysis', 'Risk Management', 'Compliance', 'SOX', 'GAAP', 'Financial Modeling',
    'Investment Banking', 'Portfolio Management', 'Due Diligence', 'Regulatory Reporting',
    'Excel', 'Bloomberg', 'Financial Planning', 'Budget Management', 'Cost Analysis'
  ],
  marketing: [
    'Digital Marketing', 'SEO', 'SEM', 'Social Media', 'Content Marketing', 'Email Marketing',
    'Marketing Automation', 'Lead Generation', 'Campaign Management', 'Brand Management',
    'Google Analytics', 'CRM', 'A/B Testing', 'Conversion Optimization', 'ROI Analysis'
  ],
  sales: [
    'B2B Sales', 'B2C Sales', 'Lead Generation', 'Pipeline Management', 'CRM', 'Salesforce',
    'Account Management', 'Territory Management', 'Quota Achievement', 'Revenue Growth',
    'Negotiation', 'Relationship Building', 'Sales Forecasting', 'Market Penetration'
  ]
};

// Role-specific content suggestions
export const roleSuggestions = {
  'software-engineer': {
    summary: [
      'Experienced Software Engineer with {X}+ years developing scalable web applications and APIs',
      'Full-stack developer proficient in modern frameworks with expertise in cloud technologies',
      'Results-driven engineer with strong problem-solving skills and passion for clean, maintainable code'
    ],
    experience: [
      'Developed and maintained {X} web applications serving {Y} users daily',
      'Implemented automated testing suites reducing bugs by {X}% and deployment time by {Y}%',
      'Collaborated with cross-functional teams to deliver features ahead of schedule',
      'Optimized application performance resulting in {X}% faster load times',
      'Built RESTful APIs handling {X} requests per minute with 99.9% uptime'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'Agile'],
    projects: [
      'E-commerce platform with real-time inventory management and payment processing',
      'Task management application with collaborative features and real-time updates',
      'Data visualization dashboard for business analytics and reporting'
    ]
  },
  'data-scientist': {
    summary: [
      'Data Scientist with {X}+ years experience turning complex data into actionable business insights',
      'Machine learning expert with proven track record of building predictive models',
      'Analytics professional skilled in statistical analysis and data visualization'
    ],
    experience: [
      'Built machine learning models achieving {X}% accuracy in predicting customer behavior',
      'Analyzed large datasets ({X}TB+) to identify trends and optimization opportunities',
      'Created automated reporting dashboards reducing manual work by {X} hours weekly',
      'Presented findings to C-level executives resulting in {X}% increase in operational efficiency'
    ],
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'Tableau', 'Statistics'],
    projects: [
      'Customer churn prediction model reducing attrition by 25%',
      'Recommendation engine increasing user engagement by 40%',
      'Fraud detection system with 99.5% accuracy'
    ]
  },
  'ux-designer': {
    summary: [
      'User Experience Designer with {X}+ years creating intuitive digital experiences',
      'Design thinking advocate passionate about solving complex user problems',
      'Research-driven designer with expertise in user-centered design methodologies'
    ],
    experience: [
      'Conducted user research with {X}+ participants to inform design decisions',
      'Redesigned key user flows resulting in {X}% increase in conversion rates',
      'Created design systems and component libraries used by {X} team members',
      'Collaborated with developers to ensure pixel-perfect implementation of designs'
    ],
    skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing'],
    projects: [
      'Mobile app redesign increasing user retention by 35%',
      'E-commerce checkout flow optimization reducing abandonment by 40%',
      'Design system implementation improving development efficiency by 50%'
    ]
  },
  'nurse': {
    summary: [
      'Registered Nurse with {X}+ years providing compassionate patient care',
      'Healthcare professional committed to evidence-based practice and patient safety',
      'Team-oriented nurse with expertise in critical care and patient education'
    ],
    experience: [
      'Provided direct patient care for {X} patients per shift in fast-paced environment',
      'Administered medications and treatments following strict safety protocols',
      'Collaborated with multidisciplinary teams to develop comprehensive care plans',
      'Educated patients and families on treatment plans and discharge instructions'
    ],
    skills: ['Patient Care', 'HIPAA Compliance', 'Electronic Health Records', 'IV Therapy', 'Medication Administration'],
    projects: [
      'Patient education program reducing readmission rates by 20%',
      'Quality improvement initiative for infection control protocols',
      'Mentorship program for new graduate nurses'
    ]
  },
  'marketing-manager': {
    summary: [
      'Digital Marketing Manager with {X}+ years driving brand growth and customer acquisition',
      'Results-oriented marketer with expertise in multi-channel campaign management',
      'Strategic thinker with proven track record of exceeding KPI targets'
    ],
    experience: [
      'Managed marketing budget of ${X}M+ generating {Y}% ROI across all channels',
      'Increased lead generation by {X}% through targeted digital campaigns',
      'Launched {X} successful product campaigns resulting in ${Y}M in revenue',
      'Built and managed team of {X} marketing specialists'
    ],
    skills: ['Digital Marketing', 'Google Analytics', 'SEO/SEM', 'Marketing Automation', 'Content Strategy'],
    projects: [
      'Omnichannel campaign driving 300% increase in brand awareness',
      'Marketing automation workflow improving lead quality by 45%',
      'Social media strategy increasing engagement by 200%'
    ]
  }
};

// Generate AI content suggestions based on role and industry
export function generateContentSuggestions(role: string, industry: string): ContentSuggestion {
  const roleData = roleSuggestions[role as keyof typeof roleSuggestions];
  const keywords = industryKeywords[industry as keyof typeof industryKeywords] || [];
  
  if (!roleData) {
    return {
      type: 'summary',
      industry,
      role,
      suggestions: ['Professional with proven track record of delivering results'],
      keywords: keywords.slice(0, 10),
      actionVerbs: actionVerbs.achievement
    };
  }

  return {
    type: 'summary',
    industry,
    role,
    suggestions: roleData.summary,
    keywords: [...(roleData.skills || []), ...keywords.slice(0, 8)],
    actionVerbs: actionVerbs.achievement
  };
}

// ATS optimization utilities
export const atsOptimization = {
  // Check if content is ATS-friendly
  checkAtsCompliance: (content: string): { score: number; issues: string[] } => {
    const issues: string[] = [];
    let score = 100;

    // Check for complex formatting
    if (content.includes('•') || content.includes('→')) {
      issues.push('Use simple bullet points (•) instead of special characters');
      score -= 10;
    }

    // Check for tables or columns
    if (content.includes('|') || content.includes('\t')) {
      issues.push('Avoid tables and complex formatting');
      score -= 15;
    }

    // Check for appropriate keywords
    const words = content.toLowerCase().split(/\s+/);
    if (words.length < 10) {
      issues.push('Content too short - add more relevant keywords');
      score -= 20;
    }

    return { score: Math.max(0, score), issues };
  },

  // Suggest improvements for ATS optimization
  suggestImprovements: (content: string, targetKeywords: string[]): string[] => {
    const suggestions: string[] = [];
    const lowerContent = content.toLowerCase();

    // Check for keyword density
    const missingKeywords = targetKeywords.filter(
      keyword => !lowerContent.includes(keyword.toLowerCase())
    );

    if (missingKeywords.length > 0) {
      suggestions.push(`Consider adding these relevant keywords: ${missingKeywords.slice(0, 3).join(', ')}`);
    }

    // Check for action verbs
    const hasActionVerb = Object.values(actionVerbs).flat().some(
      verb => lowerContent.includes(verb.toLowerCase())
    );

    if (!hasActionVerb) {
      suggestions.push('Start bullet points with strong action verbs like "Led", "Developed", "Achieved"');
    }

    // Check for quantifiable results
    const hasNumbers = /\d+/.test(content);
    if (!hasNumbers) {
      suggestions.push('Include specific numbers and metrics to quantify your achievements');
    }

    return suggestions;
  }
};

// Generate industry-specific resume sections
export function generateResumeSection(
  sectionType: 'summary' | 'experience' | 'skills' | 'projects',
  role: string,
  industry: string,
  customization?: { yearsExperience?: number; companySize?: string; achievements?: string[] }
): any {
  const roleData = roleSuggestions[role as keyof typeof roleSuggestions];
  
  if (!roleData) return null;

  switch (sectionType) {
    case 'summary':
      const summary = roleData.summary[0]?.replace('{X}', (customization?.yearsExperience || 5).toString());
      return summary;
    
    case 'experience':
      return roleData.experience.map(exp => 
        exp.replace('{X}', '25').replace('{Y}', '50')
      );
    
    case 'skills':
      return roleData.skills;
    
    case 'projects':
      return roleData.projects;
    
    default:
      return null;
  }
}