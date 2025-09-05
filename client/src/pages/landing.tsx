import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/navbar";
import TemplateCard from "@/components/templates/template-card";
import { useQuery } from "@tanstack/react-query";
import type { Template } from "@/types/resume";

export default function Landing() {
  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
    retry: false,
  });

  const featuredTemplates = templates.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-card to-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 px-4">
              Build Your Perfect Resume
              <span className="text-primary block">in Minutes</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
              Choose from professional templates, customize with ease, and create an ATS-optimized resume that gets you noticed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-6 py-4 sm:px-8"
                asChild
                data-testid="button-start-building"
              >
                <Link href="/builder">Start Building Free</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-6 py-4 sm:px-8"
                asChild
                data-testid="button-view-templates"
              >
                <Link href="/templates">View Templates</Link>
              </Button>
            </div>
          </div>
          
          {/* Template Preview Carousel */}
          <div className="mt-16">
            <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
              {featuredTemplates.map((template: Template) => (
                <div key={template.id} className="min-w-[280px]">
                  <TemplateCard template={template} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional tools and features to help you land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Professional Templates</h3>
              <p className="text-muted-foreground">Choose from 30+ ATS-optimized templates designed by professionals.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Suggestions</h3>
              <p className="text-muted-foreground">Get intelligent content suggestions and grammar improvements.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Your data is encrypted and secure. Download or share with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-foreground">ResumeBuilder Pro</span>
              </div>
              <p className="text-muted-foreground">Build professional resumes that get you hired.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Resume Builder</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Cover Letters</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Resume Tips</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Career Advice</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Interview Prep</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ResumeBuilder Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
