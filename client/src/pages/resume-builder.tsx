import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/navbar";
import StepIndicator from "@/components/resume-builder/step-indicator";
import PersonalInfoForm from "@/components/resume-builder/personal-info-form";
import ExperienceForm from "@/components/resume-builder/experience-form";
import EducationForm from "@/components/resume-builder/education-form";
import SkillsForm from "@/components/resume-builder/skills-form";
import ProjectsForm from "@/components/resume-builder/projects-form";
import ReviewForm from "@/components/resume-builder/review-form";
import LivePreview from "@/components/resume-builder/live-preview";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Resume, ResumeData } from "@/types/resume";
import { mockResumeData } from "@/data/mock-resume-data";

const STEPS = [
  { id: 1, name: "Personal", label: "Personal Info" },
  { id: 2, name: "Experience", label: "Work Experience" },
  { id: 3, name: "Education", label: "Education" },
  { id: 4, name: "Skills", label: "Skills" },
  { id: 5, name: "Projects", label: "Projects" },
  { id: 6, name: "Review", label: "Review & Export" },
];

export default function ResumeBuilder() {
  const { resumeId } = useParams<{ resumeId?: string }>();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {},
    summary: "",
    experiences: [],
    education: [],
    skills: [],
    projects: [],
    customSections: [],
    settings: {
      templateId: "",
      colorScheme: "blue",
      fontSize: "medium",
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load existing resume if editing
  const { data: existingResume, error } = useQuery<Resume | null>({
    queryKey: ["resumes", resumeId],
    queryFn: async () => {
      if (!resumeId) return null;
      const { mockStorage } = await import("@/data/mock-storage");
      return mockStorage.getResume(resumeId);
    },
    enabled: !!resumeId,
    retry: false,
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

  // Load existing resume data
  useEffect(() => {
    if (existingResume) {
      setResumeData({
        personalInfo: existingResume.personalInfo || {},
        summary: existingResume.summary || "",
        experiences: existingResume.experiences || [],
        education: existingResume.education || [],
        skills: existingResume.skills || [],
        projects: existingResume.projects || [],
        customSections: existingResume.customSections || [],
        settings: existingResume.settings || {
          templateId: existingResume.templateId,
          colorScheme: "blue",
          fontSize: "medium",
        },
      });
    }
  }, [existingResume]);

  // Auto-save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: ResumeData) => {
      const { mockStorage } = await import("@/data/mock-storage");
      if (resumeId) {
        return await mockStorage.updateResume(resumeId, data);
      } else {
        const newResume = await mockStorage.createResume({
          title: data.personalInfo.name || "Untitled Resume",
          templateId: data.settings.templateId || "modern-1",
          ...data,
        });
        setLocation(`/builder/${newResume.id}`);
        return newResume;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
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
        title: "Save Failed",
        description: "Failed to save your resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resumeData.personalInfo.name || resumeData.summary || resumeData.experiences.length > 0) {
        saveMutation.mutate(resumeData);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [resumeData]);

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => updateResumeData("personalInfo", data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ExperienceForm
            data={resumeData.experiences}
            onChange={(data) => updateResumeData("experiences", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => updateResumeData("education", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => updateResumeData("skills", data.map(skill => ({ ...skill, level: skill.level || 'Intermediate' })))}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => updateResumeData("projects", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <ReviewForm
            data={resumeData}
            onChange={setResumeData}
            onPrev={prevStep}
            resumeId={resumeId}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = (step: number): string => {
    const titles = [
      "Personal Information",
      "Work Experience", 
      "Education",
      "Skills",
      "Projects",
      "Review & Export"
    ];
    return titles[step - 1] || "Resume Builder";
  };

  const getStepDescription = (step: number): string => {
    const descriptions = [
      "Start with your basic contact information and professional summary.",
      "Add your work experience and professional achievements.",
      "Include your educational background and qualifications.",
      "Highlight your technical and professional skills.",
      "Showcase your projects and accomplishments.",
      "Review your resume and export when ready."
    ];
    return descriptions[step - 1] || "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Resume Builder
            </h1>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            >
              <span className="text-xs font-medium text-white">
                {Math.round((currentStep / STEPS.length) * 100)}%
              </span>
            </div>
          </div>
          
          {/* Step Indicator */}
          <StepIndicator 
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
          
          {saveMutation.isPending && (
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <svg className="animate-spin w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Auto-saving...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    {getStepTitle(currentStep)}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getStepDescription(currentStep)}
                  </p>
                </div>
                {renderCurrentStep()}
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="xl:sticky xl:top-4">
            <LivePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
