import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface UploadedResumeData {
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  achievements: string[];
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
}

export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    onSuccess: (data: { resumeId: string; extractedData: UploadedResumeData }) => {
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume data has been extracted and saved.",
      });
      
      // Navigate to resume builder with uploaded data
      setLocation(`/builder/${data.resumeId}`);
      
      // Invalidate resumes cache
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong during upload.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    uploadMutation.mutate(formData);
  };

  const isUploading = uploadMutation.isPending;

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Existing Resume
          </CardTitle>
          <CardDescription>
            Upload your existing resume in PDF or Word format. We'll extract all your information automatically and help you create a better version.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resume-file">Choose your resume file</Label>
            <Input
              id="resume-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={isUploading}
              data-testid="input-resume-file"
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, DOC, DOCX (max 10MB)
            </p>
          </div>

          {file && (
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {!isUploading && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <Button 
              onClick={handleUpload} 
              disabled={!file || isUploading}
              className="w-full"
              data-testid="button-upload-resume"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting Data...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload & Extract Data
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>We'll automatically extract:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {[
                  'Personal Information',
                  'Work Experience', 
                  'Education',
                  'Skills',
                  'Projects',
                  'Certifications'
                ].map((item) => (
                  <span key={item} className="bg-muted px-2 py-1 rounded text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}