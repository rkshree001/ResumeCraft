import { useState, useEffect } from "react";
import { FileText, Sparkles } from "lucide-react";

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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
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

      <div className="text-center z-10">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl">
            <FileText className="w-12 h-12 text-white animate-bounce" />
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
          
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin" 
               style={{ animationDuration: '3s' }}>
            <div className="w-full h-full bg-transparent rounded-2xl border-2 border-white/10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          ResumeBuilder Pro
        </h1>
        <p className="text-blue-200 text-lg mb-8 animate-fade-in-delay">
          Professional Resumes Made Easy
        </p>

        {/* Loading bar */}
        <div className="w-80 bg-white/10 rounded-full h-2 mb-4 backdrop-blur-sm border border-white/20">
          <div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-white/80 text-sm animate-pulse">
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