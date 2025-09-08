import React from 'react';
import type { ResumeData } from "../types/resume";
import { ModernTemplate } from "@/components/resume-templates/modern-template";

export function renderResumeTemplate(data: ResumeData, templateStyle: string = 'modern') {
  // Always use the modern template component
  return <ModernTemplate data={data} colorScheme={data.settings?.colorScheme || 'blue'} />;
}