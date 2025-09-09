import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";
import Navbar from "@/components/common/navbar";
import { Link } from "wouter";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "1 Resume",
      "3 Templates",
      "Basic Formatting",
      "PDF Download",
      "Community Support"
    ],
    limitations: [
      "Watermarked downloads",
      "Limited customization"
    ],
    cta: "Get Started Free",
    href: "/builder",
    popular: false
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Most popular choice for job seekers",
    features: [
      "Unlimited Resumes",
      "50+ Templates",
      "Advanced Formatting",
      "Cover Letter Builder", 
      "ATS Optimization",
      "Multiple File Formats",
      "Premium Support",
      "No Watermarks"
    ],
    limitations: [],
    cta: "Start Pro Trial",
    href: "/builder",
    popular: true
  },
  {
    name: "Premium",
    price: "$19.99", 
    period: "per month",
    description: "For professionals who want everything",
    features: [
      "Everything in Pro",
      "100+ Premium Templates",
      "AI Content Suggestions",
      "LinkedIn Profile Sync",
      "Portfolio Integration",
      "Job Tracker",
      "Interview Prep Tools",
      "Priority Support",
      "Custom Branding"
    ],
    limitations: [],
    cta: "Go Premium",
    href: "/builder",
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to build professional resumes that get you hired.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex items-center text-muted-foreground">
                      <span className="w-5 h-5 mr-3 flex-shrink-0">×</span>
                      <span className="text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, all paid plans come with a 7-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and other secure payment methods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
          <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ready to build your perfect resume?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of professionals who have landed their dream jobs with our resume builder.
          </p>
          <Button asChild size="lg">
            <Link href="/builder">Start Building Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}