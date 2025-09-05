import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Proficiency level is required"),
});

type SkillData = z.infer<typeof skillSchema>;

interface SkillsFormProps {
  data: SkillData[];
  onChange: (data: SkillData[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SKILL_CATEGORIES = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Databases",
  "Tools & Technologies",
  "Cloud Platforms",
  "Soft Skills",
  "Languages",
  "Other",
];

const PROFICIENCY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export default function SkillsForm({ data, onChange, onNext, onPrev }: SkillsFormProps) {
  const [skills, setSkills] = useState<SkillData[]>(data);
  const [showAddForm, setShowAddForm] = useState(false);

  const form = useForm<SkillData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "",
      level: "",
    },
  });

  const addSkill = (formData: SkillData) => {
    const newSkills = [...skills, formData];
    setSkills(newSkills);
    onChange(newSkills);
    form.reset();
    setShowAddForm(false);
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    onChange(newSkills);
  };

  const groupedSkills = skills.reduce((acc, skill, index) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push({ ...skill, index });
    return acc;
  }, {} as Record<string, (SkillData & { index: number })[]>);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-skills-title">
          Skills
        </h3>
        <p className="text-muted-foreground mb-6">
          Add your technical and soft skills with proficiency levels.
        </p>
      </div>

      {/* Skills Display */}
      {Object.keys(groupedSkills).length > 0 && (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base" data-testid={`text-skill-category-${category.replace(/\s+/g, '-').toLowerCase()}`}>
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.index}
                      variant="secondary"
                      className="text-sm py-1 px-3 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => removeSkill(skill.index)}
                      data-testid={`badge-skill-${skill.index}`}
                    >
                      {skill.name} • {skill.level}
                      <svg className="w-3 h-3 ml-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Skill Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addSkill)} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="JavaScript" {...field} data-testid="input-skill-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-skill-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SKILL_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proficiency *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-skill-level">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PROFICIENCY_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      form.reset();
                    }}
                    data-testid="button-cancel-skill"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-skill">
                    Add Skill
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Add Skill Button */}
      {!showAddForm && (
        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-8 text-muted-foreground hover:text-primary hover:border-primary"
          onClick={() => setShowAddForm(true)}
          data-testid="button-add-skill"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4"/>
          </svg>
          Add Skill
        </Button>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} data-testid="button-prev-education">
          Previous
        </Button>
        <Button onClick={onNext} data-testid="button-next-projects">
          Next: Projects
        </Button>
      </div>
    </div>
  );
}
