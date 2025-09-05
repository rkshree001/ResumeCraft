import React from 'react';
import type { ResumeData } from "../types/resume";
import { ModernTemplate } from "@/components/resume-templates/modern-template";

export function renderResumeTemplate(data: ResumeData, templateStyle: string = 'modern') {
  // Use the modern template component
  if (templateStyle === 'modern') {
    return <ModernTemplate data={data} colorScheme={data.settings?.colorScheme || 'blue'} />;
  }
  
  // Fallback to the old implementation for now
  const { personalInfo, summary, experiences, education, skills, projects } = data;

  // Modern Professional Template
  if (templateStyle === 'modern') {
    return (
      <div className="max-w-full mx-auto bg-white text-black p-6">
        {/* Header Section */}
        <div className="border-b-2 border-blue-600 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="preview-name">
            {personalInfo.name || "Your Name"}
          </h1>
          <div className="text-gray-600 text-sm flex flex-wrap gap-4" data-testid="preview-contact">
            {personalInfo.email && <span>📧 {personalInfo.email}</span>}
            {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          </div>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div className="text-blue-600 text-sm flex flex-wrap gap-4 mt-2" data-testid="preview-links">
              {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
              {personalInfo.linkedin && <span>💼 LinkedIn</span>}
              {personalInfo.github && <span>🔗 GitHub</span>}
            </div>
          )}
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3" data-testid="preview-summary-title">
              💼 PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm leading-relaxed text-gray-700" data-testid="preview-summary">
              {summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3" data-testid="preview-experience-title">
              💼 WORK EXPERIENCE
            </h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900" data-testid={`preview-experience-${index}-title`}>
                      {exp.jobTitle}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm" data-testid={`preview-experience-${index}-company`}>
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm font-medium" data-testid={`preview-experience-${index}-dates`}>
                    {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-sm text-gray-700" data-testid={`preview-experience-${index}-description`}>
                  {exp.description.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className="flex items-start mb-1">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3" data-testid="preview-education-title">
              🎓 EDUCATION
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900" data-testid={`preview-education-${index}-degree`}>
                      {edu.degree}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm" data-testid={`preview-education-${index}-institution`}>
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm font-medium">
                    {edu.graduationYear}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="text-blue-600 mr-2">•</span>
                    <strong>GPA:</strong> {edu.gpa}
                  </p>
                )}
                {edu.relevantCoursework && (
                  <p className="text-sm text-gray-700 mt-1" data-testid={`preview-education-${index}-coursework`}>
                    <span className="text-blue-600 mr-2">•</span>
                    <strong>Relevant Coursework:</strong> {edu.relevantCoursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3" data-testid="preview-skills-title">
              🚀 SKILLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(
                skills.reduce((acc: Record<string, string[]>, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill.name);
                  return acc;
                }, {})
              ).map(([category, skillNames]: [string, string[]], index) => (
                <div key={index} className="" data-testid={`preview-skills-${category.replace(/\s+/g, '-').toLowerCase()}`}>
                  <h4 className="font-bold text-gray-900 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillNames.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3" data-testid="preview-projects-title">
              🛠️ PROJECTS
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900" data-testid={`preview-project-${index}-name`}>
                    {project.name}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-gray-500 text-sm font-medium" data-testid={`preview-project-${index}-dates`}>
                      {project.startDate} {project.startDate && project.endDate && "—"} {project.endDate}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-sm text-gray-700" data-testid={`preview-project-${index}-technologies`}>
                    <strong>Technologies:</strong> {project.technologies}
                  </span>
                </div>
                <div className="text-sm text-gray-700" data-testid={`preview-project-${index}-description`}>
                  <span className="text-blue-600 mr-2">•</span>
                  {project.description}
                </div>
                {(project.link || project.github) && (
                  <div className="text-sm text-blue-600 mt-2" data-testid={`preview-project-${index}-links`}>
                    {project.link && <span className="mr-4">🔗 Live Demo</span>}
                    {project.github && <span>💻 GitHub</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default fallback to modern template
  return renderResumeTemplate(data, 'modern');
}