import { storage } from "./storage";
import { templateData } from "./template-data";

// Bulk insert all templates
export async function initializeAllTemplates() {
  try {
    console.log("Starting template initialization...");
    
    // Clear existing templates
    await storage.clearAllTemplates();
    console.log("Cleared existing templates");
    
    const createdTemplates = [];
    const batchSize = 20;
    
    for (let i = 0; i < templateData.length; i += batchSize) {
      const batch = templateData.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(templateData.length/batchSize)}`);
      
      for (const template of batch) {
        try {
          const dbTemplate = {
            name: template.name,
            category: template.category,
            description: template.description,
            isPremium: template.isPremium,
            previewImage: `/templates/${template.category}-preview.jpg`
          };
          
          const created = await storage.createTemplate(dbTemplate);
          createdTemplates.push(created);
        } catch (error) {
          console.warn(`Failed to create template ${template.name}:`, error);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`Successfully created ${createdTemplates.length} templates`);
    return createdTemplates;
  } catch (error) {
    console.error("Error initializing templates:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  initializeAllTemplates()
    .then(templates => {
      console.log(`Initialization complete! Created ${templates.length} templates.`);
      process.exit(0);
    })
    .catch(error => {
      console.error("Initialization failed:", error);
      process.exit(1);
    });
}