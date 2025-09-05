import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Target, Zap, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISuggestion {
  id: string;
  type: "bullet-point" | "summary" | "skill" | "achievement";
  title: string;
  content: string;
  context: string;
  isPremium?: boolean;
}

interface AISuggestionsProps {
  jobTitle?: string;
  industry?: string;
  experienceLevel?: "entry" | "mid" | "senior" | "executive";
}

// Mock AI suggestions - in a real app, these would come from an AI service
const generateAISuggestions = (jobTitle: string = "", industry: string = "", experienceLevel: string = ""): AISuggestion[] => {
  const suggestions: AISuggestion[] = [
    {
      id: "1",
      type: "bullet-point",
      title: "Achievement-Focused Bullet Point",
      content: "Increased team productivity by 35% through implementation of agile methodologies and automated testing processes",
      context: `For ${jobTitle || "Software Developer"} positions`,
      isPremium: false
    },
    {
      id: "2",
      type: "summary",
      title: "Professional Summary",
      content: `Results-driven ${jobTitle || "professional"} with proven track record in ${industry || "technology"}. Expertise in leading cross-functional teams and delivering high-impact solutions that drive business growth.`,
      context: "Tailored for your profile",
      isPremium: true
    },
    {
      id: "3",
      type: "skill",
      title: "Technical Skills Enhancement",
      content: "React.js, Node.js, TypeScript, AWS, Docker, Kubernetes, CI/CD",
      context: "High-demand skills in tech industry",
      isPremium: false
    },
    {
      id: "4",
      type: "achievement",
      title: "Quantified Achievement",
      content: "Led a team of 8 developers to deliver a mission-critical application 2 weeks ahead of schedule, resulting in $200K cost savings",
      context: "Leadership and impact focused",
      isPremium: true
    },
    {
      id: "5",
      type: "bullet-point",
      title: "Problem-Solving Example",
      content: "Reduced application load time by 60% through database optimization and caching strategies, improving user experience for 10,000+ daily active users",
      context: "Technical achievement with metrics",
      isPremium: false
    },
    {
      id: "6",
      type: "summary",
      title: "Industry-Specific Summary",
      content: `Dynamic ${experienceLevel || "mid-level"} professional specializing in ${industry || "software development"}. Strong background in stakeholder management, strategic planning, and innovative problem-solving.`,
      context: "Optimized for ATS systems",
      isPremium: true
    }
  ];

  return suggestions.filter(s => !s.isPremium || Math.random() > 0.5); // Show some premium suggestions randomly
};

export function AISuggestions({ jobTitle, industry, experienceLevel }: AISuggestionsProps) {
  const [suggestions] = useState(generateAISuggestions(jobTitle, industry, experienceLevel));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste this suggestion into your resume.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please manually select and copy the text.",
        variant: "destructive",
      });
    }
  };

  const generateMore = async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    toast({
      title: "New suggestions generated!",
      description: "Fresh AI-powered content suggestions are ready.",
    });
  };

  const getTypeIcon = (type: AISuggestion['type']) => {
    switch (type) {
      case 'bullet-point':
        return <Target className="w-4 h-4 text-blue-500" />;
      case 'summary':
        return <Brain className="w-4 h-4 text-purple-500" />;
      case 'skill':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'achievement':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: AISuggestion['type']) => {
    switch (type) {
      case 'bullet-point':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'summary':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'skill':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'achievement':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">AI-Powered Suggestions</h3>
        </div>
        <Button 
          onClick={generateMore} 
          disabled={isGenerating}
          size="sm"
          variant="outline"
          className="animate-glow"
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </div>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate More
            </>
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        AI-generated content suggestions tailored to your industry and experience level
      </p>

      <div className="grid gap-4">
        {suggestions.map((suggestion, index) => (
          <Card 
            key={suggestion.id}
            className={`hover-lift transition-all animate-slide-up ${
              suggestion.isPremium ? 'border-purple-200 dark:border-purple-800' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(suggestion.type)}
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {suggestion.title}
                    </CardTitle>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {suggestion.context}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {suggestion.isPremium && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      Premium
                    </Badge>
                  )}
                  <Badge className={`text-xs ${getTypeColor(suggestion.type)}`}>
                    {suggestion.type.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  {suggestion.content}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-generated content
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(suggestion.content, suggestion.id)}
                  className="flex items-center space-x-1"
                >
                  {copiedId === suggestion.id ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="text-center py-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <CardContent>
          <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Want More AI Suggestions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Upgrade to Premium for unlimited AI-powered content generation, ATS optimization, and industry-specific recommendations.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}