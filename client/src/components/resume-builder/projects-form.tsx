import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().min(1, "Technologies are required"),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type ProjectData = z.infer<typeof projectSchema>;

interface ProjectsFormProps {
  data: ProjectData[];
  onChange: (data: ProjectData[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProjectsForm({ data, onChange, onNext, onPrev }: ProjectsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>(data);

  const form = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      technologies: "",
      link: "",
      github: "",
      startDate: "",
      endDate: "",
    },
  });

  const addProject = () => {
    setEditingIndex(projects.length);
    form.reset();
  };

  const editProject = (index: number) => {
    setEditingIndex(index);
    form.reset(projects[index]);
  };

  const saveProject = (formData: ProjectData) => {
    const newProjects = [...projects];
    if (editingIndex !== null) {
      newProjects[editingIndex] = formData;
    } else {
      newProjects.push(formData);
    }
    setProjects(newProjects);
    onChange(newProjects);
    setEditingIndex(null);
    form.reset();
  };

  const deleteProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
    onChange(newProjects);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-projects-title">
          Projects
        </h3>
        <p className="text-muted-foreground mb-6">
          Showcase your personal and professional projects that demonstrate your skills.
        </p>
      </div>

      {/* Existing Projects */}
      {projects.map((project, index) => (
        <Card key={index} className="relative">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg" data-testid={`text-project-${index}-name`}>
                  {project.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-2" data-testid={`text-project-${index}-technologies`}>
                  {project.technologies}
                </p>
                {(project.startDate || project.endDate) && (
                  <p className="text-sm text-muted-foreground" data-testid={`text-project-${index}-dates`}>
                    {project.startDate} {project.startDate && project.endDate && "—"} {project.endDate}
                  </p>
                )}
                <div className="flex space-x-4 mt-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                      data-testid={`link-project-${index}-demo`}
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                      data-testid={`link-project-${index}-github`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editProject(index)}
                  data-testid={`button-edit-project-${index}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteProject(index)}
                  className="text-destructive hover:text-destructive"
                  data-testid={`button-delete-project-${index}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm" data-testid={`text-project-${index}-description`}>
              {project.description}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* Add/Edit Form */}
      {editingIndex !== null && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingIndex < projects.length ? "Edit Project" : "Add Project"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(saveProject)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="E-Commerce Platform" {...field} data-testid="input-project-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A full-stack e-commerce platform with user authentication, payment processing, and inventory management..."
                          className="min-h-[100px]"
                          {...field}
                          data-testid="textarea-project-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies Used *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, PostgreSQL, Stripe API"
                          {...field}
                          data-testid="input-project-technologies"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live Demo URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://myproject.com"
                            {...field}
                            data-testid="input-project-link"
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
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/username/project"
                            {...field}
                            data-testid="input-project-github"
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
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} data-testid="input-project-start-date" />
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
                          <Input type="month" {...field} data-testid="input-project-end-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-project">
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-project">
                    Save Project
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Add Project Button */}
      {editingIndex === null && (
        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-8 text-muted-foreground hover:text-primary hover:border-primary"
          onClick={addProject}
          data-testid="button-add-project"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4"/>
          </svg>
          Add Project
        </Button>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} data-testid="button-prev-skills">
          Previous
        </Button>
        <Button onClick={onNext} data-testid="button-next-review">
          Next: Review
        </Button>
      </div>
    </div>
  );
}
