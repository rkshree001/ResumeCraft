import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SplashScreen } from "@/components/common/splash-screen";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import ResumeBuilder from "@/pages/resume-builder";
import Templates from "@/pages/templates";
import EnhancedTemplates from "@/pages/enhanced-templates";
import Settings from "@/pages/settings";
import MyResumes from "@/pages/my-resumes";
import { ResumeUpload } from "@/components/ResumeUpload";
import NotFound from "@/pages/not-found";
import CoverLetters from "@/pages/cover-letters";
import Pricing from "@/pages/pricing";
import ResumeTips from "@/pages/resume-tips";
import CareerAdvice from "@/pages/career-advice";
import InterviewPrep from "@/pages/interview-prep";
import HelpCenter from "@/pages/help-center";
import AboutUs from "@/pages/about-us";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/templates" component={Templates} />
      <Route path="/enhanced-templates" component={EnhancedTemplates} />
      <Route path="/my-resumes" component={MyResumes} />
      <Route path="/upload" component={ResumeUpload} />
      <Route path="/settings" component={Settings} />
      <Route path="/builder/:resumeId?" component={ResumeBuilder} />
      <Route path="/cover-letters" component={CoverLetters} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/resume-tips" component={ResumeTips} />
      <Route path="/career-advice" component={CareerAdvice} />
      <Route path="/interview-prep" component={InterviewPrep} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
