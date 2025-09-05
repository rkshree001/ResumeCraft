import TemplateCard from "./template-card";
import type { Template } from "@/types/resume";

interface TemplateGridProps {
  templates: Template[];
  onTemplateSelect?: (template: Template) => void;
}

export default function TemplateGrid({ templates, onTemplateSelect }: TemplateGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-templates">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onUse={() => onTemplateSelect?.(template)}
        />
      ))}
    </div>
  );
}
