import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/common/navbar";
import { MessageSquare, Users, Video, Brain, Clock, CheckCircle } from "lucide-react";

const interviewTypes = [
  {
    type: "Phone/Video Interviews",
    icon: Video,
    description: "Master remote interviewing skills",
    tips: [
      "Test your technology beforehand",
      "Choose a quiet, well-lit location", 
      "Maintain eye contact with the camera",
      "Have your resume and notes ready",
      "Prepare backup communication methods"
    ]
  },
  {
    type: "Behavioral Interviews", 
    icon: MessageSquare,
    description: "Use STAR method for storytelling",
    tips: [
      "Prepare 5-7 STAR format stories",
      "Cover different competencies",
      "Practice concise, impactful delivery",
      "Include quantified results",
      "Show learning and growth mindset"
    ]
  },
  {
    type: "Technical Interviews",
    icon: Brain,
    description: "Demonstrate your technical skills",
    tips: [
      "Review fundamental concepts",
      "Practice coding problems",
      "Explain your thought process aloud",
      "Ask clarifying questions",
      "Test your solutions thoroughly"
    ]
  },
  {
    type: "Panel Interviews",
    icon: Users,
    description: "Handle multiple interviewers",
    tips: [
      "Address all panel members",
      "Remember each person's name",
      "Distribute eye contact evenly",
      "Ask questions to different members",
      "Send individual thank you notes"
    ]
  }
];

const commonQuestions = [
  {
    category: "General",
    questions: [
      "Tell me about yourself",
      "Why do you want this job?",
      "What are your greatest strengths?",
      "What is your biggest weakness?",
      "Where do you see yourself in 5 years?"
    ]
  },
  {
    category: "Experience",
    questions: [
      "Describe a challenging project you worked on",
      "Tell me about a time you failed",
      "How do you handle stress and pressure?",
      "Describe a time you had to work with a difficult colleague",
      "What's your greatest professional achievement?"
    ]
  },
  {
    category: "Company-Specific",
    questions: [
      "Why do you want to work here?",
      "What do you know about our company?",
      "How would you contribute to our team?",
      "What interests you about this industry?",
      "How do you stay current with industry trends?"
    ]
  }
];

const timeline = [
  {
    timeframe: "1-2 Weeks Before",
    tasks: [
      "Research the company thoroughly",
      "Review the job description",
      "Prepare STAR format stories",
      "Practice common interview questions",
      "Plan your outfit and route"
    ]
  },
  {
    timeframe: "1-3 Days Before", 
    tasks: [
      "Do final company research",
      "Prepare thoughtful questions",
      "Review your resume",
      "Get a good night's sleep",
      "Confirm interview details"
    ]
  },
  {
    timeframe: "Day of Interview",
    tasks: [
      "Eat a good breakfast",
      "Arrive 10-15 minutes early", 
      "Review your notes one last time",
      "Stay calm and confident",
      "Bring multiple copies of your resume"
    ]
  },
  {
    timeframe: "After Interview",
    tasks: [
      "Send thank you email within 24 hours",
      "Reflect on what went well",
      "Note areas for improvement",
      "Follow up if promised",
      "Continue your job search"
    ]
  }
];

export default function InterviewPrep() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Interview Preparation Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive resources to help you prepare for any type of job interview and land your dream job.
          </p>
        </div>

        {/* Interview Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Master Different Interview Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interviewTypes.map((type, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{type.type}</CardTitle>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Questions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Common Interview Questions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {commonQuestions.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{category.category}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.questions.map((question, idx) => (
                      <li key={idx} className="text-sm p-3 bg-muted/50 rounded-lg">
                        "{question}"
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preparation Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Interview Preparation Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{phase.timeframe}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* STAR Method */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">The STAR Method</CardTitle>
                <p className="text-muted-foreground">Structure your behavioral interview answers</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">S</span>
                </div>
                <h3 className="font-semibold mb-2">Situation</h3>
                <p className="text-sm text-muted-foreground">Set the context and background</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold text-lg">T</span>
                </div>
                <h3 className="font-semibold mb-2">Task</h3>
                <p className="text-sm text-muted-foreground">Explain what needed to be done</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold text-lg">A</span>
                </div>
                <h3 className="font-semibold mb-2">Action</h3>
                <p className="text-sm text-muted-foreground">Describe what you specifically did</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold text-lg">R</span>
                </div>
                <h3 className="font-semibold mb-2">Result</h3>
                <p className="text-sm text-muted-foreground">Share the outcome and impact</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Tips */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ready to Ace Your Interview?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Remember: preparation builds confidence, and confidence leads to success.
            </p>
            <Button size="lg">
              Start Interview Practice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}