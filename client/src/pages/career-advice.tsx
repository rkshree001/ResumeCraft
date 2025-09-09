import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/common/navbar";
import { TrendingUp, Users, MapPin, DollarSign, Calendar, BookOpen } from "lucide-react";

const articles = [
  {
    category: "Job Search",
    title: "How to Land Your Dream Job in 2024",
    excerpt: "Strategic approaches to job hunting in today's competitive market, including networking tips and application strategies.",
    readTime: "8 min read",
    featured: true
  },
  {
    category: "Networking", 
    title: "Building Professional Relationships That Matter",
    excerpt: "Learn how to network effectively both online and offline to advance your career and discover new opportunities.",
    readTime: "6 min read",
    featured: true
  },
  {
    category: "Interview Prep",
    title: "Master the Virtual Interview",
    excerpt: "Tips and techniques for succeeding in video interviews, from technical setup to body language and communication.",
    readTime: "5 min read",
    featured: false
  },
  {
    category: "Career Growth",
    title: "Negotiating Your Salary Like a Pro", 
    excerpt: "Research-backed strategies for salary negotiation, including when and how to ask for raises and better benefits.",
    readTime: "10 min read",
    featured: false
  },
  {
    category: "Skills Development",
    title: "Future-Proof Your Career with These Skills",
    excerpt: "Essential skills that will remain valuable in the changing job market, from technical to soft skills.",
    readTime: "7 min read", 
    featured: false
  },
  {
    category: "Career Change",
    title: "Successfully Transitioning to a New Industry",
    excerpt: "Step-by-step guide to changing careers, including how to transfer skills and build credibility in a new field.",
    readTime: "12 min read",
    featured: false
  }
];

const quickTips = [
  {
    icon: TrendingUp,
    title: "Industry Trends",
    tip: "Stay updated with industry news and trends through professional publications and LinkedIn"
  },
  {
    icon: Users,
    title: "Professional Network", 
    tip: "Aim to make at least 2 new professional connections each month"
  },
  {
    icon: MapPin,
    title: "Personal Brand",
    tip: "Maintain consistent professional profiles across LinkedIn, Twitter, and industry platforms"
  },
  {
    icon: DollarSign,
    title: "Market Value",
    tip: "Research salary ranges for your role annually to ensure you're fairly compensated"
  },
  {
    icon: Calendar,
    title: "Goal Setting",
    tip: "Set quarterly career goals and review progress monthly to stay on track"
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    tip: "Dedicate at least 30 minutes per week to learning new skills relevant to your field"
  }
];

const careerStages = [
  {
    stage: "Early Career (0-5 years)",
    focus: "Building Foundation",
    priorities: [
      "Develop core skills and competencies",
      "Build professional network",
      "Seek mentorship opportunities", 
      "Focus on learning over earning",
      "Establish good work habits"
    ],
    color: "bg-blue-100 text-blue-700"
  },
  {
    stage: "Mid Career (5-15 years)",
    focus: "Growth & Specialization", 
    priorities: [
      "Develop leadership skills",
      "Specialize in chosen field",
      "Build industry reputation",
      "Consider advanced education",
      "Expand professional network"
    ],
    color: "bg-green-100 text-green-700"
  },
  {
    stage: "Senior Career (15+ years)",
    focus: "Leadership & Legacy",
    priorities: [
      "Mentor junior professionals",
      "Drive strategic initiatives",
      "Build industry influence",
      "Plan succession strategies",
      "Share expertise through speaking/writing"
    ],
    color: "bg-purple-100 text-purple-700"
  }
];

export default function CareerAdvice() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Career Advice & Guidance
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Expert insights and practical advice to help you navigate your career journey and achieve professional success.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {articles.filter(article => article.featured).map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <Button variant="outline" size="sm">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Quick Career Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTips.map((tip, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.tip}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Stages */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Career Development by Stage</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {careerStages.map((stage, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${stage.color}`}>
                    {stage.focus}
                  </div>
                  <CardTitle className="text-lg">{stage.stage}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stage.priorities.map((priority, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {priority}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* More Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">More Career Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.filter(article => !article.featured).map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-lg hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Career?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start building a professional resume that showcases your skills and experience.
            </p>
            <Button size="lg">
              Create My Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}