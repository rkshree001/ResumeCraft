import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Navbar from "@/components/common/navbar";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Copy, 
  Share, 
  Download, 
  Trash2, 
  Eye,
  Calendar,
  FileText,
  Grid,
  List
} from "lucide-react";
import type { Resume, User } from "@/types/resume";

export default function MyResumes() {
  const { user, isLoading: authLoading } = useAuth() as { user: User | null; isLoading: boolean; };
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: resumes = [], isLoading, error } = useQuery<Resume[]>({
    queryKey: ["/api/resumes"],
    retry: false,
  });

  // Filter and sort resumes
  const filteredResumes = resumes
    .filter(resume => 
      resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resume.personalInfo as any)?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "updated":
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  // Delete resume mutation
  const deleteMutation = useMutation({
    mutationFn: async (resumeId: string) => {
      await apiRequest("DELETE", `/api/resumes/${resumeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume Deleted",
        description: "Your resume has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Duplicate resume mutation
  const duplicateMutation = useMutation({
    mutationFn: async (resume: Resume) => {
      const duplicateData = {
        title: `${resume.title} (Copy)`,
        templateId: resume.templateId,
        personalInfo: resume.personalInfo,
        summary: resume.summary,
        experiences: resume.experiences,
        education: resume.education,
        skills: resume.skills,
        projects: resume.projects,
        certifications: resume.certifications,
        languages: resume.languages,
        awards: resume.awards,
        volunteering: resume.volunteering,
        interests: resume.interests,
        customSections: resume.customSections,
        settings: resume.settings,
      };
      return await apiRequest("POST", "/api/resumes", duplicateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume Duplicated",
        description: "Your resume copy has been created successfully.",
      });
    },
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-my-resumes">
                My Resumes
              </h1>
              <p className="text-muted-foreground">
                Manage and organize all your resumes in one place.
              </p>
            </div>
            <Button asChild data-testid="button-create-new-resume">
              <Link href="/builder">
                <Plus className="w-4 h-4 mr-2" />
                Create New Resume
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-resumes"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Last Updated</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
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

        {/* Results Summary */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {filteredResumes.length} of {resumes.length} resumes
          </p>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{resumes.length} Total</Badge>
            <Badge variant="outline">{resumes.filter(r => r.isPublic).length} Public</Badge>
          </div>
        </div>

        {/* Resumes Grid/List */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredResumes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2" data-testid="text-no-resumes">
                {resumes.length === 0 ? "No resumes yet" : "No resumes found"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {resumes.length === 0 
                  ? "Create your first resume to get started." 
                  : "Try adjusting your search criteria."
                }
              </p>
              {resumes.length === 0 && (
                <Button asChild data-testid="button-create-first-resume">
                  <Link href="/builder">Create Your First Resume</Link>
                </Button>
              )}
            </div>
          ) : (
            filteredResumes.map((resume: Resume) => (
              <Card 
                key={resume.id} 
                className={`hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
                data-testid={`card-resume-${resume.id}`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold truncate" data-testid={`resume-title-${resume.id}`}>
                            {resume.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground truncate">
                            {(resume.personalInfo as any)?.name || "Unnamed"}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" data-testid={`menu-${resume.id}`}>
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/builder/${resume.id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => duplicateMutation.mutate(resume)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteMutation.mutate(resume.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(resume.updatedAt)}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {resume.viewCount || 0}
                          </div>
                        </div>
                        
                        {resume.isPublic && (
                          <Badge variant="outline" className="w-fit">
                            Public
                          </Badge>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1" asChild>
                            <Link href={`/builder/${resume.id}`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-l border-r flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <CardContent className="flex-1 flex items-center justify-between p-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate" data-testid={`resume-title-${resume.id}`}>
                          {resume.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {(resume.personalInfo as any)?.name || "Unnamed"}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>Updated {formatDate(resume.updatedAt)}</span>
                          <span>{resume.viewCount || 0} views</span>
                          {resume.isPublic && <Badge variant="outline" className="text-xs">Public</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" asChild>
                          <Link href={`/builder/${resume.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" data-testid={`menu-${resume.id}`}>
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => duplicateMutation.mutate(resume)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteMutation.mutate(resume.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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