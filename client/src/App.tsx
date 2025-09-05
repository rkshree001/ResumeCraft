import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { SplashScreen } from "@/components/common/splash-screen";
import { EnhancedLogin } from "@/components/auth/enhanced-login";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import ResumeBuilder from "@/pages/resume-builder";
import Templates from "@/pages/templates";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/">
            {() => <EnhancedLogin onLogin={() => {}} />}
          </Route>
          <Route path="/templates" component={Templates} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/templates" component={Templates} />
          <Route path="/builder/:resumeId?" component={ResumeBuilder} />
        </>
      )}
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
