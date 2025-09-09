import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/common/navbar";
import { Search, HelpCircle, Book, MessageCircle, Mail, Phone } from "lucide-react";

const faqCategories = [
  {
    category: "Getting Started",
    icon: Book,
    faqs: [
      {
        question: "How do I create my first resume?",
        answer: "Click 'Get Started' or 'Resume Builder' to begin. Choose a template, fill in your information step by step, and our system will guide you through the process."
      },
      {
        question: "Are there any free templates available?",
        answer: "Yes! We offer several free templates to get you started. Premium templates are available with a Pro subscription."
      },
      {
        question: "Can I save my progress and continue later?",
        answer: "Absolutely! Your resume is automatically saved as you work. You can return anytime to continue editing."
      }
    ]
  },
  {
    category: "Templates & Design",
    icon: HelpCircle,
    faqs: [
      {
        question: "How do I change my resume template?",
        answer: "In the resume builder, go to the 'Styling & Design' step where you can select a different template and preview how your content looks."
      },
      {
        question: "Can I customize colors and fonts?",
        answer: "Yes! Use the styling options to change colors, fonts, spacing, and other design elements to match your personal brand."
      },
      {
        question: "Are the templates ATS-friendly?",
        answer: "All our templates are designed to be ATS (Applicant Tracking System) friendly while maintaining professional appearance."
      }
    ]
  },
  {
    category: "Account & Billing",
    icon: MessageCircle,
    faqs: [
      {
        question: "How do I upgrade to Pro?",
        answer: "Visit our Pricing page and select the Pro plan. You'll get access to premium templates, unlimited resumes, and advanced features."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. Your access continues until the end of your billing period."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance with refunds."
      }
    ]
  },
  {
    category: "Export & Download",
    icon: Book,
    faqs: [
      {
        question: "What file formats can I download my resume in?",
        answer: "You can download your resume as PDF (recommended), Word document, or plain text format."
      },
      {
        question: "Why is my resume download watermarked?",
        answer: "Free accounts include a small watermark. Upgrade to Pro to remove watermarks and unlock all features."
      },
      {
        question: "How do I share my resume online?",
        answer: "You can create a shareable link to your resume or download it to attach to job applications."
      }
    ]
  }
];

const contactOptions = [
  {
    method: "Live Chat",
    icon: MessageCircle,
    description: "Get instant help with our live chat support",
    availability: "24/7",
    action: "Start Chat"
  },
  {
    method: "Email Support",
    icon: Mail,
    description: "Send us an email and we'll respond within 24 hours",
    availability: "support@resumebuilder.com",
    action: "Send Email"
  },
  {
    method: "Phone Support",
    icon: Phone,
    description: "Call us for urgent issues (Pro subscribers only)",
    availability: "Mon-Fri 9AM-6PM EST",
    action: "Call Now"
  }
];

const guides = [
  {
    title: "Resume Writing Best Practices",
    description: "Learn how to write compelling resume content that gets noticed",
    category: "Writing",
    readTime: "10 min"
  },
  {
    title: "ATS Optimization Guide", 
    description: "Make your resume ATS-friendly to pass automated screening",
    category: "Technical",
    readTime: "8 min"
  },
  {
    title: "Cover Letter Templates",
    description: "Create professional cover letters that complement your resume",
    category: "Templates",
    readTime: "5 min"
  },
  {
    title: "Interview Preparation Checklist",
    description: "Step-by-step guide to prepare for any job interview",
    category: "Career",
    readTime: "12 min"
  },
  {
    title: "Salary Negotiation Tips",
    description: "Learn how to negotiate your salary effectively",
    category: "Career", 
    readTime: "15 min"
  },
  {
    title: "LinkedIn Profile Optimization",
    description: "Optimize your LinkedIn profile to attract recruiters",
    category: "Career",
    readTime: "7 min"
  }
];

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFAQs = faqCategories.filter(category =>
    selectedCategory === "all" || category.category.toLowerCase().includes(selectedCategory.toLowerCase())
  ).filter(category =>
    searchTerm === "" || 
    category.faqs.some(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Help Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Get Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{option.method}</CardTitle>
                  <p className="text-muted-foreground">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{option.availability}</p>
                  <Button className="w-full">{option.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Guides */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Popular Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{guide.category}</Badge>
                    <span className="text-sm text-muted-foreground">{guide.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{guide.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {faqCategories.map((category) => (
              <Button
                key={category.category}
                variant={selectedCategory === category.category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.category)}
              >
                {category.category}
              </Button>
            ))}
          </div>

          {/* FAQ Cards */}
          <div className="space-y-8">
            {filteredFAQs.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <category.icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.faqs.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-l-4 border-primary/20 pl-4">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center py-12">
            <MessageCircle className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button size="lg">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}