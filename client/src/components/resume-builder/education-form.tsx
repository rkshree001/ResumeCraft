import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  location: z.string().min(1, "Location is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  gpa: z.string().optional(),
  relevantCoursework: z.string().optional(),
});

type EducationData = z.infer<typeof educationSchema>;

interface EducationFormProps {
  data: EducationData[];
  onChange: (data: EducationData[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function EducationForm({ data, onChange, onNext, onPrev }: EducationFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [education, setEducation] = useState<EducationData[]>(data);

  const form = useForm<EducationData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      institution: "",
      location: "",
      graduationYear: "",
      gpa: "",
      relevantCoursework: "",
    },
  });

  const addEducation = () => {
    setEditingIndex(education.length);
    form.reset();
  };

  const editEducation = (index: number) => {
    setEditingIndex(index);
    form.reset(education[index]);
  };

  const saveEducation = (formData: EducationData) => {
    const newEducation = [...education];
    if (editingIndex !== null) {
      newEducation[editingIndex] = formData;
    } else {
      newEducation.push(formData);
    }
    setEducation(newEducation);
    onChange(newEducation);
    setEditingIndex(null);
    form.reset();
  };

  const deleteEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
    onChange(newEducation);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-education-title">
          Education
        </h3>
        <p className="text-muted-foreground mb-6">
          Add your educational background, starting with the most recent.
        </p>
      </div>

      {/* Existing Education */}
      {education.map((edu, index) => (
        <Card key={index} className="relative">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg" data-testid={`text-education-${index}-degree`}>
                  {edu.degree}
                </CardTitle>
                <p className="text-muted-foreground" data-testid={`text-education-${index}-institution`}>
                  {edu.institution} • {edu.location}
                </p>
                <p className="text-sm text-muted-foreground" data-testid={`text-education-${index}-year`}>
                  {edu.graduationYear}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editEducation(index)}
                  data-testid={`button-edit-education-${index}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteEducation(index)}
                  className="text-destructive hover:text-destructive"
                  data-testid={`button-delete-education-${index}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          {edu.relevantCoursework && (
            <CardContent>
              <div className="text-sm">
                <strong>Relevant Coursework:</strong> {edu.relevantCoursework}
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      {/* Add/Edit Form */}
      {editingIndex !== null && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingIndex < education.length ? "Edit Education" : "Add Education"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(saveEducation)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree *</FormLabel>
                      <FormControl>
                        <Input placeholder="Bachelor of Science in Computer Science" {...field} data-testid="input-degree" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution *</FormLabel>
                        <FormControl>
                          <Input placeholder="University Name" {...field} data-testid="input-institution" />
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
                          <Input placeholder="Boston, MA" {...field} data-testid="input-education-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year *</FormLabel>
                        <FormControl>
                          <Input placeholder="2024" {...field} data-testid="input-graduation-year" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPA (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="3.8" {...field} data-testid="input-gpa" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="relevantCoursework"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relevant Coursework (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Data Structures, Algorithms, Software Engineering, Database Systems"
                          {...field} 
                          data-testid="input-coursework"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-education">
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-education">
                    Save Education
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Add Education Button */}
      {editingIndex === null && (
        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-8 text-muted-foreground hover:text-primary hover:border-primary"
          onClick={addEducation}
          data-testid="button-add-education"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4"/>
          </svg>
          Add Education
        </Button>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} data-testid="button-prev-experience">
          Previous
        </Button>
        <Button onClick={onNext} data-testid="button-next-skills">
          Next: Skills
        </Button>
      </div>
    </div>
  );
}
