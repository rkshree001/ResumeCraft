import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const experienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentJob: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
});

type ExperienceData = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  data: ExperienceData[];
  onChange: (data: ExperienceData[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ExperienceForm({ data, onChange, onNext, onPrev }: ExperienceFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [experiences, setExperiences] = useState<ExperienceData[]>(data);

  const form = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      description: "",
    },
  });

  const addExperience = () => {
    setEditingIndex(experiences.length);
    form.reset();
  };

  const editExperience = (index: number) => {
    setEditingIndex(index);
    form.reset(experiences[index]);
  };

  const saveExperience = (formData: ExperienceData) => {
    const newExperiences = [...experiences];
    if (editingIndex !== null) {
      newExperiences[editingIndex] = formData;
    } else {
      newExperiences.push(formData);
    }
    setExperiences(newExperiences);
    onChange(newExperiences);
    setEditingIndex(null);
    form.reset();
  };

  const deleteExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    onChange(newExperiences);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-experience-title">
          Work Experience
        </h3>
        <p className="text-muted-foreground mb-6">
          Add your work experience starting with your most recent position.
        </p>
      </div>

      {/* Existing Experiences */}
      {experiences.map((experience, index) => (
        <Card key={index} className="relative">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg" data-testid={`text-experience-${index}-title`}>
                  {experience.jobTitle}
                </CardTitle>
                <p className="text-muted-foreground" data-testid={`text-experience-${index}-company`}>
                  {experience.company} • {experience.location}
                </p>
                <p className="text-sm text-muted-foreground" data-testid={`text-experience-${index}-dates`}>
                  {experience.startDate} - {experience.isCurrentJob ? "Present" : experience.endDate}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editExperience(index)}
                  data-testid={`button-edit-experience-${index}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteExperience(index)}
                  className="text-destructive hover:text-destructive"
                  data-testid={`button-delete-experience-${index}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm" data-testid={`text-experience-${index}-description`}>
              {experience.description}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add/Edit Form */}
      {editingIndex !== null && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingIndex < experiences.length ? "Edit Experience" : "Add Experience"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(saveExperience)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Senior Software Engineer" {...field} data-testid="input-job-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company *</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Corp" {...field} data-testid="input-company" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" {...field} data-testid="input-experience-location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} data-testid="input-start-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            {...field} 
                            disabled={form.watch("isCurrentJob")}
                            data-testid="input-end-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isCurrentJob"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-current-job"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Description *</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                          data-testid="button-ai-suggest-experience"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          AI Suggest
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="• Led development of scalable web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver features on time&#10;• Mentored junior developers and conducted code reviews"
                          className="min-h-[120px]"
                          {...field}
                          data-testid="textarea-experience-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-experience">
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-experience">
                    Save Experience
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Add Experience Button */}
      {editingIndex === null && (
        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-8 text-muted-foreground hover:text-primary hover:border-primary"
          onClick={addExperience}
          data-testid="button-add-experience"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4"/>
          </svg>
          Add Experience
        </Button>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} data-testid="button-prev-personal">
          Previous
        </Button>
        <Button onClick={onNext} data-testid="button-next-education">
          Next: Education
        </Button>
      </div>
    </div>
  );
}
