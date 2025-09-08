import type { Express } from "express";

export function registerEnhancedTemplateRoutes(app: Express) {
  // Generate enhanced template collection with all variations
  app.post("/api/templates/generate-enhanced-collection", async (req, res) => {
    try {
      const { count = 200, categories = [], layoutTypes = [] } = req.body;
      
      const templates = generateEnhancedTemplateCollection(count, categories, layoutTypes);
      
      res.json({
        templates: templates.slice(0, 50), // Return first 50 for performance
        total: templates.length,
        summary: {
          layouts: [...new Set(templates.map(t => t.layout.type))],
          categories: [...new Set(templates.map(t => t.category))],
          colorSchemes: [...new Set(templates.map(t => t.colors.name))],
          fontCombinations: [...new Set(templates.map(t => `${t.typography.headerFont}/${t.typography.bodyFont}`))]
        }
      });
    } catch (error) {
      console.error("Error generating enhanced template collection:", error);
      res.status(500).json({ message: "Failed to generate enhanced templates" });
    }
  });

  // Get templates by specific criteria
  app.get("/api/templates/enhanced/filter", async (req, res) => {
    try {
      const { category, layoutType, colorScheme, fontFamily } = req.query;
      
      let templates = generateEnhancedTemplateCollection(200);
      
      if (category) {
        templates = templates.filter(t => t.category === category);
      }
      
      if (layoutType) {
        templates = templates.filter(t => t.layout.type === layoutType);
      }
      
      if (colorScheme) {
        templates = templates.filter(t => t.colors.name.toLowerCase().includes((colorScheme as string).toLowerCase()));
      }
      
      if (fontFamily) {
        templates = templates.filter(t => 
          t.typography.headerFont.toLowerCase().includes((fontFamily as string).toLowerCase()) ||
          t.typography.bodyFont.toLowerCase().includes((fontFamily as string).toLowerCase())
        );
      }
      
      res.json({
        templates: templates.slice(0, 20),
        total: templates.length,
        filters: {
          category,
          layoutType,
          colorScheme,
          fontFamily
        }
      });
    } catch (error) {
      console.error("Error filtering enhanced templates:", error);
      res.status(500).json({ message: "Failed to filter templates" });
    }
  });

  // Get template customization options
  app.get("/api/templates/customization-options", async (req, res) => {
    try {
      res.json({
        layouts: [
          { type: 'sidebar-left', name: 'Left Sidebar', description: 'Skills and education on left, main content on right' },
          { type: 'sidebar-right', name: 'Right Sidebar', description: 'Contact and skills on right, main content on left' },
          { type: 'top-header', name: 'Top Header', description: 'Full-width header with single column below' },
          { type: 'two-column', name: 'Two Column', description: 'Balanced two-column layout' },
          { type: 'single-column', name: 'Single Column', description: 'Traditional single-column layout' },
          { type: 'timeline', name: 'Timeline', description: 'Chronological timeline layout' },
          { type: 'infographic', name: 'Infographic', description: 'Visual infographic style with charts' }
        ],
        categories: [
          { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple design with lots of white space' },
          { id: 'creative', name: 'Creative', description: 'Bold colors and unique layouts for creative roles' },
          { id: 'modern', name: 'Modern', description: 'Contemporary design with modern typography' },
          { id: 'executive', name: 'Executive', description: 'Professional design for senior positions' },
          { id: 'infographic', name: 'Infographic', description: 'Visual elements with charts and graphs' },
          { id: 'portfolio', name: 'Portfolio', description: 'Showcase work and projects prominently' }
        ],
        fonts: {
          headers: ['Montserrat', 'Lato', 'Poppins', 'Roboto Slab', 'Oswald', 'Playfair Display', 'Merriweather', 'Raleway', 'Ubuntu', 'Crimson Text'],
          body: ['Open Sans', 'Roboto', 'Lora', 'Noto Sans', 'PT Sans', 'Source Sans Pro', 'Nunito', 'Oxygen', 'Libre Baskerville']
        },
        colors: [
          { name: 'Navy Professional', primary: '#1E3A8A', accent: '#60A5FA' },
          { name: 'Classic Black', primary: '#000000', accent: '#6B7280' },
          { name: 'Dark Gray Executive', primary: '#1F2937', accent: '#9CA3AF' },
          { name: 'Teal Modern', primary: '#0F766E', accent: '#5EEAD4' },
          { name: 'Maroon Traditional', primary: '#7C2D12', accent: '#F87171' },
          { name: 'Blue Corporate', primary: '#1E40AF', accent: '#93C5FD' },
          { name: 'Orange Creative', primary: '#EA580C', accent: '#FDBA74' },
          { name: 'Green Tech', primary: '#166534', accent: '#4ADE80' }
        ],
        bullets: [
          { type: 'dot', character: '•', name: 'Dot' },
          { type: 'dash', character: '—', name: 'Dash' },
          { type: 'arrow', character: '→', name: 'Arrow' },
          { type: 'checkmark', character: '✓', name: 'Checkmark' },
          { type: 'square', character: '▪', name: 'Square' },
          { type: 'triangle', character: '▶', name: 'Triangle' },
          { type: 'chevron', character: '›', name: 'Chevron' }
        ],
        typography: [
          { name: 'Compact', h1: '16pt', h2: '14pt', h3: '12pt', body: '10pt', lineHeight: 1.2 },
          { name: 'Standard', h1: '18pt', h2: '16pt', h3: '14pt', body: '11pt', lineHeight: 1.4 },
          { name: 'Comfortable', h1: '20pt', h2: '18pt', h3: '16pt', body: '12pt', lineHeight: 1.6 }
        ],
        spacing: [
          { name: 'Tight', sectionPadding: '12px', elementMargin: '8px' },
          { name: 'Normal', sectionPadding: '20px', elementMargin: '12px' },
          { name: 'Loose', sectionPadding: '28px', elementMargin: '16px' }
        ],
        additionalSections: [
          'Volunteer Experience',
          'Publications',
          'Awards & Honors',
          'Professional Memberships',
          'Conference Presentations',
          'Technical Expertise',
          'Leadership Experience',
          'Research Experience',
          'Patents',
          'Media Coverage',
          'International Experience',
          'Professional Development'
        ]
      });
    } catch (error) {
      console.error("Error getting customization options:", error);
      res.status(500).json({ message: "Failed to get customization options" });
    }
  });
}

function generateEnhancedTemplateCollection(count: number, filterCategories: string[] = [], filterLayouts: string[] = []) {
  const templates = [];
  
  const layouts = ['sidebar-left', 'sidebar-right', 'top-header', 'two-column', 'single-column', 'timeline', 'infographic'];
  const categories = ['minimalist', 'creative', 'modern', 'executive', 'infographic', 'portfolio'];
  const fonts = [
    { header: 'Montserrat', body: 'Open Sans' },
    { header: 'Lato', body: 'Roboto' },
    { header: 'Poppins', body: 'Noto Sans' },
    { header: 'Roboto Slab', body: 'Lora' },
    { header: 'Oswald', body: 'PT Sans' }
  ];
  const colors = [
    { name: 'Navy Professional', primary: '#1E3A8A', secondary: '#3B82F6', accent: '#60A5FA' },
    { name: 'Classic Black', primary: '#000000', secondary: '#374151', accent: '#6B7280' },
    { name: 'Dark Gray Executive', primary: '#1F2937', secondary: '#4B5563', accent: '#9CA3AF' },
    { name: 'Teal Modern', primary: '#0F766E', secondary: '#14B8A6', accent: '#5EEAD4' },
    { name: 'Maroon Traditional', primary: '#7C2D12', secondary: '#DC2626', accent: '#F87171' }
  ];
  
  for (let i = 0; i < count; i++) {
    const layout = layouts[i % layouts.length];
    const category = categories[i % categories.length];
    const font = fonts[i % fonts.length];
    const color = colors[i % colors.length];
    
    // Apply filters if specified
    if (filterCategories.length > 0 && !filterCategories.includes(category)) continue;
    if (filterLayouts.length > 0 && !filterLayouts.includes(layout)) continue;
    
    templates.push({
      id: `enhanced-${i + 1}`,
      name: `${color.name} ${layout.charAt(0).toUpperCase() + layout.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      category,
      layout: {
        type: layout,
        description: getLayoutDescription(layout),
        gridColumns: layout.includes('sidebar') || layout === 'two-column' ? 2 : 1
      },
      typography: {
        headerFont: font.header,
        bodyFont: font.body,
        sizes: getTypographySizes(i % 3),
        lineHeight: 1.2 + (i % 3) * 0.2
      },
      colors: {
        ...color,
        background: '#FFFFFF',
        text: '#111827',
        textLight: '#6B7280',
        border: '#E5E7EB',
        cardBg: '#F9FAFB'
      },
      spacing: {
        sectionPadding: `${12 + (i % 3) * 8}px`,
        elementMargin: `${8 + (i % 3) * 4}px`,
        lineSpacing: (1.2 + (i % 3) * 0.2).toString(),
        paragraphSpacing: `${10 + (i % 3) * 5}px`
      },
      bullets: {
        type: ['dot', 'dash', 'arrow', 'checkmark'][i % 4],
        character: ['•', '—', '→', '✓'][i % 4],
        color: 'accent',
        size: '12px'
      }
    });
  }
  
  return templates;
}

function getLayoutDescription(layout: string): string {
  const descriptions = {
    'sidebar-left': 'Left sidebar for skills and education, main content on right',
    'sidebar-right': 'Right sidebar for contact and skills, main content on left',
    'top-header': 'Full-width header with contact info, single column below',
    'two-column': 'Balanced two-column layout with alternating sections',
    'single-column': 'Traditional single-column layout with clear section breaks',
    'timeline': 'Timeline-based layout with chronological experience flow',
    'infographic': 'Visual infographic style with skill charts and progress bars'
  };
  return descriptions[layout as keyof typeof descriptions] || layout;
}

function getTypographySizes(variant: number) {
  const sizes = [
    { h1: '16pt', h2: '14pt', h3: '12pt', body: '10pt', small: '9pt' },
    { h1: '18pt', h2: '16pt', h3: '14pt', body: '11pt', small: '10pt' },
    { h1: '20pt', h2: '18pt', h3: '16pt', body: '12pt', small: '11pt' }
  ];
  return sizes[variant] || sizes[1];
}