import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/navbar";
import { Target, Users, Award, Zap, Heart, Globe } from "lucide-react";

const stats = [
  { number: "500K+", label: "Resumes Created", icon: Target },
  { number: "50+", label: "Professional Templates", icon: Award },
  { number: "95%", label: "Success Rate", icon: Zap },
  { number: "24/7", label: "Customer Support", icon: Heart }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former HR executive with 15+ years of experience in talent acquisition. Passionate about helping people land their dream jobs."
  },
  {
    name: "Michael Chen", 
    role: "Head of Product",
    bio: "Product designer and developer with expertise in creating user-friendly career tools that make a real difference."
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Content",
    bio: "Career counselor and resume expert who has helped thousands of professionals advance their careers."
  },
  {
    name: "David Kim",
    role: "Lead Developer", 
    bio: "Full-stack developer focused on building reliable, accessible tools that empower job seekers worldwide."
  }
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded with a mission to democratize professional resume creation for everyone."
  },
  {
    year: "2021", 
    title: "First 100K Users",
    description: "Reached our first major milestone with users from over 50 countries."
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Launched AI-powered content suggestions and ATS optimization features."
  },
  {
    year: "2023",
    title: "Cover Letters & More",
    description: "Expanded beyond resumes with cover letter builder and interview prep tools."
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Serving over 500,000 users worldwide with advanced career tools."
  }
];

const values = [
  {
    icon: Users,
    title: "User-Centric",
    description: "Every feature we build is designed with our users' success in mind."
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Professional career tools should be available to everyone, regardless of background."
  },
  {
    icon: Target,
    title: "Quality",
    description: "We maintain the highest standards in design, functionality, and user experience."
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "Continuously improving and adapting to the changing job market."
  }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Empowering Careers, One Resume at a Time
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We believe everyone deserves access to professional-quality resume tools. Our mission is to help job seekers create compelling resumes that open doors to new opportunities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a simple idea to a platform that has helped hundreds of thousands of professionals land their dream jobs.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate professionals behind ResumeBuilder Pro, dedicated to your career success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              To democratize access to professional resume creation tools and empower every job seeker with the resources they need to succeed in their career journey. We believe that everyone, regardless of their background or experience, deserves the opportunity to present their best professional self.
            </p>
            <Button size="lg" className="mr-4">
              Start Building Your Resume
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}