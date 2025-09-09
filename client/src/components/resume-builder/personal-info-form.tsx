import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sparkles, Upload, FileText, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { mockResumeData } from "@/data/mock-resume-data";

const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  summary: z.string().optional(),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  data: Partial<PersonalInfoData>;
  onChange: (data: PersonalInfoData) => void;
  onNext: () => void;
}

export default function PersonalInfoForm({ data, onChange, onNext }: PersonalInfoFormProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      location: data.location || "",
      website: data.website || "",
      linkedin: data.linkedin || "",
      github: data.github || "",
      summary: data.summary || "",
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      return response.json();
    },
    onSuccess: (response) => {
      const extractedData = response.extractedData;
      
      // Pre-fill the form with extracted data
      if (extractedData.personalInfo) {
        const personalInfo = extractedData.personalInfo;
        form.setValue('name', personalInfo.name || '');
        form.setValue('email', personalInfo.email || '');
        form.setValue('phone', personalInfo.phone || '');
        form.setValue('location', personalInfo.address || '');
        form.setValue('linkedin', personalInfo.linkedin || '');
        form.setValue('website', personalInfo.website || '');
      }
      
      if (extractedData.summary) {
        form.setValue('summary', extractedData.summary);
      }
      
      // Update parent component with the extracted data
      const formValues = form.getValues();
      onChange(formValues);
      
      setSelectedFile(null);
      setIsUploadOpen(false);
      
      toast({
        title: "Resume uploaded successfully!",
        description: "Your information has been extracted and pre-filled in the form.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to process your resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('resume', selectedFile);
    uploadMutation.mutate(formData);
  };

  const onSubmit = (formData: PersonalInfoData) => {
    onChange(formData);
    onNext();
  };

  const handleFormChange = () => {
    const values = form.getValues();
    if (form.formState.isValid) {
      onChange(values);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-personal-info-title">
          Personal Information
        </h3>
        <p className="text-muted-foreground mb-6">
          Start with your basic contact information and professional summary.
        </p>
      </div>

      {/* Resume Upload Section */}
      <Collapsible open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <CollapsibleTrigger asChild>
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Import Existing Resume</CardTitle>
                    <CardDescription>
                      Upload your current resume to auto-fill this form
                    </CardDescription>
                  </div>
                </div>
                {isUploadOpen ? 
                  <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                }
              </div>
            </CardHeader>
          </Card>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="border-t-0 rounded-t-none">
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-3">
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                    disabled={uploadMutation.isPending}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Choose Resume File
                  </Button>
                </div>
                
                {selectedFile && (
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleUpload}
                      disabled={!selectedFile || uploadMutation.isPending}
                      className="w-full"
                    >
                      {uploadMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing Resume...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Extract Information
                        </>
                      )}
                    </Button>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  <p>• Supported formats: PDF, DOC, DOCX (max 10MB)</p>
                  <p>• We'll automatically extract your information to pre-fill the form</p>
                  <p>• You can edit the extracted information before proceeding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange();
                      }}
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@email.com"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange();
                      }}
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(555) 123-4567"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange();
                      }}
                      data-testid="input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New York, NY"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange();
                      }}
                      data-testid="input-location"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://yourwebsite.com"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange();
                      }}
                      data-testid="input-website"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange();
                      }}
                      data-testid="input-linkedin"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFormChange();
                      }}
                      data-testid="input-github"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Professional Summary</FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                    onClick={() => {
                      const suggestions = [
                        "Experienced professional with a proven track record of delivering high-quality results in fast-paced environments. Strong analytical and problem-solving skills with excellent communication abilities.",
                        "Results-driven professional with expertise in project management and team leadership. Passionate about innovation and continuous improvement with a focus on achieving organizational goals.",
                        "Detail-oriented professional with strong technical skills and a collaborative approach to problem-solving. Committed to excellence and delivering value through strategic thinking and execution.",
                        "Dynamic professional with extensive experience in cross-functional collaboration and process optimization. Known for adaptability, creative thinking, and driving positive outcomes."
                      ];
                      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
                      form.setValue('summary', randomSuggestion);
                      handleFormChange();
                    }}
                    data-testid="button-ai-suggest"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    AI Suggest
                  </Button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Brief summary of your professional background and career objectives..."
                    className="min-h-[100px]"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFormChange();
                    }}
                    data-testid="textarea-summary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const mockData = mockResumeData.personalInfo;
                form.setValue("name", mockData.name || "");
                form.setValue("email", mockData.email || "");
                form.setValue("phone", mockData.phone || "");
                form.setValue("location", mockData.location || "");
                form.setValue("website", mockData.website || "");
                form.setValue("linkedin", mockData.linkedin || "");
                form.setValue("github", mockData.github || "");
                form.setValue("summary", mockResumeData.summary || "");
                handleFormChange();
              }}
              className="flex items-center gap-2"
              data-testid="button-use-demo-data"
            >
              <Sparkles className="w-4 h-4" />
              Use Demo Data
            </Button>
            <Button type="submit" data-testid="button-next-experience">
              Next: Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
