import type { Resume } from "@/types/resume";

export async function generatePDF(resume: Resume): Promise<void> {
  try {
    // Create a simplified HTML version of the resume for PDF generation
    const htmlContent = createPDFHtml(resume);
    
    // Create a temporary window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Failed to open print window');
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load
    await new Promise(resolve => {
      printWindow.onload = resolve;
      setTimeout(resolve, 1000); // Fallback timeout
    });

    // Trigger print dialog
    printWindow.print();
    
    // Close the window after a delay
    setTimeout(() => {
      printWindow.close();
    }, 100);

  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF');
  }
}

function createPDFHtml(resume: Resume): string {
  const { personalInfo, summary, experiences, education, skills, projects } = resume;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${resume.title || 'Resume'}</title>
      <style>
        @page {
          margin: 0.5in;
          size: A4;
        }
        
        body {
          font-family: 'Times New Roman', serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #000;
          margin: 0;
          padding: 0;
        }
        
        .header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #000;
        }
        
        .name {
          font-size: 18pt;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .contact {
          font-size: 10pt;
          margin-bottom: 3px;
        }
        
        .section {
          margin-bottom: 15px;
        }
        
        .section-title {
          font-size: 12pt;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #000;
          margin-bottom: 8px;
          padding-bottom: 2px;
        }
        
        .entry {
          margin-bottom: 10px;
        }
        
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 3px;
        }
        
        .entry-title {
          font-weight: bold;
          font-size: 11pt;
        }
        
        .entry-subtitle {
          font-size: 10pt;
          font-style: italic;
        }
        
        .entry-date {
          font-size: 10pt;
          color: #666;
        }
        
        .entry-description {
          font-size: 10pt;
          margin-left: 15px;
        }
        
        .skills-category {
          margin-bottom: 5px;
        }
        
        .skills-category strong {
          font-weight: bold;
        }
        
        @media print {
          body { print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${personalInfo?.name || 'Name Not Provided'}</div>
        ${personalInfo?.email || personalInfo?.phone || personalInfo?.location ? `
          <div class="contact">
            ${[personalInfo?.email, personalInfo?.phone, personalInfo?.location].filter(Boolean).join(' • ')}
          </div>
        ` : ''}
        ${personalInfo?.website || personalInfo?.linkedin || personalInfo?.github ? `
          <div class="contact">
            ${[personalInfo?.website, personalInfo?.linkedin, personalInfo?.github].filter(Boolean).join(' • ')}
          </div>
        ` : ''}
      </div>

      ${summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div>${summary}</div>
        </div>
      ` : ''}

      ${experiences && experiences.length > 0 ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${experiences.map(exp => `
            <div class="entry">
              <div class="entry-header">
                <div>
                  <div class="entry-title">${exp.jobTitle}</div>
                  <div class="entry-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</div>
                </div>
                <div class="entry-date">${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate || 'Present'}</div>
              </div>
              <div class="entry-description">
                ${exp.description.split('\n').map(line => line.trim()).filter(line => line).map(line => `<div>${line}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${education && education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${education.map(edu => `
            <div class="entry">
              <div class="entry-header">
                <div>
                  <div class="entry-title">${edu.degree}</div>
                  <div class="entry-subtitle">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</div>
                </div>
                <div class="entry-date">${edu.graduationYear}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
              </div>
              ${edu.relevantCoursework ? `
                <div class="entry-description">
                  <strong>Relevant Coursework:</strong> ${edu.relevantCoursework}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${skills && skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          ${Object.entries(
            skills.reduce((acc, skill) => {
              if (!acc[skill.category]) acc[skill.category] = [];
              acc[skill.category].push(skill.name);
              return acc;
            }, {} as Record<string, string[]>)
          ).map(([category, skillNames]) => `
            <div class="skills-category">
              <strong>${category}:</strong> ${skillNames.join(', ')}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${projects && projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${projects.map(project => `
            <div class="entry">
              <div class="entry-header">
                <div>
                  <div class="entry-title">${project.name}</div>
                  <div class="entry-subtitle"><strong>Technologies:</strong> ${project.technologies}</div>
                </div>
                ${project.startDate || project.endDate ? `
                  <div class="entry-date">${project.startDate || ''} ${project.startDate && project.endDate ? '—' : ''} ${project.endDate || ''}</div>
                ` : ''}
              </div>
              <div class="entry-description">${project.description}</div>
              ${project.link || project.github ? `
                <div class="entry-description">
                  ${[project.link && 'Live Demo', project.github && 'GitHub'].filter(Boolean).join(' • ')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </body>
    </html>
  `;
}
