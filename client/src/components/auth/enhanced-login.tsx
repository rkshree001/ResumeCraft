import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight, Shield, Zap, Globe, Star } from "lucide-react";

interface EnhancedLoginProps {
  onLogin: () => void;
}

export function EnhancedLogin({ onLogin }: EnhancedLoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Redirect to the authentication endpoint
    window.location.href = "/api/login";
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Build your resume in minutes, not hours"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and protected"
    },
    {
      icon: Globe,
      title: "Export Anywhere",
      description: "PDF, Word, or share with a link"
    },
    {
      icon: Star,
      title: "Professional Templates",
      description: "ATS-friendly designs that get results"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sign in to continue building your professional resume
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              data-testid="button-login"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign In with Replit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Secure authentication powered by Replit
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-3">
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-xs text-gray-800 dark:text-gray-200 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New to ResumeBuilder Pro?{" "}
            <button 
              onClick={handleLogin}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Get started for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}