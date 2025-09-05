import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { generatePDF } from "@/lib/pdf-generator";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Resume } from "@/types/resume";

interface ResumeCardProps {
  resume: Resume;
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/resumes/${resume.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume Deleted",
        description: "Your resume has been successfully deleted.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Delete Failed",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/resumes/${resume.id}/download`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
    },
    onError: (error) => {
      console.error("Failed to record download:", error);
    },
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) {
      setIsDeleting(true);
      await deleteMutation.mutateAsync();
      setIsDeleting(false);
    }
  };

  const handleDownload = async () => {
    try {
      await generatePDF(resume);
      downloadMutation.mutate();
      toast({
        title: "Download Started",
        description: "Your resume is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? "Just now" : `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Card className="bg-muted/30 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-foreground truncate" data-testid={`text-resume-${resume.id}-title`}>
              {resume.title}
            </h5>
            <p className="text-sm text-muted-foreground" data-testid={`text-resume-${resume.id}-template`}>
              Template: {resume.templateId}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid={`button-resume-${resume.id}-menu`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6a2 2 0 110-4 2 2 0 010 4zM12 14a2 2 0 110-4 2 2 0 010 4zM12 22a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/builder/${resume.id}`} data-testid={`link-edit-resume-${resume.id}`}>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload} data-testid={`button-download-resume-${resume.id}`}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-destructive focus:text-destructive"
                disabled={isDeleting}
                data-testid={`button-delete-resume-${resume.id}`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="text-xs text-muted-foreground mb-3" data-testid={`text-resume-${resume.id}-updated`}>
          Last modified: {getRelativeTime(resume.updatedAt)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-3 text-xs text-muted-foreground">
            <span data-testid={`text-resume-${resume.id}-views`}>{resume.viewCount || 0} views</span>
            <span data-testid={`text-resume-${resume.id}-downloads`}>{resume.downloadCount || 0} downloads</span>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              size="sm"
              asChild
              data-testid={`button-preview-resume-${resume.id}`}
            >
              <Link href={`/builder/${resume.id}`}>Preview</Link>
            </Button>
            <Button 
              size="sm"
              onClick={handleDownload}
              data-testid={`button-quick-download-resume-${resume.id}`}
            >
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
