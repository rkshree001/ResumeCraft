import { useState, useEffect } from "react";
import { FileText, Sparkles, Zap, Users, Download } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("Initializing ResumeBuilder Pro");

  const loadingTexts = [
    "Initializing ResumeBuilder Pro",
    "Loading templates...",
    "Setting up workspace...",
    "Almost ready!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update text based on progress
        if (newProgress >= 25 && newProgress < 50) {
          setCurrentText(loadingTexts[1]);
        } else if (newProgress >= 50 && newProgress < 80) {
          setCurrentText(loadingTexts[2]);
        } else if (newProgress >= 80) {
          setCurrentText(loadingTexts[3]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50 px-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center z-10 max-w-md mx-auto">
        {/* Logo Animation */}
        <div className="mb-6 sm:mb-8 relative">
          <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl">
            <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-white animate-bounce" />
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 animate-pulse" />
          </div>
          
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin" 
               style={{ animationDuration: '3s' }}>
            <div className="w-full h-full bg-transparent rounded-2xl border-2 border-white/10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 animate-fade-in">
          ResumeBuilder Pro
        </h1>
        <p className="text-blue-200 text-sm sm:text-lg mb-6 sm:mb-8 animate-fade-in-delay px-4">
          Professional Resumes Made Easy
        </p>

        {/* Feature highlights for mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
          <div className="text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-white/80">Fast</p>
          </div>
          <div className="text-center">
            <Users className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-white/80">Professional</p>
          </div>
          <div className="text-center">
            <Download className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-white/80">Export</p>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-full max-w-xs mx-auto bg-white/10 rounded-full h-2 mb-4 backdrop-blur-sm border border-white/20">
          <div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-white/80 text-xs sm:text-sm animate-pulse px-4">
          {currentText}
        </p>

        {/* Progress percentage */}
        <p className="text-blue-200 text-xs mt-2 font-mono">
          {progress}%
        </p>
      </div>

    </div>
  );
}