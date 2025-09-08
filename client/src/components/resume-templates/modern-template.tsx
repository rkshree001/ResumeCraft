import React from 'react';
import type { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  data: ResumeData;
  colorScheme?: string;
}

export function ModernTemplate({ data, colorScheme = 'blue' }: ModernTemplateProps) {
  const { personalInfo, summary, experiences, education, skills, projects, certifications, languages, awards, volunteering, interests } = data;

  const getColorClass = (type: 'primary' | 'accent' | 'bg') => {
    const colors = {
      blue: {
        primary: 'text-blue-600 border-blue-600',
        accent: 'bg-blue-100 text-blue-800',
        bg: 'border-blue-600'
      },
      green: {
        primary: 'text-green-600 border-green-600',
        accent: 'bg-green-100 text-green-800',
        bg: 'border-green-600'
      },
      purple: {
        primary: 'text-purple-600 border-purple-600',
        accent: 'bg-purple-100 text-purple-800',
        bg: 'border-purple-600'
      },
      red: {
        primary: 'text-red-600 border-red-600',
        accent: 'bg-red-100 text-red-800',
        bg: 'border-red-600'
      }
    };
    return colors[colorScheme as keyof typeof colors]?.[type] || colors.blue[type];
  };

  return (
    <div className="max-w-full mx-auto bg-white text-black p-6 w-[210mm] min-h-[297mm] overflow-hidden break-words" style={{ fontSize: '12px', lineHeight: '1.4' }}>
      {/* Header Section */}
      <div className={`border-b-2 pb-4 mb-6 ${getColorClass('bg')}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="preview-name">
          {personalInfo.name || "Your Name"}
        </h1>
        <div className="text-gray-600 text-sm flex flex-wrap gap-4" data-testid="preview-contact">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        </div>
        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div className={`text-sm flex flex-wrap gap-4 mt-2 ${getColorClass('primary')}`} data-testid="preview-links">
            {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
            {personalInfo.linkedin && <span>💼 LinkedIn</span>}
            {personalInfo.github && <span>🔗 GitHub</span>}
          </div>
        )}
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="mb-6">
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`} data-testid="preview-summary-title">
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
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`} data-testid="preview-experience-title">
            💼 WORK EXPERIENCE
          </h2>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900" data-testid={`preview-experience-${index}-title`}>
                    {exp.jobTitle}
                  </h3>
                  <p className={`font-medium text-sm ${getColorClass('primary').split(' ')[0]}`} data-testid={`preview-experience-${index}-company`}>
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
                    <span className={`mr-2 mt-1 ${getColorClass('primary').split(' ')[0]}`}>•</span>
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
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`} data-testid="preview-education-title">
            🎓 EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900" data-testid={`preview-education-${index}-degree`}>
                    {edu.degree}
                  </h3>
                  <p className={`font-medium text-sm ${getColorClass('primary').split(' ')[0]}`} data-testid={`preview-education-${index}-institution`}>
                    {edu.institution}, {edu.location}
                  </p>
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  {edu.graduationYear}
                </span>
              </div>
              {edu.gpa && (
                <p className="text-sm text-gray-700 mt-1">
                  <span className={`mr-2 ${getColorClass('primary').split(' ')[0]}`}>•</span>
                  <strong>GPA:</strong> {edu.gpa}
                </p>
              )}
              {edu.relevantCoursework && (
                <p className="text-sm text-gray-700 mt-1" data-testid={`preview-education-${index}-coursework`}>
                  <span className={`mr-2 ${getColorClass('primary').split(' ')[0]}`}>•</span>
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
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`} data-testid="preview-skills-title">
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
                    <span key={skillIndex} className={`px-2 py-1 rounded text-xs font-medium ${getColorClass('accent')}`}>
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
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`} data-testid="preview-projects-title">
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
                <span className={`mr-2 ${getColorClass('primary').split(' ')[0]}`}>•</span>
                <span className="text-sm text-gray-700" data-testid={`preview-project-${index}-technologies`}>
                  <strong>Technologies:</strong> {project.technologies}
                </span>
              </div>
              <div className="text-sm text-gray-700" data-testid={`preview-project-${index}-description`}>
                <span className={`mr-2 ${getColorClass('primary').split(' ')[0]}`}>•</span>
                {project.description}
              </div>
              {(project.link || project.github) && (
                <div className={`text-sm mt-2 ${getColorClass('primary').split(' ')[0]}`} data-testid={`preview-project-${index}-links`}>
                  {project.link && <span className="mr-4">🔗 Live Demo</span>}
                  {project.github && <span>💻 GitHub</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Additional sections */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`}>
            🏆 CERTIFICATIONS
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className={`font-medium text-sm ${getColorClass('primary').split(' ')[0]}`}>{cert.issuer}</p>
                </div>
                <span className="text-gray-500 text-sm font-medium">{cert.date}</span>
              </div>
              {cert.credentialId && (
                <p className="text-sm text-gray-700 mt-1">
                  <span className={`mr-2 ${getColorClass('primary').split(' ')[0]}`}>•</span>
                  <strong>Credential ID:</strong> {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {languages && languages.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`}>
            🌍 LANGUAGES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{lang.name}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getColorClass('accent')}`}>
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {awards && awards.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`}>
            🥇 AWARDS & HONORS
          </h2>
          {awards.map((award, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{award.name}</h3>
                  <p className={`font-medium text-sm ${getColorClass('primary').split(' ')[0]}`}>{award.issuer}</p>
                </div>
                <span className="text-gray-500 text-sm font-medium">{award.date}</span>
              </div>
              {award.description && (
                <p className="text-sm text-gray-700 mt-1">
                  <span className={`mr-2 ${getColorClass('primary').split(' ')[0]}`}>•</span>
                  {award.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {volunteering && volunteering.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`}>
            🤝 VOLUNTEER EXPERIENCE
          </h2>
          {volunteering.map((vol, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{vol.role}</h3>
                  <p className={`font-medium text-sm ${getColorClass('primary').split(' ')[0]}`}>{vol.organization}</p>
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  {vol.startDate} - {vol.endDate || "Present"}
                </span>
              </div>
              {vol.description && (
                <div className="text-sm text-gray-700">
                  {vol.description.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className="flex items-start mb-1">
                      <span className={`mr-2 mt-1 ${getColorClass('primary').split(' ')[0]}`}>•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {interests && interests.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-bold border-b border-gray-200 pb-1 mb-3 ${getColorClass('primary')}`}>
            🎯 INTERESTS
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}