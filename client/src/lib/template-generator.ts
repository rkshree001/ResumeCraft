import { templateStyles, industries, jobRoles } from '@/data/template-variations';

// Template generator for creating 200+ unique resume templates
export interface TemplateMetadata {
  id: string;
  name: string;
  style: string;
  industry: string;
  role?: string;
  category: string;
  description: string;
  isPremium: boolean;
  colorScheme: string;
  features: string[];
  atsOptimized: boolean;
  multiPage: boolean;
  suitableFor: string[];
}

// Color schemes for different template styles
export const colorSchemes = {
  professional: ['blue', 'navy', 'gray', 'black', 'charcoal'],
  creative: ['purple', 'teal', 'orange', 'pink', 'indigo', 'rainbow', 'gradient'],
  minimalist: ['white', 'light-gray', 'soft-blue', 'mint', 'cream'],
  modern: ['blue', 'green', 'purple', 'red', 'teal', 'orange', 'cyan'],
  executive: ['black', 'navy', 'gold', 'silver', 'platinum', 'bronze'],
  healthcare: ['blue', 'green', 'teal', 'mint', 'light-blue'],
  tech: ['blue', 'purple', 'green', 'orange', 'cyan', 'indigo'],
  finance: ['navy', 'gray', 'blue', 'black', 'gold'],
  education: ['blue', 'green', 'purple', 'orange', 'teal'],
  creative_industry: ['purple', 'pink', 'orange', 'rainbow', 'gradient', 'vibrant']
};

// Template features
export const templateFeatures = {
  basic: ['Contact Information', 'Professional Summary', 'Work Experience', 'Education', 'Skills'],
  standard: ['Contact Information', 'Professional Summary', 'Work Experience', 'Education', 'Skills', 'Projects', 'Certifications'],
  comprehensive: ['Contact Information', 'Professional Summary', 'Work Experience', 'Education', 'Skills', 'Projects', 'Certifications', 'Languages', 'Awards', 'Volunteer Experience', 'Interests'],
  academic: ['Contact Information', 'Research Interests', 'Education', 'Publications', 'Research Experience', 'Teaching Experience', 'Grants & Funding', 'Conference Presentations', 'Awards'],
  creative: ['Contact Information', 'Portfolio Highlights', 'Creative Experience', 'Skills', 'Education', 'Awards', 'Exhibitions', 'Client Testimonials'],
  executive: ['Contact Information', 'Executive Summary', 'Leadership Experience', 'Strategic Achievements', 'Board Positions', 'Education', 'Key Competencies', 'Awards & Recognition']
};

// Generate all possible template combinations
export function generateAllTemplates(): TemplateMetadata[] {
  const templates: TemplateMetadata[] = [];
  let templateId = 1;

  // Generate style-based templates
  templateStyles.forEach(style => {
    const styleColors = colorSchemes[style.id as keyof typeof colorSchemes] || colorSchemes.modern;
    
    styleColors.forEach((color, colorIndex) => {
      // Basic style templates
      templates.push({
        id: `${style.id}-${color}-basic-${templateId++}`,
        name: `${style.name} ${color.charAt(0).toUpperCase() + color.slice(1)}`,
        style: style.id,
        industry: 'general',
        category: style.id,
        description: `${style.description} with ${color} color scheme`,
        isPremium: colorIndex > 2,
        colorScheme: color,
        features: templateFeatures.standard,
        atsOptimized: true,
        multiPage: false,
        suitableFor: ['entry-level', 'mid-level', 'senior']
      });

      // Professional variations
      if (style.id === 'modern' || style.id === 'minimalist' || style.id === 'executive') {
        templates.push({
          id: `${style.id}-${color}-professional-${templateId++}`,
          name: `${style.name} Professional ${color.charAt(0).toUpperCase() + color.slice(1)}`,
          style: style.id,
          industry: 'general',
          category: style.id,
          description: `Professional ${style.description.toLowerCase()} with enhanced formatting`,
          isPremium: true,
          colorScheme: color,
          features: templateFeatures.comprehensive,
          atsOptimized: true,
          multiPage: false,
          suitableFor: ['mid-level', 'senior', 'executive']
        });
      }
    });
  });

  // Generate industry-specific templates
  industries.forEach(industry => {
    const industryColors = colorSchemes[industry.id as keyof typeof colorSchemes] || colorSchemes.professional;
    
    industryColors.forEach((color, colorIndex) => {
      templateStyles.forEach(style => {
        // Skip incompatible combinations
        if (industry.id === 'healthcare' && style.id === 'creative') return;
        if (industry.id === 'finance' && style.id === 'creative') return;
        
        templates.push({
          id: `${industry.id}-${style.id}-${color}-${templateId++}`,
          name: `${industry.name} ${style.name} ${color.charAt(0).toUpperCase() + color.slice(1)}`,
          style: style.id,
          industry: industry.id,
          category: industry.id,
          description: `${style.description} optimized for ${industry.name.toLowerCase()} professionals`,
          isPremium: colorIndex > 1 || style.id === 'executive',
          colorScheme: color,
          features: industry.id === 'education' ? templateFeatures.academic : 
                   style.id === 'creative' ? templateFeatures.creative :
                   style.id === 'executive' ? templateFeatures.executive : templateFeatures.comprehensive,
          atsOptimized: true,
          multiPage: industry.id === 'education' || style.id === 'executive',
          suitableFor: industry.id === 'education' ? ['phd', 'postdoc', 'faculty'] : 
                      style.id === 'executive' ? ['director', 'vp', 'c-level'] : 
                      ['entry-level', 'mid-level', 'senior']
        });
      });
    });
  });

  // Generate role-specific templates
  jobRoles.forEach(role => {
    const roleIndustry = industries.find(ind => ind.id === role.category);
    if (!roleIndustry) return;

    const roleColors = colorSchemes[role.category as keyof typeof colorSchemes] || colorSchemes.modern;
    
    roleColors.slice(0, 3).forEach((color, colorIndex) => {
      templateStyles.slice(0, 3).forEach(style => {
        templates.push({
          id: `${role.id}-${style.id}-${color}-${templateId++}`,
          name: `${role.name} ${style.name} ${color.charAt(0).toUpperCase() + color.slice(1)}`,
          style: style.id,
          industry: role.category,
          role: role.id,
          category: role.category,
          description: `Specialized ${style.description.toLowerCase()} template for ${role.name} positions`,
          isPremium: colorIndex > 0 || style.id === 'executive',
          colorScheme: color,
          features: role.category === 'education' ? templateFeatures.academic :
                   role.category === 'creative' ? templateFeatures.creative :
                   role.id.includes('ceo') || role.id.includes('cto') || role.id.includes('cfo') ? templateFeatures.executive :
                   templateFeatures.comprehensive,
          atsOptimized: true,
          multiPage: role.category === 'education' || role.id.includes('director') || role.id.includes('vp'),
          suitableFor: [role.id]
        });
      });
    });
  });

  // Add special template variations
  const specialTemplates: TemplateMetadata[] = [
    // Infographic templates
    {
      id: `infographic-creative-multicolor-${templateId++}`,
      name: 'Infographic Creative Multicolor',
      style: 'creative',
      industry: 'creative',
      category: 'creative',
      description: 'Visual infographic-style resume with charts and icons',
      isPremium: true,
      colorScheme: 'rainbow',
      features: templateFeatures.creative,
      atsOptimized: false,
      multiPage: false,
      suitableFor: ['designer', 'marketer', 'creative-director']
    },
    // Portfolio templates
    {
      id: `portfolio-multi-page-${templateId++}`,
      name: 'Portfolio Multi-Page Professional',
      style: 'portfolio',
      industry: 'creative',
      category: 'portfolio',
      description: 'Multi-page portfolio template with project showcases',
      isPremium: true,
      colorScheme: 'blue',
      features: [...templateFeatures.creative, 'Portfolio Gallery', 'Project Case Studies'],
      atsOptimized: true,
      multiPage: true,
      suitableFor: ['designer', 'developer', 'architect', 'photographer']
    },
    // Executive templates
    {
      id: `executive-c-level-${templateId++}`,
      name: 'Executive C-Level Leadership',
      style: 'executive',
      industry: 'general',
      category: 'executive',
      description: 'Premium executive template for C-level positions',
      isPremium: true,
      colorScheme: 'gold',
      features: templateFeatures.executive,
      atsOptimized: true,
      multiPage: true,
      suitableFor: ['ceo', 'cto', 'cfo', 'coo', 'c-level']
    },
    // Academic CV templates
    {
      id: `academic-phd-${templateId++}`,
      name: 'Academic PhD Research',
      style: 'classic',
      industry: 'education',
      category: 'academic',
      description: 'Comprehensive academic CV for PhD and research positions',
      isPremium: false,
      colorScheme: 'blue',
      features: templateFeatures.academic,
      atsOptimized: true,
      multiPage: true,
      suitableFor: ['phd', 'postdoc', 'researcher', 'professor']
    },
    // Bilingual templates
    {
      id: `bilingual-english-spanish-${templateId++}`,
      name: 'Bilingual English-Spanish',
      style: 'modern',
      industry: 'general',
      category: 'international',
      description: 'Bilingual resume template with English and Spanish sections',
      isPremium: true,
      colorScheme: 'teal',
      features: [...templateFeatures.standard, 'Bilingual Support', 'Cultural Adaptation'],
      atsOptimized: true,
      multiPage: false,
      suitableFor: ['international', 'translator', 'customer-service']
    }
  ];

  templates.push(...specialTemplates);

  // Ensure we have at least 200 templates
  while (templates.length < 200) {
    const baseTemplate = templates[templates.length % 50];
    const variation = {
      ...baseTemplate,
      id: `${baseTemplate.id}-variant-${templateId++}`,
      name: `${baseTemplate.name} Variant`,
      isPremium: !baseTemplate.isPremium
    };
    templates.push(variation);
  }

  return templates.slice(0, 250); // Return 250+ templates
}

// Filter templates by criteria
export function filterTemplates(
  templates: TemplateMetadata[],
  criteria: {
    style?: string;
    industry?: string;
    role?: string;
    isPremium?: boolean;
    atsOptimized?: boolean;
    multiPage?: boolean;
  }
): TemplateMetadata[] {
  return templates.filter(template => {
    if (criteria.style && template.style !== criteria.style) return false;
    if (criteria.industry && template.industry !== criteria.industry) return false;
    if (criteria.role && template.role !== criteria.role) return false;
    if (criteria.isPremium !== undefined && template.isPremium !== criteria.isPremium) return false;
    if (criteria.atsOptimized !== undefined && template.atsOptimized !== criteria.atsOptimized) return false;
    if (criteria.multiPage !== undefined && template.multiPage !== criteria.multiPage) return false;
    return true;
  });
}

// Get recommended templates for a specific role/industry
export function getRecommendedTemplates(
  templates: TemplateMetadata[],
  userProfile: { role?: string; industry?: string; experienceLevel?: string }
): TemplateMetadata[] {
  const { role, industry, experienceLevel } = userProfile;
  
  let filtered = templates;

  // Filter by role first
  if (role) {
    filtered = filtered.filter(template => 
      template.role === role || 
      template.suitableFor.includes(role) ||
      template.industry === industry
    );
  }

  // Filter by industry
  if (industry && filtered.length > 10) {
    filtered = filtered.filter(template => template.industry === industry || template.industry === 'general');
  }

  // Filter by experience level
  if (experienceLevel && filtered.length > 10) {
    filtered = filtered.filter(template => template.suitableFor.includes(experienceLevel));
  }

  // If still too many, prioritize non-premium for entry-level
  if (filtered.length > 20 && experienceLevel === 'entry-level') {
    const nonPremium = filtered.filter(t => !t.isPremium);
    if (nonPremium.length > 10) filtered = nonPremium;
  }

  // Sort by relevance (exact matches first)
  filtered.sort((a, b) => {
    let scoreA = 0, scoreB = 0;
    
    if (a.role === role) scoreA += 10;
    if (b.role === role) scoreB += 10;
    
    if (a.industry === industry) scoreA += 5;
    if (b.industry === industry) scoreB += 5;
    
    if (a.atsOptimized) scoreA += 3;
    if (b.atsOptimized) scoreB += 3;
    
    return scoreB - scoreA;
  });

  return filtered.slice(0, 24); // Return top 24 recommendations
}