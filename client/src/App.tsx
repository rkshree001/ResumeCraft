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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/templates" component={Templates} />
      <Route path="/enhanced-templates" component={EnhancedTemplates} />
      <Route path="/my-resumes" component={MyResumes} />
      <Route path="/settings" component={Settings} />
      <Route path="/builder/:resumeId?" component={ResumeBuilder} />
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
