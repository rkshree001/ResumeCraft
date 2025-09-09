import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/common/navbar";
import { BookOpen, Target, Users, Lightbulb, CheckCircle, AlertTriangle } from "lucide-react";

const tips = [
  {
    category: "Writing",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    tips: [
      {
        title: "Use Action Verbs",
        content: "Start bullet points with strong action verbs like 'Led', 'Developed', 'Implemented', or 'Achieved' to make your accomplishments stand out.",
        level: "Essential"
      },
      {
        title: "Quantify Your Achievements", 
        content: "Use numbers, percentages, and concrete results. Instead of 'Improved sales', write 'Increased sales by 25% over 6 months'.",
        level: "Essential"
      },
      {
        title: "Tailor for Each Job",
        content: "Customize your resume for each application by highlighting relevant skills and experiences that match the job description.",
        level: "Important"
      }
    ]
  },
  {
    category: "Format",
    icon: Target,
    color: "bg-green-100 text-green-700", 
    tips: [
      {
        title: "Keep It Concise",
        content: "Limit your resume to 1-2 pages. Recruiters spend only 6 seconds scanning each resume initially.",
        level: "Essential"
      },
      {
        title: "Use Consistent Formatting",
        content: "Maintain consistent fonts, spacing, and styling throughout. Use the same format for dates, locations, and job titles.",
        level: "Important"
      },
      {
        title: "Choose ATS-Friendly Design",
        content: "Use simple layouts and standard fonts. Avoid complex graphics, tables, or unusual formatting that ATS systems can't read.",
        level: "Essential"
      }
    ]
  },
  {
    category: "Content",
    icon: Users,
    color: "bg-purple-100 text-purple-700",
    tips: [
      {
        title: "Include Relevant Keywords",
        content: "Use industry-specific terms and keywords from the job posting to help your resume pass ATS filters.",
        level: "Essential"
      },
      {
        title: "Focus on Recent Experience",
        content: "Emphasize your last 10-15 years of experience. Older experience should be minimal unless highly relevant.",
        level: "Important"
      },
      {
        title: "Add a Professional Summary",
        content: "Include a 2-3 line summary at the top highlighting your key qualifications and career focus.",
        level: "Recommended"
      }
    ]
  }
];

const commonMistakes = [
  {
    mistake: "Using the same resume for every job",
    solution: "Tailor each resume to match the specific job requirements"
  },
  {
    mistake: "Including irrelevant personal information",
    solution: "Remove photos, age, marital status, and other personal details"
  },
  {
    mistake: "Listing job duties instead of achievements",
    solution: "Focus on what you accomplished, not just what you did"
  },
  {
    mistake: "Poor grammar and spelling errors",
    solution: "Proofread multiple times and consider using spell-check tools"
  },
  {
    mistake: "Using unprofessional email addresses",
    solution: "Create a professional email with your name (e.g., firstname.lastname@email.com)"
  }
];

export default function ResumeTips() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resume Writing Tips & Best Practices
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Expert advice to help you create a resume that stands out to recruiters and passes ATS systems.
          </p>
        </div>

        {/* Tips by Category */}
        <div className="space-y-12 mb-16">
          {tips.map((category) => (
            <div key={category.category}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">{category.category} Tips</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tips.map((tip, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        <Badge variant={tip.level === 'Essential' ? 'default' : tip.level === 'Important' ? 'secondary' : 'outline'}>
                          {tip.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistakes */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-red-100 text-red-700">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Common Resume Mistakes to Avoid</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {commonMistakes.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-red-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900 mb-2">❌ {item.mistake}</h4>
                    <p className="text-green-700">✅ {item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Checklist */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-700">
                <CheckCircle className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Pre-Submission Checklist</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Contact information is current and professional",
                "Resume is tailored to the specific job",
                "All accomplishments are quantified when possible", 
                "Grammar and spelling have been double-checked",
                "Format is clean and ATS-friendly",
                "File is saved as PDF with a descriptive name",
                "Resume length is appropriate (1-2 pages)",
                "Keywords from job posting are included"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}