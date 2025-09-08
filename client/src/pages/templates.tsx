import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/common/navbar";
import TemplateGrid from "@/components/templates/template-grid";
import { useQuery } from "@tanstack/react-query";
import type { Template } from "@/types/resume";

const CATEGORIES = [
  { id: "all", name: "All Templates" },
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "creative", name: "Creative" },
  { id: "minimal", name: "Minimal" },
  { id: "executive", name: "Executive" },
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: templates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: async () => {
      // Use mock data instead of API
      const { mockStorage } = await import("@/data/mock-storage");
      return mockStorage.getTemplates();
    },
    retry: false,
  });

  const filteredTemplates = templates.filter((template: Template) => 
    selectedCategory === "all" || template.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-templates-header">
            Choose Your Perfect Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            30+ professionally designed templates optimized for ATS systems and hiring managers.
          </p>
        </div>

        {/* Template Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  data-testid={`button-filter-${category.id}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-xl mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <TemplateGrid templates={filteredTemplates} />
        )}

        {filteredTemplates.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2" data-testid="text-no-templates">
              No templates found
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
