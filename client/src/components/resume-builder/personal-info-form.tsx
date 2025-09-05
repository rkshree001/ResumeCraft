import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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

          <div className="flex justify-end pt-6">
            <Button type="submit" data-testid="button-next-experience">
              Next: Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
