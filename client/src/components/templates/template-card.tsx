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
          <div className="bg-white rounded-lg p-4 h-full shadow-sm">
            <div className="h-6 bg-primary rounded mb-2"></div>
            <div className="h-3 bg-primary/60 rounded mb-4 w-2/3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded w-5/6"></div>
              <div className="h-2 bg-gray-300 rounded w-4/6"></div>
            </div>
            <div className="h-4 bg-gray-800 rounded mb-2 w-3/4"></div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-400 rounded"></div>
              <div className="h-1.5 bg-gray-400 rounded w-4/5"></div>
              <div className="h-1.5 bg-gray-400 rounded w-3/5"></div>
            </div>
          </div>
        );
      case 'classic':
        return (
          <div className="bg-white rounded-lg p-4 h-full shadow-sm">
            <div className="text-center mb-3">
              <div className="h-4 bg-gray-800 rounded mb-1 mx-auto w-3/4"></div>
              <div className="h-2 bg-gray-600 rounded mx-auto w-1/2"></div>
            </div>
            <div className="h-px bg-gray-300 mb-3"></div>
            <div className="space-y-2 mb-3">
              <div className="h-2 bg-gray-400 rounded"></div>
              <div className="h-2 bg-gray-400 rounded w-5/6"></div>
            </div>
            <div className="h-3 bg-gray-700 rounded mb-2 w-2/3"></div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-400 rounded"></div>
              <div className="h-1.5 bg-gray-400 rounded w-4/5"></div>
            </div>
          </div>
        );
      case 'creative':
        return (
          <div className="bg-white rounded-lg p-4 h-full shadow-sm">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-8 h-8 bg-accent/30 rounded-full"></div>
              <div className="flex-1">
                <div className="h-3 bg-accent rounded mb-1"></div>
                <div className="h-2 bg-accent/60 rounded w-2/3"></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="h-6 bg-accent/20 rounded"></div>
              <div className="h-6 bg-accent/20 rounded"></div>
              <div className="h-6 bg-accent/20 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded w-4/5"></div>
              <div className="h-2 bg-gray-300 rounded w-3/5"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg p-4 h-full shadow-sm">
            <div className="mb-4">
              <div className="h-5 bg-gray-900 rounded mb-2 w-2/3"></div>
              <div className="h-2 bg-gray-500 rounded w-1/2"></div>
            </div>
            <div className="w-full h-px bg-gray-200 mb-4"></div>
            <div className="space-y-3">
              <div>
                <div className="h-2 bg-gray-700 rounded mb-1 w-1/3"></div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-400 rounded"></div>
                  <div className="h-1.5 bg-gray-400 rounded w-4/5"></div>
                </div>
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
