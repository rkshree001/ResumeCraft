import React from 'react';
import type { ResumeData } from "../types/resume";

export function renderResumeTemplate(data: ResumeData) {
  const { personalInfo, summary, experiences, education, skills, projects } = data;

  return (
    <div className="max-w-full mx-auto">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1" data-testid="preview-name">
          {personalInfo.name || "Your Name"}
        </h1>
        {personalInfo.email && (
          <div className="text-gray-600 text-sm space-x-2" data-testid="preview-contact">
            <span>{personalInfo.email}</span>
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
        )}
        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div className="text-gray-500 text-xs space-x-2 mt-1" data-testid="preview-links">
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.linkedin && <span>• LinkedIn</span>}
            {personalInfo.github && <span>• GitHub</span>}
          </div>
        )}
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2" data-testid="preview-summary-title">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs leading-relaxed" data-testid="preview-summary">
            {summary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2" data-testid="preview-experience-title">
            WORK EXPERIENCE
          </h2>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-sm" data-testid={`preview-experience-${index}-title`}>
                    {exp.jobTitle}
                  </h3>
                  <p className="text-gray-600 text-xs" data-testid={`preview-experience-${index}-company`}>
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <span className="text-gray-500 text-xs" data-testid={`preview-experience-${index}-dates`}>
                  {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate || "Present"}
                </span>
              </div>
              <div className="text-xs space-y-1 ml-3" data-testid={`preview-experience-${index}-description`}>
                {exp.description.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2" data-testid="preview-education-title">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold text-sm" data-testid={`preview-education-${index}-degree`}>
                {edu.degree}
              </h3>
              <p className="text-gray-600 text-xs" data-testid={`preview-education-${index}-institution`}>
                {edu.institution}, {edu.location} • {edu.graduationYear}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </p>
              {edu.relevantCoursework && (
                <p className="text-xs mt-1" data-testid={`preview-education-${index}-coursework`}>
                  <strong>Relevant Coursework:</strong> {edu.relevantCoursework}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2" data-testid="preview-skills-title">
            SKILLS
          </h2>
          <div className="text-xs">
            {Object.entries(
              skills.reduce((acc: Record<string, string[]>, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill.name);
                return acc;
              }, {})
            ).map(([category, skillNames]: [string, string[]], index) => (
              <div key={index} className="mb-1" data-testid={`preview-skills-${category.replace(/\s+/g, '-').toLowerCase()}`}>
                <strong>{category}:</strong> {skillNames.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2" data-testid="preview-projects-title">
            PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-sm" data-testid={`preview-project-${index}-name`}>
                  {project.name}
                </h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-gray-500 text-xs" data-testid={`preview-project-${index}-dates`}>
                    {project.startDate} {project.startDate && project.endDate && "—"} {project.endDate}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs mb-1" data-testid={`preview-project-${index}-technologies`}>
                <strong>Technologies:</strong> {project.technologies}
              </p>
              <p className="text-xs" data-testid={`preview-project-${index}-description`}>
                {project.description}
              </p>
              {(project.link || project.github) && (
                <div className="text-xs text-blue-600 space-x-2 mt-1" data-testid={`preview-project-${index}-links`}>
                  {project.link && <span>Live Demo</span>}
                  {project.github && <span>• GitHub</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}