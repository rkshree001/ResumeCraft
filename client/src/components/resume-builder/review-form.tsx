import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { generatePDF } from "@/lib/pdf-generator";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { ResumeData } from "@/types/resume";

interface ReviewFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onPrev: () => void;
  resumeId?: string;
}

const COLOR_SCHEMES = [
  { value: "blue", label: "Professional Blue", color: "hsl(214, 84%, 56%)" },
  { value: "green", label: "Nature Green", color: "hsl(142, 71%, 45%)" },
  { value: "purple", label: "Creative Purple", color: "hsl(262, 83%, 58%)" },
  { value: "orange", label: "Energetic Orange", color: "hsl(24, 95%, 53%)" },
  { value: "gray", label: "Minimal Gray", color: "hsl(220, 9%, 46%)" },
];

const FONT_SIZES = [
  { value: "small", label: "Small (9pt)" },
  { value: "medium", label: "Medium (10pt)" },
  { value: "large", label: "Large (11pt)" },
];

export default function ReviewForm({ data, onChange, onPrev, resumeId }: ReviewFormProps) {
  const [resumeTitle, setResumeTitle] = useState(data.personalInfo.name || "My Resume");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveFinalMutation = useMutation({
    mutationFn: async () => {
      const saveData = {
        ...data,
        title: resumeTitle,
        templateId: data.templateId || "18e42ec4-85fe-4cbc-8575-877c73824c14", // Default to Modern Professional
      };

      if (resumeId) {
        return await apiRequest("PATCH", `/api/resumes/${resumeId}`, saveData);
      } else {
        return await apiRequest("POST", "/api/resumes", saveData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully.",
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
          window.location.href = "/";
        }, 500);
        return;
      }
      toast({
        title: "Save Failed",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateSettings = (key: string, value: string) => {
    onChange({
      ...data,
      settings: {
        ...data.settings,
        [key]: value,
      },
    });
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await generatePDF({ ...data, title: resumeTitle } as any);
      
      // Record download if resume exists
      if (resumeId) {
        await apiRequest("POST", `/api/resumes/${resumeId}/download`);
        queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      }
      
      toast({
        title: "Export Successful",
        description: "Your resume has been exported as PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveAndFinish = async () => {
    await saveFinalMutation.mutateAsync();
    window.location.href = "/";
  };

  const getCompletionStats = () => {
    let completed = 0;
    let total = 6;

    if (data.personalInfo.name && data.personalInfo.email) completed++;
    if (data.experiences.length > 0) completed++;
    if (data.education.length > 0) completed++;
    if (data.skills.length > 0) completed++;
    if (data.projects.length > 0) completed++;
    if (data.summary) completed++;

    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const stats = getCompletionStats();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-review-title">
          Review & Export
        </h3>
        <p className="text-muted-foreground mb-6">
          Review your resume, customize the appearance, and export when ready.
        </p>
      </div>

      {/* Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span data-testid="text-completion-percentage">{stats.percentage}% Complete</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary" data-testid="text-completion-ratio">
              {stats.completed}/{stats.total}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="resume-title">Resume Title</Label>
            <Input
              id="resume-title"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              placeholder="My Professional Resume"
              data-testid="input-resume-title"
            />
          </div>

          <div>
            <Label htmlFor="color-scheme">Color Scheme</Label>
            <Select
              value={data.settings.colorScheme}
              onValueChange={(value) => updateSettings("colorScheme", value)}
            >
              <SelectTrigger data-testid="select-color-scheme">
                <SelectValue placeholder="Select color scheme" />
              </SelectTrigger>
              <SelectContent>
                {COLOR_SCHEMES.map((scheme) => (
                  <SelectItem key={scheme.value} value={scheme.value}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: scheme.color }}
                      ></div>
                      <span>{scheme.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="font-size">Font Size</Label>
            <Select
              value={data.settings.fontSize}
              onValueChange={(value) => updateSettings("fontSize", value)}
            >
              <SelectTrigger data-testid="select-font-size">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                {FONT_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex-1"
                data-testid="button-export-pdf"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    Export as PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} data-testid="button-prev-projects">
          Previous
        </Button>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => saveFinalMutation.mutate()}
            disabled={saveFinalMutation.isPending}
            data-testid="button-save-resume"
          >
            {saveFinalMutation.isPending ? "Saving..." : "Save Resume"}
          </Button>
          <Button
            onClick={handleSaveAndFinish}
            disabled={saveFinalMutation.isPending}
            data-testid="button-save-and-finish"
          >
            Save & Finish
          </Button>
        </div>
      </div>
    </div>
  );
}
