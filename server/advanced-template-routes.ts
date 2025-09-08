import type { Express } from "express";

export function registerAdvancedTemplateRoutes(app: Express) {
  // Generate a single advanced template with detailed specifications
  app.post("/api/templates/generate-advanced", async (req, res) => {
    try {
      const { jobRole, industry, keywords = [] } = req.body;
      
      if (!jobRole || !industry) {
        return res.status(400).json({ 
          message: "jobRole and industry are required" 
        });
      }
      
      // Generate advanced template specification
      const template = generateAdvancedTemplateSpec(jobRole, industry, keywords);
      
      res.json({
        template,
        specifications: {
          description: `Fully unique ATS-friendly resume template for a ${jobRole} in ${industry}`,
          layout: template.layout.description,
          fonts: `Header: ${template.typography.headerFont} Bold ${template.typography.sizes.h1}, Body: ${template.typography.bodyFont} ${template.typography.sizes.body}`,
          colors: `Primary: ${template.colors.primary}, Secondary: ${template.colors.secondary}, Accent: ${template.colors.accent}`,
          spacing: `Line-height: ${template.spacing.lineHeight}, Section spacing: ${template.spacing.sectionSpacing}, Padding: ${template.spacing.padding}`,
          bullets: `Type: ${template.bullets.type} (${template.bullets.icon})`,
          atsKeywords: template.atsOptimization.keywords,
          aiSuggestions: {
            experienceCount: template.aiSuggestions.experience.length,
            skillsCount: template.aiSuggestions.skills.length,
            projectsCount: template.aiSuggestions.projects.length
          }
        }
      });
    } catch (error) {
      console.error("Error generating advanced template:", error);
      res.status(500).json({ message: "Failed to generate advanced template" });
    }
  });
  
  // Get AI suggestions for specific role and section
  app.post("/api/templates/ai-suggestions-detailed", async (req, res) => {
    try {
      const { jobRole, industry, section } = req.body;
      
      const suggestions = getAISuggestions(jobRole, section);
      const keywords = getIndustryKeywords(industry);
      
      res.json({
        section,
        suggestions,
        keywords,
        formatting: {
          font: 'Open Sans',
          size: '11pt',
          lineHeight: 1.5,
          color: '#111827'
        }
      });
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      res.status(500).json({ message: "Failed to get AI suggestions" });
    }
  });
  
  // Validate ATS optimization for content
  app.post("/api/templates/ats-validate", async (req, res) => {
    try {
      const { content, jobRole, industry } = req.body;
      
      const targetKeywords = getIndustryKeywords(industry);
      
      const validation = validateATSCompliance(content, targetKeywords);
      
      res.json({
        score: validation.score,
        issues: validation.issues,
        suggestions: validation.suggestions,
        keywords: {
          target: targetKeywords,
          found: validation.foundKeywords,
          missing: validation.missingKeywords
        }
      });
    } catch (error) {
      console.error("Error validating ATS:", error);
      res.status(500).json({ message: "Failed to validate ATS optimization" });
    }
  });
}

// Helper functions
function generateAdvancedTemplateSpec(jobRole: string, industry: string, keywords: string[]) {
  const layoutTypes = [
    {
      type: 'sidebar-left',
      description: 'Left sidebar for skills and education, right main column for experience and projects with timeline'
    },
    {
      type: 'sidebar-right', 
      description: 'Right sidebar for contact and skills, left main column for experience and education'
    },
    {
      type: 'two-column',
      description: 'Balanced two-column layout with alternating content sections'
    },
    {
      type: 'top-header',
      description: 'Full-width header with contact info, single column content below'
    }
  ];
  
  const fontPairs = [
    { header: 'Montserrat', body: 'Open Sans' },
    { header: 'Lato', body: 'Roboto' },
    { header: 'Poppins', body: 'Noto Sans' },
    { header: 'Roboto Slab', body: 'Lora' }
  ];
  
  const colorSchemes = [
    { name: 'Corporate Blue', primary: '#1F2937', secondary: '#4B5563', accent: '#2563EB' },
    { name: 'Executive Navy', primary: '#1E3A8A', secondary: '#3B82F6', accent: '#60A5FA' },
    { name: 'Modern Teal', primary: '#0F766E', secondary: '#14B8A6', accent: '#5EEAD4' },
    { name: 'Professional Gray', primary: '#374151', secondary: '#6B7280', accent: '#9CA3AF' }
  ];
  
  const layout = layoutTypes[Math.floor(Math.random() * layoutTypes.length)];
  const fonts = fontPairs[Math.floor(Math.random() * fontPairs.length)];
  const colors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  
  return {
    id: `advanced-${jobRole.replace(/\\s+/g, '-').toLowerCase()}-${Date.now()}`,
    name: `${jobRole} ${colors.name} ${layout.type.charAt(0).toUpperCase() + layout.type.slice(1)}`,
    jobRole,
    industry,
    layout: {
      type: layout.type,
      description: layout.description,
      sections: {
        sidebar: ['Personal Info', 'Skills', 'Education', 'Languages', 'Certifications'],
        main: ['Summary', 'Experience', 'Projects', 'Achievements']
      },
      grid: { columns: 2, sidebarWidth: '35%', mainWidth: '65%' }
    },
    typography: {
      headerFont: fonts.header,
      bodyFont: fonts.body,
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
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: '#FFFFFF',
      text: '#111827',
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
      type: 'arrow',
      icon: '→',
      color: 'accent',
      size: '14px'
    },
    atsOptimization: {
      keywords: [...keywords, ...getIndustryKeywords(industry)],
      optimizationLevel: 'advanced',
      scannerFriendly: true,
      structuredData: true
    },
    aiSuggestions: getAISuggestions(jobRole, 'all')
  };
}

function getAISuggestions(jobRole: string, section: string) {
  const softwareEngineerSuggestions = {
    experience: [
      'Developed and maintained scalable web applications serving 100,000+ daily active users',
      'Implemented automated testing suites reducing bugs by 40% and deployment time by 60%',
      'Collaborated with cross-functional teams to deliver features 25% ahead of schedule',
      'Optimized application performance resulting in 50% faster load times',
      'Built RESTful APIs handling 10,000+ requests per minute with 99.9% uptime'
    ],
    skills: [
      'Programming Languages: Java, Python, JavaScript, TypeScript, Go',
      'Frameworks: React, Angular, Spring Boot, Django, Express.js',
      'Databases: PostgreSQL, MySQL, MongoDB, Redis',
      'Cloud Platforms: AWS, Google Cloud, Azure, Docker, Kubernetes',
      'Tools: Git, Jenkins, Jira, VS Code, IntelliJ'
    ],
    projects: [
      'E-commerce Platform: Built full-stack application with React and Node.js handling 50,000+ transactions',
      'Data Analytics Dashboard: Created real-time visualization tool processing 1M+ data points',
      'Mobile App Backend: Developed scalable API serving 100,000+ mobile users'
    ],
    summary: [
      'Experienced Software Engineer with 5+ years developing scalable web applications and APIs',
      'Full-stack developer proficient in modern frameworks with expertise in cloud technologies',
      'Results-driven engineer with strong problem-solving skills and passion for clean code'
    ]
  };
  
  // Add more role-specific suggestions here
  const suggestions = softwareEngineerSuggestions;
  
  if (section === 'all') {
    return suggestions;
  }
  
  return suggestions[section as keyof typeof suggestions] || suggestions.summary;
}

function getIndustryKeywords(industry: string): string[] {
  const keywordMap: Record<string, string[]> = {
    tech: ['Agile', 'API', 'Cloud Computing', 'DevOps', 'Machine Learning', 'Software Development'],
    finance: ['Financial Analysis', 'Risk Management', 'Compliance', 'Investment', 'Portfolio Management'],
    healthcare: ['Patient Care', 'HIPAA', 'Clinical Research', 'Quality Assurance', 'Healthcare Analytics'],
    marketing: ['Digital Marketing', 'SEO', 'Content Strategy', 'Campaign Management', 'Brand Management']
  };
  
  return keywordMap[industry] || [];
}

function validateATSCompliance(content: string, targetKeywords: string[]) {
  const issues = [];
  const suggestions = [];
  let score = 100;
  
  // Check content length
  if (content.length < 50) {
    issues.push("Content too short - ATS systems prefer detailed descriptions");
    score -= 20;
  }
  
  // Check for keywords
  const lowerContent = content.toLowerCase();
  const foundKeywords = targetKeywords.filter(
    keyword => lowerContent.includes(keyword.toLowerCase())
  );
  const missingKeywords = targetKeywords.filter(
    keyword => !lowerContent.includes(keyword.toLowerCase())
  );
  
  if (missingKeywords.length > targetKeywords.length * 0.7) {
    issues.push("Missing relevant keywords for ATS optimization");
    score -= 15;
    suggestions.push(`Consider adding: ${missingKeywords.slice(0, 3).join(', ')}`);
  }
  
  // Check for quantifiable results
  const hasNumbers = /\\b\\d+[%\\w]*\\b/.test(content);
  if (!hasNumbers) {
    issues.push("Include specific numbers and metrics");
    score -= 10;
    suggestions.push("Add percentages, dollar amounts, or other measurable results");
  }
  
  return {
    score: Math.max(0, score),
    issues,
    suggestions,
    foundKeywords,
    missingKeywords: missingKeywords.slice(0, 5)
  };
}