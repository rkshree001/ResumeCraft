import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import type { Template } from "@/types/resume";

interface TemplateCardProps {
  template: Template;
  onUse?: () => void;
}

export default function TemplateCard({ template, onUse }: TemplateCardProps) {
  const { isAuthenticated } = useAuth();

  const handleUseTemplate = () => {
    if (onUse) {
      onUse();
    } else if (isAuthenticated) {
      window.location.href = `/builder?template=${template.id}`;
    } else {
      window.location.href = "/api/login";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern':
        return 'bg-primary/10 text-primary';
      case 'classic':
        return 'bg-secondary/50 text-secondary-foreground';
      case 'creative':
        return 'bg-accent/20 text-accent';
      case 'minimal':
        return 'bg-muted text-muted-foreground';
      case 'executive':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTemplatePreview = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern':
        return (
          <div className="bg-white rounded-lg p-3 h-full shadow-sm text-xs leading-tight">
            <div className="border-b border-primary pb-2 mb-3">
              <h3 className="font-bold text-gray-900 text-sm">Sarah Johnson</h3>
              <p className="text-gray-600 text-xs">Senior Software Engineer</p>
              <p className="text-gray-500 text-xs">sarah.johnson@email.com | (555) 123-4567</p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 text-xs mb-1">PROFESSIONAL SUMMARY</h4>
              <p className="text-gray-700 text-xs leading-relaxed">Results-driven software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-xs mb-1">WORK EXPERIENCE</h4>
              <div className="text-xs">
                <p className="font-medium text-gray-800">Senior Software Engineer</p>
                <p className="text-gray-600">TechCorp • 2021-Present</p>
              </div>
            </div>
          </div>
        );
      case 'classic':
        return (
          <div className="bg-white rounded-lg p-3 h-full shadow-sm text-xs leading-tight">
            <div className="text-center mb-3 border-b border-gray-300 pb-2">
              <h3 className="font-bold text-gray-900 text-sm">Michael Chen</h3>
              <p className="text-gray-600 text-xs">Project Manager</p>
              <p className="text-gray-500 text-xs">michael.chen@email.com</p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 text-xs mb-1">OBJECTIVE</h4>
              <p className="text-gray-700 text-xs leading-relaxed">Experienced project manager seeking to leverage expertise in agile methodologies and team leadership.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-xs mb-1">EXPERIENCE</h4>
              <div className="text-xs">
                <p className="font-medium text-gray-800">Senior Project Manager</p>
                <p className="text-gray-600">GlobalTech Inc • 2019-Present</p>
              </div>
            </div>
          </div>
        );
      case 'creative':
        return (
          <div className="bg-white rounded-lg p-3 h-full shadow-sm text-xs leading-tight">
            <div className="flex items-start space-x-2 mb-3">
              <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-xs">A</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm">Alex Rivera</h3>
                <p className="text-gray-600 text-xs">UX/UI Designer</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 mb-3">
              <div className="text-xs text-center py-1 px-1 bg-purple-100 text-purple-700 rounded">Figma</div>
              <div className="text-xs text-center py-1 px-1 bg-purple-100 text-purple-700 rounded">Adobe</div>
              <div className="text-xs text-center py-1 px-1 bg-purple-100 text-purple-700 rounded">Sketch</div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-xs mb-1">EXPERIENCE</h4>
              <div className="text-xs">
                <p className="font-medium text-gray-800">Senior UX Designer</p>
                <p className="text-gray-600">DesignStudio • 2020-Present</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg p-3 h-full shadow-sm text-xs leading-tight">
            <div className="mb-3">
              <h3 className="font-bold text-gray-900 text-sm">Emma Davis</h3>
              <p className="text-gray-600 text-xs">Marketing Specialist</p>
              <p className="text-gray-500 text-xs">emma.davis@email.com</p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-3">
              <h4 className="font-semibold text-gray-800 text-xs mb-1">SUMMARY</h4>
              <p className="text-gray-700 text-xs leading-relaxed">Digital marketing professional with expertise in content strategy, SEO, and social media management.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-xs mb-1">EXPERIENCE</h4>
              <div className="text-xs">
                <p className="font-medium text-gray-800">Marketing Specialist</p>
                <p className="text-gray-600">MarketPro Agency • 2022-Present</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="template-card bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
      <div className="aspect-[3/4] bg-gradient-to-br from-muted/30 to-muted/10 p-6 relative">
        {getTemplatePreview(template.category)}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button onClick={handleUseTemplate} data-testid={`button-use-template-${template.id}`}>
            Use Template
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-1" data-testid={`text-template-${template.id}-name`}>
          {template.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3" data-testid={`text-template-${template.id}-description`}>
          {template.description || 'Professional resume template'}
        </p>
        <div className="flex items-center justify-between">
          <Badge className={getCategoryColor(template.category)} data-testid={`badge-template-${template.id}-category`}>
            {template.category}
          </Badge>
          <span className={`text-xs font-medium ${template.isPremium ? 'text-accent' : 'text-muted-foreground'}`} data-testid={`text-template-${template.id}-tier`}>
            {template.isPremium ? 'Premium' : 'Free'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
