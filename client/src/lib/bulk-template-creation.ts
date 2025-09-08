// Client-side script to bulk create templates via API
export async function initializeAllTemplates() {
  try {
    console.log('Starting bulk template creation...');
    
    const response = await fetch('/api/init-templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        clearExisting: true,
        bulkCreate: true 
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Template creation result:', result);
    return result;
  } catch (error) {
    console.error('Error creating templates:', error);
    throw error;
  }
}

// Create individual template batches
const templateBatches = [
  // Minimalist templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Minimalist Template ${i + 1}`,
    category: 'minimalist',
    description: `ATS-friendly minimalist design variation ${i + 1}`,
    isPremium: i > 15
  })),
  
  // Creative templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Creative Template ${i + 1}`,
    category: 'creative',
    description: `Creative infographic-style design ${i + 1}`,
    isPremium: i > 10
  })),
  
  // Modern templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Modern Template ${i + 1}`,
    category: 'modern',
    description: `Contemporary professional design ${i + 1}`,
    isPremium: i > 12
  })),
  
  // Executive templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Executive Template ${i + 1}`,
    category: 'executive',
    description: `Premium executive leadership design ${i + 1}`,
    isPremium: i > 5
  })),
  
  // Tech templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Tech Template ${i + 1}`,
    category: 'tech',
    description: `Technology industry specialized design ${i + 1}`,
    isPremium: i > 10
  })),
  
  // Healthcare templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Healthcare Template ${i + 1}`,
    category: 'healthcare',
    description: `Healthcare professional design ${i + 1}`,
    isPremium: i > 15
  })),
  
  // Finance templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Finance Template ${i + 1}`,
    category: 'finance',
    description: `Financial sector professional design ${i + 1}`,
    isPremium: i > 12
  })),
  
  // Academic templates
  Array.from({ length: 20 }, (_, i) => ({
    name: `Academic Template ${i + 1}`,
    category: 'academic',
    description: `Academic CV design for researchers ${i + 1}`,
    isPremium: i > 10
  })),
  
  // Classic templates
  Array.from({ length: 25 }, (_, i) => ({
    name: `Classic Template ${i + 1}`,
    category: 'classic',
    description: `Traditional professional format ${i + 1}`,
    isPremium: i > 18
  })),
  
  // Sales templates
  Array.from({ length: 20 }, (_, i) => ({
    name: `Sales Template ${i + 1}`,
    category: 'sales',
    description: `Sales professional design ${i + 1}`,
    isPremium: i > 12
  }))
].flat();

export async function createTemplatesBulk() {
  const createdTemplates = [];
  const batchSize = 10;
  
  for (let i = 0; i < templateBatches.length; i += batchSize) {
    const batch = templateBatches.slice(i, i + batchSize);
    
    for (const template of batch) {
      try {
        const response = await fetch('/api/templates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(template)
        });
        
        if (response.ok) {
          const created = await response.json();
          createdTemplates.push(created);
          console.log(`Created template: ${template.name}`);
        }
      } catch (error) {
        console.warn(`Failed to create template ${template.name}:`, error);
      }
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Successfully created ${createdTemplates.length} templates`);
  return createdTemplates;
}