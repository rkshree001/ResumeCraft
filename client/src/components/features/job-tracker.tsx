import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Briefcase, Calendar, MapPin, DollarSign, Link, Edit, Trash2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  salary?: string;
  status: "applied" | "interview" | "offer" | "rejected";
  appliedDate: string;
  jobUrl?: string;
  notes?: string;
  resumeId?: string;
  createdAt: string;
}

const statusColors = {
  applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  interview: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  offer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function JobTracker() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  const { data: jobs = [], isLoading } = useQuery<JobApplication[]>({
    queryKey: ['/api/job-applications']
  });

  const { data: resumes = [] } = useQuery<any[]>({
    queryKey: ['/api/resumes']
  });

  const createJobMutation = useMutation({
    mutationFn: async (data: Omit<JobApplication, 'id' | 'createdAt'>) => {
      return apiRequest('POST', '/api/job-applications', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/job-applications'] });
      setIsDialogOpen(false);
      toast({
        title: "Job application added",
        description: "Your job application has been added to the tracker."
      });
    }
  });

  const updateJobMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<JobApplication> }) => {
      return apiRequest('PATCH', `/api/job-applications/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/job-applications'] });
      setEditingJob(null);
      toast({
        title: "Job application updated",
        description: "Your job application has been updated successfully."
      });
    }
  });

  const deleteJobMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/job-applications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/job-applications'] });
      toast({
        title: "Job application deleted",
        description: "The job application has been removed from your tracker."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const jobData = {
      company: formData.get('company') as string,
      position: formData.get('position') as string,
      location: formData.get('location') as string,
      salary: formData.get('salary') as string || undefined,
      status: formData.get('status') as JobApplication['status'],
      appliedDate: formData.get('appliedDate') as string,
      jobUrl: formData.get('jobUrl') as string || undefined,
      notes: formData.get('notes') as string || undefined,
      resumeId: formData.get('resumeId') as string || undefined,
    };

    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, data: jobData });
    } else {
      createJobMutation.mutate(jobData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job Applications Tracker</h2>
          <p className="text-gray-600 dark:text-gray-400">Keep track of your job applications and their status</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-job">
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingJob ? 'Edit Application' : 'Add Job Application'}</DialogTitle>
              <DialogDescription>
                Track your job application progress
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={editingJob?.company}
                  placeholder="Company name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  defaultValue={editingJob?.position}
                  placeholder="Job title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={editingJob?.location}
                  placeholder="City, State or Remote"
                />
              </div>
              
              <div>
                <Label htmlFor="salary">Salary Range (Optional)</Label>
                <Input
                  id="salary"
                  name="salary"
                  defaultValue={editingJob?.salary}
                  placeholder="$80,000 - $100,000"
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={editingJob?.status || "applied"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="appliedDate">Applied Date</Label>
                <Input
                  id="appliedDate"
                  name="appliedDate"
                  type="date"
                  defaultValue={editingJob?.appliedDate}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="jobUrl">Job URL (Optional)</Label>
                <Input
                  id="jobUrl"
                  name="jobUrl"
                  defaultValue={editingJob?.jobUrl}
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <Label htmlFor="resumeId">Resume Used (Optional)</Label>
                <Select name="resumeId" defaultValue={editingJob?.resumeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resume" />
                  </SelectTrigger>
                  <SelectContent>
                    {(resumes as any[]).map((resume: any) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  defaultValue={editingJob?.notes}
                  placeholder="Interview notes, contacts, etc."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  type="submit" 
                  disabled={createJobMutation.isPending || updateJobMutation.isPending}
                  className="flex-1"
                >
                  {editingJob ? 'Update' : 'Add'} Application
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingJob(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No job applications yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start tracking your job applications to stay organized
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Application
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover-lift transition-all">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.position}</CardTitle>
                    <CardDescription className="font-medium">{job.company}</CardDescription>
                  </div>
                  <Badge className={statusColors[job.status]}>
                    {job.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  Applied {new Date(job.appliedDate).toLocaleDateString()}
                </div>
                
                {job.salary && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                  </div>
                )}
                
                {job.jobUrl && (
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <Link className="w-4 h-4 mr-2" />
                    <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      View Job Posting
                    </a>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingJob(job);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteJobMutation.mutate(job.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}