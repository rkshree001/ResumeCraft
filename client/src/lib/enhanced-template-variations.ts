// Enhanced template variations with comprehensive styling options
export interface EnhancedTemplateVariation {
  id: string;
  name: string;
  category: 'minimalist' | 'creative' | 'modern' | 'executive' | 'infographic' | 'portfolio';
  layout: LayoutVariation;
  typography: TypographyVariation;
  colors: ColorVariation;
  spacing: SpacingVariation;
  bullets: BulletVariation;
  sections: SectionVariation[];
}

export interface LayoutVariation {
  type: 'sidebar-left' | 'sidebar-right' | 'top-header' | 'two-column' | 'single-column' | 'timeline' | 'infographic';
  description: string;
  gridColumns: number;
  sidebarWidth?: string;
  mainWidth?: string;
  headerHeight?: string;
  footerHeight?: string;
}

export interface TypographyVariation {
  headerFont: string;
  bodyFont: string;
  sizes: {
    h1: string; // 14-18pt range
    h2: string; // 12-16pt range
    h3: string; // 11-14pt range
    body: string; // 10-12pt range
    small: string; // 8-10pt range
  };
  weights: {
    header: 'bold' | '700' | '800' | '900';
    subheader: '500' | '600' | '700';
    body: 'normal' | '400' | '500';
    emphasis: '500' | '600' | 'bold';
  };
  lineHeight: number; // 1.2-1.6 range
}

export interface ColorVariation {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
  border: string;
  cardBg: string;
}

export interface SpacingVariation {
  sectionPadding: string; // 10-30px range
  elementMargin: string;
  lineSpacing: string;
  paragraphSpacing: string;
}

export interface BulletVariation {
  type: 'dot' | 'dash' | 'arrow' | 'checkmark' | 'icon' | 'square' | 'triangle' | 'chevron';
  character: string;
  color: string;
  size: string;
}

export interface SectionVariation {
  name: string;
  order: number;
  isVisible: boolean;
  customTitle?: string;
}

// Layout variations
const layoutVariations: LayoutVariation[] = [
  {
    type: 'sidebar-left',
    description: 'Left sidebar for skills and education, main content on right',
    gridColumns: 2,
    sidebarWidth: '35%',
    mainWidth: '65%'
  },
  {
    type: 'sidebar-right',
    description: 'Right sidebar for contact and skills, main content on left',
    gridColumns: 2,
    sidebarWidth: '30%',
    mainWidth: '70%'
  },
  {
    type: 'top-header',
    description: 'Full-width header with contact info, single column below',
    gridColumns: 1,
    headerHeight: '120px'
  },
  {
    type: 'two-column',
    description: 'Balanced two-column layout with alternating sections',
    gridColumns: 2,
    sidebarWidth: '45%',
    mainWidth: '55%'
  },
  {
    type: 'single-column',
    description: 'Traditional single-column layout with clear section breaks',
    gridColumns: 1
  },
  {
    type: 'timeline',
    description: 'Timeline-based layout with chronological experience flow',
    gridColumns: 1
  },
  {
    type: 'infographic',
    description: 'Visual infographic style with skill charts and progress bars',
    gridColumns: 1
  }
];

// Font combinations
const fontCombinations = [
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

// Color schemes
const colorSchemes: ColorVariation[] = [
  {
    name: 'Navy Professional',
    primary: '#1E3A8A',
    secondary: '#3B82F6',
    accent: '#60A5FA',
    background: '#FFFFFF',
    text: '#1F2937',
    textLight: '#6B7280',
    border: '#E5E7EB',
    cardBg: '#F8FAFC'
  },
  {
    name: 'Classic Black',
    primary: '#000000',
    secondary: '#374151',
    accent: '#6B7280',
    background: '#FFFFFF',
    text: '#000000',
    textLight: '#4B5563',
    border: '#D1D5DB',
    cardBg: '#F9FAFB'
  },
  {
    name: 'Dark Gray Executive',
    primary: '#1F2937',
    secondary: '#4B5563',
    accent: '#9CA3AF',
    background: '#FFFFFF',
    text: '#111827',
    textLight: '#6B7280',
    border: '#E5E7EB',
    cardBg: '#F3F4F6'
  },
  {
    name: 'Teal Modern',
    primary: '#0F766E',
    secondary: '#14B8A6',
    accent: '#5EEAD4',
    background: '#FFFFFF',
    text: '#134E4A',
    textLight: '#6B7280',
    border: '#D1FAE5',
    cardBg: '#F0FDF4'
  },
  {
    name: 'Maroon Traditional',
    primary: '#7C2D12',
    secondary: '#DC2626',
    accent: '#F87171',
    background: '#FFFFFF',
    text: '#7C2D12',
    textLight: '#6B7280',
    border: '#FEE2E2',
    cardBg: '#FEF2F2'
  },
  {
    name: 'Blue Corporate',
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#93C5FD',
    background: '#FFFFFF',
    text: '#1E3A8A',
    textLight: '#64748B',
    border: '#DBEAFE',
    cardBg: '#EFF6FF'
  },
  {
    name: 'Orange Creative',
    primary: '#EA580C',
    secondary: '#FB923C',
    accent: '#FDBA74',
    background: '#FFFFFF',
    text: '#9A3412',
    textLight: '#6B7280',
    border: '#FED7AA',
    cardBg: '#FFF7ED'
  },
  {
    name: 'Green Tech',
    primary: '#166534',
    secondary: '#16A34A',
    accent: '#4ADE80',
    background: '#FFFFFF',
    text: '#14532D',
    textLight: '#6B7280',
    border: '#BBF7D0',
    cardBg: '#F0FDF4'
  }
];

// Bullet variations
const bulletVariations: BulletVariation[] = [
  { type: 'dot', character: '•', color: 'accent', size: '12px' },
  { type: 'dash', character: '—', color: 'primary', size: '12px' },
  { type: 'arrow', character: '→', color: 'accent', size: '14px' },
  { type: 'checkmark', character: '✓', color: 'accent', size: '12px' },
  { type: 'square', character: '▪', color: 'primary', size: '10px' },
  { type: 'triangle', character: '▶', color: 'accent', size: '10px' },
  { type: 'chevron', character: '›', color: 'primary', size: '14px' },
  { type: 'icon', character: '⚡', color: 'accent', size: '12px' }
];

// Typography size variations
const typographySizes = [
  {
    name: 'Compact',
    h1: '16pt', h2: '14pt', h3: '12pt', body: '10pt', small: '9pt',
    lineHeight: 1.2
  },
  {
    name: 'Standard',
    h1: '18pt', h2: '16pt', h3: '14pt', body: '11pt', small: '10pt',
    lineHeight: 1.4
  },
  {
    name: 'Comfortable',
    h1: '20pt', h2: '18pt', h3: '16pt', body: '12pt', small: '11pt',
    lineHeight: 1.6
  }
];

// Spacing variations
const spacingVariations: SpacingVariation[] = [
  {
    sectionPadding: '12px',
    elementMargin: '8px',
    lineSpacing: '1.2',
    paragraphSpacing: '10px'
  },
  {
    sectionPadding: '20px',
    elementMargin: '12px',
    lineSpacing: '1.4',
    paragraphSpacing: '16px'
  },
  {
    sectionPadding: '28px',
    elementMargin: '16px',
    lineSpacing: '1.6',
    paragraphSpacing: '20px'
  }
];

// Additional sections for enhanced templates
const additionalSections = [
  { name: 'Volunteer Experience', order: 8, isVisible: false },
  { name: 'Publications', order: 9, isVisible: false },
  { name: 'Awards & Honors', order: 10, isVisible: false },
  { name: 'Professional Memberships', order: 11, isVisible: false },
  { name: 'Conference Presentations', order: 12, isVisible: false },
  { name: 'Technical Expertise', order: 13, isVisible: false },
  { name: 'Leadership Experience', order: 14, isVisible: false },
  { name: 'Research Experience', order: 15, isVisible: false },
  { name: 'Patents', order: 16, isVisible: false },
  { name: 'Media Coverage', order: 17, isVisible: false },
  { name: 'International Experience', order: 18, isVisible: false },
  { name: 'Professional Development', order: 19, isVisible: false }
];

// Generate enhanced template variations
export function generateEnhancedTemplateVariations(count: number = 200): EnhancedTemplateVariation[] {
  const templates: EnhancedTemplateVariation[] = [];
  
  const categories = ['minimalist', 'creative', 'modern', 'executive', 'infographic', 'portfolio'] as const;
  
  for (let i = 0; i < count; i++) {
    const layout = layoutVariations[i % layoutVariations.length];
    const fontPair = fontCombinations[i % fontCombinations.length];
    const colorScheme = colorSchemes[i % colorSchemes.length];
    const bullet = bulletVariations[i % bulletVariations.length];
    const typography = typographySizes[i % typographySizes.length];
    const spacing = spacingVariations[i % spacingVariations.length];
    const category = categories[i % categories.length];
    
    const template: EnhancedTemplateVariation = {
      id: `enhanced-template-${i + 1}`,
      name: `${colorScheme.name} ${layout.type.charAt(0).toUpperCase() + layout.type.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      category,
      layout,
      typography: {
        headerFont: fontPair.header,
        bodyFont: fontPair.body,
        sizes: typography,
        weights: {
          header: 'bold',
          subheader: '600',
          body: 'normal',
          emphasis: '500'
        },
        lineHeight: typography.lineHeight
      },
      colors: colorScheme,
      spacing,
      bullets: bullet,
      sections: [
        { name: 'Personal Information', order: 1, isVisible: true },
        { name: 'Professional Summary', order: 2, isVisible: true },
        { name: 'Work Experience', order: 3, isVisible: true },
        { name: 'Education', order: 4, isVisible: true },
        { name: 'Skills', order: 5, isVisible: true },
        { name: 'Projects', order: 6, isVisible: true },
        { name: 'Certifications', order: 7, isVisible: true },
        ...additionalSections.slice(0, Math.floor(Math.random() * 4) + 1) // Add 1-4 random additional sections
      ]
    };
    
    templates.push(template);
  }
  
  return templates;
}

// Get template by category
export function getTemplatesByCategory(category: string): EnhancedTemplateVariation[] {
  const allTemplates = generateEnhancedTemplateVariations(200);
  return allTemplates.filter(template => template.category === category);
}

// Get template by layout type
export function getTemplatesByLayout(layoutType: string): EnhancedTemplateVariation[] {
  const allTemplates = generateEnhancedTemplateVariations(200);
  return allTemplates.filter(template => template.layout.type === layoutType);
}