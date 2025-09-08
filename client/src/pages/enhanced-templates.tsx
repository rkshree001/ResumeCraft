import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/common/navbar";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { mockTemplates, templateCategories, industryMockData } from "@/data/template-variations";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { mockResumeData } from "@/data/mock-resume-data";
import { Search, Crown, Grid, List, ArrowLeft, Star } from "lucide-react";
import type { Template, User } from "@/types/resume";

export default function EnhancedTemplates() {
  const { user, isLoading: authLoading } = useAuth() as { user: User | null; isLoading: boolean; };
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const { data: serverTemplates = [], isLoading, error } = useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: async () => {
      // Use mock data instead of API
      const { mockStorage } = await import("@/data/mock-storage");
      return mockStorage.getTemplates();
    },
    retry: false,
  });

  // Use only the server templates (which are now mock templates from storage)
  const allTemplates = serverTemplates;

  // Filter templates based on search and category
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle unauthorized errors
  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  // Get mock data for preview based on category
  const getPreviewData = (template: any) => {
    const baseData = mockResumeData;
    const categoryData = industryMockData[template.category] || {};
    return {
      ...baseData,
      ...categoryData,
      settings: {
        ...baseData.settings,
        templateId: template.id,
        colorScheme: template.colorScheme || 'blue'
      }
    };
  };

  if (previewTemplate) {
    const template = allTemplates.find(t => t.id === previewTemplate);
    if (template) {
      return (
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                  className="self-start min-h-[44px] touch-manipulation"
                  data-testid="button-back-to-templates"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Templates
                </Button>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">{template.name}</h2>
                  <p className="text-muted-foreground capitalize">{template.category} template</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button asChild className="min-h-[44px] touch-manipulation" data-testid="button-use-template">
                  <Link href={`/builder?template=${template.id}`}>
                    Use This Template
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 sm:p-8 rounded-lg shadow-lg overflow-auto" style={{ maxHeight: '80vh' }}>
              <div className="mx-auto" style={{ 
                width: '210mm', 
                transform: window.innerWidth < 768 ? 'scale(0.4)' : 'scale(0.7)', 
                transformOrigin: 'top center' 
              }}>
                <ModernTemplate 
                  data={getPreviewData(template)} 
                  colorScheme={(template as any).colorScheme || 'blue'} 
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-resume-templates">
            Resume Templates
          </h1>
          <p className="text-muted-foreground mb-6">
            Choose from our collection of 120+ professional resume templates across different industries.
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-templates"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {templateCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                data-testid="button-grid-view"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                data-testid="button-list-view"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile-Friendly Category Filter */}
        <div className="mb-8">
          <div className="block sm:hidden mb-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full" data-testid="mobile-select-category">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Templates</SelectItem>
                {templateCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="hidden sm:block">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-10 mb-6">
                <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
                {templateCategories.slice(0, 9).map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs px-2">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTemplates.length} of {allTemplates.length} templates
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Free:</span>
            <Badge variant="secondary">{filteredTemplates.filter(t => !t.isPremium).length}</Badge>
            <span className="text-sm text-muted-foreground">Premium:</span>
            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
              <Crown className="w-3 h-3 mr-1" />
              {filteredTemplates.filter(t => t.isPremium).length}
            </Badge>
          </div>
        </div>

        {/* Templates Grid/List - Improved Mobile Layout */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" : "space-y-4"}>
          {filteredTemplates.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 className="text-lg font-medium text-foreground mb-2" data-testid="text-no-templates">
                No templates found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            filteredTemplates.map((template: any) => (
              <Card 
                key={template.id} 
                className={`hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
                data-testid={`card-template-${template.id}`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold truncate">{template.name}</CardTitle>
                        {template.isPremium && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-700" data-testid="badge-premium">
                            <Crown className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">
                        {template.category}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="w-full h-32 sm:h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded border flex items-center justify-center touch-manipulation">
                          <div className="text-center">
                            <div className="w-10 h-10 sm:w-8 sm:h-8 bg-primary/10 rounded mx-auto mb-2 flex items-center justify-center">
                              <span className="text-sm sm:text-xs font-bold text-primary">{template.name.charAt(0)}</span>
                            </div>
                            <span className="text-sm sm:text-xs text-muted-foreground">Preview</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 text-sm sm:text-xs py-2 sm:py-1 min-h-[44px] sm:min-h-auto touch-manipulation"
                            asChild
                            data-testid={`button-use-template-${template.id}`}
                          >
                            <Link href={`/builder?template=${template.id}`}>
                              Use Template
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-sm sm:text-xs py-2 sm:py-1 min-h-[44px] sm:min-h-auto touch-manipulation"
                            onClick={() => setPreviewTemplate(template.id)}
                            data-testid={`button-preview-template-${template.id}`}
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-l border-r flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-6 h-6 bg-primary/10 rounded mx-auto mb-1 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{template.name.charAt(0)}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="flex-1 flex items-center justify-between p-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          {template.isPremium && (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-700" data-testid="badge-premium">
                              <Crown className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">{template.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          asChild
                          data-testid={`button-use-template-${template.id}`}
                        >
                          <Link href={`/builder?template=${template.id}`}>
                            Use Template
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPreviewTemplate(template.id)}
                          data-testid={`button-preview-template-${template.id}`}
                        >
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}