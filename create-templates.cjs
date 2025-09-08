// Node.js script to create all templates via API
const http = require('http');

const templateData = [
  // Minimalist Category (25 templates)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Minimalist Design ${i + 1}`,
    category: 'minimalist',
    description: `Clean, ATS-friendly minimalist design variation ${i + 1}`,
    isPremium: i > 15
  })),
  
  // Creative Category (30 templates)
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `Creative Design ${i + 1}`,
    category: 'creative',
    description: `Bold infographic-style creative design ${i + 1}`,
    isPremium: i > 15
  })),
  
  // Modern Category (30 templates)
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `Modern Professional ${i + 1}`,
    category: 'modern',
    description: `Contemporary professional design ${i + 1}`,
    isPremium: i > 20
  })),
  
  // Executive Category (25 templates)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Executive Leadership ${i + 1}`,
    category: 'executive',
    description: `Premium executive leadership template ${i + 1}`,
    isPremium: i > 8
  })),
  
  // Tech Category (30 templates)
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `Tech Professional ${i + 1}`,
    category: 'tech',
    description: `Technology industry specialized template ${i + 1}`,
    isPremium: i > 18
  })),
  
  // Healthcare Category (25 templates)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Healthcare Professional ${i + 1}`,
    category: 'healthcare',
    description: `Healthcare industry professional design ${i + 1}`,
    isPremium: i > 15
  })),
  
  // Finance Category (25 templates)
  ...Array.from({ length: 25 }, (_, i) => ({
    name: `Finance Professional ${i + 1}`,
    category: 'finance',
    description: `Financial sector professional template ${i + 1}`,
    isPremium: i > 15
  })),
  
  // Academic Category (20 templates)
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `Academic CV ${i + 1}`,
    category: 'academic',
    description: `Academic curriculum vitae design ${i + 1}`,
    isPremium: i > 12
  })),
  
  // Classic Category (20 templates)
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `Classic Traditional ${i + 1}`,
    category: 'classic',
    description: `Traditional professional format ${i + 1}`,
    isPremium: i > 15
  }))
];

async function createTemplate(template) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(template);
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/templates',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log(`Starting bulk creation of ${templateData.length} templates...`);
  
  let created = 0;
  let errors = 0;
  
  for (let i = 0; i < templateData.length; i++) {
    try {
      await createTemplate(templateData[i]);
      created++;
      
      if (created % 10 === 0) {
        console.log(`Created ${created}/${templateData.length} templates...`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      errors++;
      console.warn(`Failed to create template ${i + 1}:`, error.message);
    }
  }
  
  console.log(`\nCompleted! Created ${created} templates, ${errors} errors.`);
}

main().catch(console.error);