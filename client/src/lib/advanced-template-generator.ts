// Advanced template generator with detailed styling specifications
export interface AdvancedTemplateSpec {
  id: string;
  name: string;
  jobRole: string;
  industry: string;
  layout: LayoutSpec;
  typography: TypographySpec;
  colors: ColorSpec;
  spacing: SpacingSpec;
  bullets: BulletSpec;
  atsOptimization: ATSSpec;
  aiSuggestions: AISuggestionSpec;
}

export interface LayoutSpec {
  type: 'sidebar-left' | 'sidebar-right' | 'top-header' | 'two-column' | 'single-column' | 'timeline' | 'infographic';
  description: string;
  sections: {
    sidebar?: string[];
    main?: string[];
    header?: string[];
    footer?: string[];
  };
  grid: {
    columns: number;
    sidebarWidth?: string;
    mainWidth?: string;
  };
}

export interface TypographySpec {
  headerFont: string;
  bodyFont: string;
  sizes: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    small: string;
  };
  weights: {
    header: string;
    subheader: string;
    body: string;
    emphasis: string;
  };
}

export interface ColorSpec {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
  border: string;
  cardBg: string;
}

export interface SpacingSpec {
  lineHeight: number;
  sectionSpacing: string;
  padding: string;
  margins: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  gaps: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface BulletSpec {
  type: 'dot' | 'dash' | 'arrow' | 'checkmark' | 'icon' | 'square' | 'triangle';
  icon?: string;
  color: string;
  size: string;
}

export interface ATSSpec {
  keywords: string[];
  optimizationLevel: 'basic' | 'advanced' | 'expert';
  scannerFriendly: boolean;
  structuredData: boolean;
}

export interface AISuggestionSpec {
  experience: string[];
  education: string[];
  skills: string[];
  projects: string[];
  certifications: string[];
  achievements: string[];
  summary: string[];
}

// Font combinations for professional templates
const fontPairings = [
  { header: 'Montserrat', body: 'Open Sans' },
  { header: 'Lato', body: 'Roboto' },
  { header: 'Poppins', body: 'Noto Sans' },
  { header: 'Roboto Slab', body: 'Lora' },
  { header: 'Oswald', body: 'PT Sans' },
  { header: 'Playfair Display', body: 'Source Sans Pro' },
  { header: 'Merriweather', body: 'Open Sans' },
  { header: 'Raleway', body: 'Nunito' },
  { header: 'Ubuntu', body: 'Oxygen' },
  { header: 'Crimson Text', body: 'Libre Baskerville' }
];

// Professional color schemes
const colorSchemes = [
  { name: 'Corporate Blue', primary: '#1F2937', secondary: '#4B5563', accent: '#2563EB', background: '#FFFFFF', text: '#111827' },
  { name: 'Executive Navy', primary: '#1E3A8A', secondary: '#3B82F6', accent: '#60A5FA', background: '#FAFAFA', text: '#1F2937' },
  { name: 'Modern Teal', primary: '#0F766E', secondary: '#14B8A6', accent: '#5EEAD4', background: '#FFFFFF', text: '#134E4A' },
  { name: 'Professional Gray', primary: '#374151', secondary: '#6B7280', accent: '#9CA3AF', background: '#F9FAFB', text: '#111827' },
  { name: 'Creative Purple', primary: '#581C87', secondary: '#7C3AED', accent: '#A78BFA', background: '#FAFAFA', text: '#1F2937' },
  { name: 'Tech Green', primary: '#14532D', secondary: '#16A34A', accent: '#4ADE80', background: '#FFFFFF', text: '#052E16' },
  { name: 'Finance Gold', primary: '#92400E', secondary: '#D97706', accent: '#FBBF24', background: '#FFFBEB', text: '#451A03' },
  { name: 'Healthcare Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#93C5FD', background: '#F0F9FF', text: '#1E3A8A' },
  { name: 'Classic Black', primary: '#000000', secondary: '#374151', accent: '#6B7280', background: '#FFFFFF', text: '#000000' },
  { name: 'Minimalist Slate', primary: '#0F172A', secondary: '#475569', accent: '#64748B', background: '#F8FAFC', text: '#020617' }
];

// Layout specifications
const layouts = [
  {
    type: 'sidebar-left' as const,
    description: 'Left sidebar for skills and education, right main column for experience and projects with timeline',
    sections: {
      sidebar: ['Personal Info', 'Skills', 'Education', 'Languages', 'Certifications'],
      main: ['Summary', 'Experience', 'Projects', 'Achievements']
    },
    grid: { columns: 2, sidebarWidth: '35%', mainWidth: '65%' }
  },
  {
    type: 'sidebar-right' as const,
    description: 'Right sidebar for contact and skills, left main column for experience and education',
    sections: {
      main: ['Personal Info', 'Summary', 'Experience', 'Education', 'Projects'],
      sidebar: ['Contact', 'Skills', 'Certifications', 'Languages', 'Awards']
    },
    grid: { columns: 2, sidebarWidth: '30%', mainWidth: '70%' }
  },
  {
    type: 'top-header' as const,
    description: 'Full-width header with contact info, single column content below',
    sections: {
      header: ['Personal Info', 'Contact Details'],
      main: ['Summary', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications']
    },
    grid: { columns: 1 }
  },
  {
    type: 'two-column' as const,
    description: 'Balanced two-column layout with alternating content sections',
    sections: {
      main: ['Summary', 'Experience', 'Projects'],
      sidebar: ['Skills', 'Education', 'Certifications', 'Languages']
    },
    grid: { columns: 2, sidebarWidth: '40%', mainWidth: '60%' }
  },
  {
    type: 'timeline' as const,
    description: 'Timeline-based layout with chronological experience and education flow',
    sections: {
      main: ['Personal Info', 'Summary', 'Timeline (Experience & Education)', 'Skills', 'Projects']
    },
    grid: { columns: 1 }
  },
  {
    type: 'infographic' as const,
    description: 'Visual infographic style with skill charts and progress bars',
    sections: {
      header: ['Personal Info'],
      main: ['Summary', 'Skills Chart', 'Experience', 'Education Visual', 'Projects Gallery']
    },
    grid: { columns: 1 }
  }
];

// Bullet styles
const bulletStyles = [
  { type: 'dot' as const, icon: '•', color: 'accent', size: '14px' },
  { type: 'dash' as const, icon: '—', color: 'primary', size: '12px' },
  { type: 'arrow' as const, icon: '→', color: 'accent', size: '14px' },
  { type: 'checkmark' as const, icon: '✓', color: 'accent', size: '14px' },
  { type: 'square' as const, icon: '▪', color: 'primary', size: '12px' },
  { type: 'triangle' as const, icon: '▶', color: 'accent', size: '12px' }
];

// Role-specific AI suggestions
const roleBasedSuggestions = {
  'software-engineer': {
    experience: [
      'Developed and maintained scalable web applications serving 100,000+ daily active users',
      'Implemented automated testing suites reducing bugs by 40% and deployment time by 60%',
      'Collaborated with cross-functional teams to deliver features 25% ahead of schedule',
      'Optimized application performance resulting in 50% faster load times',
      'Built RESTful APIs handling 10,000+ requests per minute with 99.9% uptime',
      'Led migration from monolithic to microservices architecture serving 500,000+ users',
      'Mentored 5 junior developers, improving team productivity by 30%'
    ],
    education: [
      'Bachelor of Science in Computer Science - Focus on Software Engineering and Data Structures',
      'Master of Science in Software Engineering - Specialization in Distributed Systems',
      'Certificate in Cloud Computing - AWS Solutions Architect',
      'Coursework: Data Structures, Algorithms, Database Systems, Web Development'
    ],
    skills: [
      'Programming Languages: Java, Python, JavaScript, TypeScript, Go, Rust',
      'Frameworks: React, Angular, Vue.js, Spring Boot, Django, Express.js',
      'Databases: PostgreSQL, MySQL, MongoDB, Redis, Cassandra',
      'Cloud Platforms: AWS, Google Cloud, Azure, Docker, Kubernetes',
      'Tools: Git, Jenkins, Jira, Confluence, VS Code, IntelliJ',
      'Methodologies: Agile, Scrum, TDD, CI/CD, DevOps'
    ],
    projects: [
      'E-commerce Platform: Built full-stack application with React and Node.js handling 50,000+ transactions',
      'Data Analytics Dashboard: Created real-time visualization tool processing 1M+ data points',
      'Mobile App Backend: Developed scalable API serving 100,000+ mobile users',
      'Machine Learning Pipeline: Implemented automated data processing reducing manual work by 80%'
    ],
    certifications: [
      'AWS Certified Solutions Architect - Professional',
      'Google Cloud Professional Developer',
      'Oracle Certified Java Programmer',
      'Certified Scrum Master (CSM)',
      'MongoDB Certified Developer'
    ],
    achievements: [
      'Reduced system downtime by 90% through proactive monitoring and automation',
      'Led successful migration project saving company $200,000 annually',
      'Won "Innovation Award" for developing internal tool increasing team efficiency by 40%',
      'Published 3 technical articles with 10,000+ views on engineering best practices'
    ],
    summary: [
      'Experienced Software Engineer with 5+ years developing scalable web applications and APIs using modern technologies',
      'Full-stack developer proficient in React, Node.js, and cloud platforms with expertise in system design',
      'Results-driven engineer with strong problem-solving skills and passion for clean, maintainable code'
    ]
  },
  'data-scientist': {
    experience: [
      'Built machine learning models achieving 95% accuracy in predicting customer behavior and churn',
      'Analyzed large datasets (10TB+) to identify trends and optimization opportunities saving $500K annually',
      'Created automated reporting dashboards reducing manual analysis work by 60 hours weekly',
      'Presented findings to C-level executives resulting in 25% increase in operational efficiency',
      'Developed recommendation engine increasing user engagement by 40% and revenue by $2M',
      'Led data science team of 4 analysts delivering 15+ predictive models in production'
    ],
    education: [
      'Master of Science in Data Science - Specialization in Machine Learning',
      'Bachelor of Science in Statistics - Minor in Computer Science',
      'Certificate in Deep Learning - Stanford University',
      'Coursework: Statistical Analysis, Machine Learning, Data Mining, Big Data Analytics'
    ],
    skills: [
      'Programming: Python, R, SQL, Scala, Java',
      'ML/AI: TensorFlow, PyTorch, Scikit-learn, Keras, XGBoost',
      'Data Tools: Pandas, NumPy, Matplotlib, Seaborn, Plotly',
      'Big Data: Spark, Hadoop, Kafka, Airflow',
      'Cloud: AWS, Google Cloud, Azure ML, Databricks',
      'Databases: PostgreSQL, MongoDB, Snowflake, BigQuery'
    ],
    projects: [
      'Customer Churn Prediction: Reduced customer attrition by 25% using ensemble methods',
      'Fraud Detection System: Implemented real-time model with 99.5% accuracy',
      'Recommendation Engine: Increased user engagement by 40% using collaborative filtering',
      'Price Optimization Model: Improved profit margins by 15% through dynamic pricing'
    ],
    certifications: [
      'AWS Certified Machine Learning - Specialty',
      'Google Cloud Professional Data Engineer',
      'Microsoft Azure Data Scientist Associate',
      'Databricks Certified Associate Developer',
      'Tableau Desktop Certified Professional'
    ],
    achievements: [
      'Published 5 research papers in top-tier machine learning conferences',
      'Won "Data Science Innovation Award" for breakthrough customer analytics model',
      'Reduced model training time by 70% through advanced feature engineering',
      'Generated $3M in additional revenue through predictive analytics initiatives'
    ],
    summary: [
      'Data Scientist with 6+ years experience turning complex data into actionable business insights',
      'Machine learning expert with proven track record of building predictive models in production',
      'Analytics professional skilled in statistical analysis, data visualization, and stakeholder communication'
    ]
  },
  'product-manager': {
    experience: [
      'Led product strategy for mobile app with 2M+ users, increasing engagement by 45%',
      'Managed product roadmap and cross-functional teams of 15+ engineers and designers',
      'Launched 8 major features resulting in 30% increase in user retention',
      'Conducted user research with 500+ participants to inform product decisions',
      'Increased revenue by $5M through strategic feature prioritization and A/B testing',
      'Collaborated with stakeholders to define product vision achieving 95% customer satisfaction'
    ],
    education: [
      'Master of Business Administration (MBA) - Focus on Product Management',
      'Bachelor of Science in Engineering - Minor in Business',
      'Certificate in Product Management - Stanford University',
      'Coursework: Strategy, Marketing, Data Analysis, User Experience Design'
    ],
    skills: [
      'Product Strategy: Roadmap Planning, Market Research, Competitive Analysis',
      'Analytics: Google Analytics, Mixpanel, Amplitude, A/B Testing',
      'Design: Figma, Sketch, User Research, Wireframing, Prototyping',
      'Technical: SQL, Python, Jira, Confluence, Slack',
      'Methodologies: Agile, Scrum, Lean Startup, Design Thinking',
      'Business: P&L Management, Pricing Strategy, Go-to-Market'
    ],
    projects: [
      'Mobile App Redesign: Led complete UX overhaul increasing user satisfaction by 40%',
      'New Feature Launch: Managed end-to-end development of subscription model generating $2M ARR',
      'Market Expansion: Launched product in 3 new markets achieving 150% of revenue targets',
      'Platform Integration: Led API partnership increasing user base by 25%'
    ],
    certifications: [
      'Certified Product Manager (CPM)',
      'Google Analytics Certified',
      'Scrum Product Owner Certified',
      'HubSpot Content Marketing Certified',
      'Pragmatic Marketing Certified'
    ],
    achievements: [
      'Increased product revenue by 200% over 2 years through strategic initiatives',
      'Reduced time-to-market by 40% by implementing agile product development',
      'Won "Product Innovation Award" for launching industry-leading feature',
      'Built and led high-performing product team of 20+ professionals'
    ],
    summary: [
      'Product Manager with 7+ years experience driving product strategy and user-centric innovation',
      'Strategic thinker with proven track record of launching successful products and features',
      'Data-driven leader skilled in market research, user experience, and cross-functional collaboration'
    ]
  }
};

// Generate advanced template specification
export function generateAdvancedTemplate(
  jobRole: string,
  industry: string,
  keywords: string[] = []
): AdvancedTemplateSpec {
  const fontPair = fontPairings[Math.floor(Math.random() * fontPairings.length)];
  const colorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  const layout = layouts[Math.floor(Math.random() * layouts.length)];
  const bulletStyle = bulletStyles[Math.floor(Math.random() * bulletStyles.length)];
  
  const roleKey = jobRole.toLowerCase().replace(/\s+/g, '-') as keyof typeof roleBasedSuggestions;
  const suggestions = roleBasedSuggestions[roleKey] || roleBasedSuggestions['software-engineer'];

  return {
    id: `advanced-${jobRole.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
    name: `${jobRole} ${colorScheme.name} ${layout.type.charAt(0).toUpperCase() + layout.type.slice(1)}`,
    jobRole,
    industry,
    layout: {
      ...layout,
      description: layout.description
    },
    typography: {
      headerFont: fontPair.header,
      bodyFont: fontPair.body,
      sizes: {
        h1: '18pt',
        h2: '16pt',
        h3: '14pt',
        body: '11pt',
        small: '10pt'
      },
      weights: {
        header: 'bold',
        subheader: '600',
        body: 'normal',
        emphasis: '500'
      }
    },
    colors: {
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
      accent: colorScheme.accent,
      background: colorScheme.background,
      text: colorScheme.text,
      textLight: '#6B7280',
      border: '#E5E7EB',
      cardBg: '#F9FAFB'
    },
    spacing: {
      lineHeight: 1.5,
      sectionSpacing: '24px',
      padding: '16px',
      margins: {
        top: '20px',
        bottom: '20px',
        left: '24px',
        right: '24px'
      },
      gaps: {
        small: '8px',
        medium: '16px',
        large: '32px'
      }
    },
    bullets: {
      ...bulletStyle,
      color: bulletStyle.color
    },
    atsOptimization: {
      keywords: [...keywords, ...(industry === 'tech' ? ['Software Development', 'Programming', 'Technical Skills'] : [])],
      optimizationLevel: 'advanced',
      scannerFriendly: true,
      structuredData: true
    },
    aiSuggestions: suggestions
  };
}

// Generate multiple advanced templates
export function generateAdvancedTemplateCollection(count: number = 50): AdvancedTemplateSpec[] {
  const templates: AdvancedTemplateSpec[] = [];
  
  const roles = [
    'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Marketing Manager',
    'Financial Analyst', 'Project Manager', 'Sales Manager', 'HR Manager', 'Operations Manager',
    'Business Analyst', 'DevOps Engineer', 'Cybersecurity Specialist', 'Content Manager',
    'Account Manager', 'Consultant', 'Research Scientist', 'Quality Assurance Engineer'
  ];
  
  const industries = [
    'tech', 'finance', 'healthcare', 'marketing', 'consulting', 'education',
    'retail', 'manufacturing', 'media', 'nonprofit'
  ];

  for (let i = 0; i < count; i++) {
    const role = roles[i % roles.length];
    const industry = industries[i % industries.length];
    const keywords = getIndustryKeywords(industry);
    
    templates.push(generateAdvancedTemplate(role, industry, keywords));
  }
  
  return templates;
}

function getIndustryKeywords(industry: string): string[] {
  const keywordMap: Record<string, string[]> = {
    tech: ['Agile', 'API', 'Cloud Computing', 'DevOps', 'Machine Learning', 'Software Development'],
    finance: ['Financial Analysis', 'Risk Management', 'Compliance', 'Investment', 'Portfolio Management'],
    healthcare: ['Patient Care', 'HIPAA', 'Clinical Research', 'Quality Assurance', 'Healthcare Analytics'],
    marketing: ['Digital Marketing', 'SEO', 'Content Strategy', 'Campaign Management', 'Brand Management'],
    consulting: ['Strategy', 'Process Improvement', 'Change Management', 'Client Relations', 'Analysis'],
    education: ['Curriculum Development', 'Student Assessment', 'Educational Technology', 'Research', 'Teaching']
  };
  
  return keywordMap[industry] || [];
}