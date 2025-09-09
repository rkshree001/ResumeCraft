import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/common/navbar";
import { Mail, Phone, MapPin, Clock, MessageSquare, HeadphonesIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    info: "support@resumebuilder.com",
    description: "Send us an email and we'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Call Us", 
    info: "+1 (555) 123-4567",
    description: "Mon-Fri 9AM-6PM EST (Pro subscribers)"
  },
  {
    icon: MapPin,
    title: "Address",
    info: "123 Career Street, Suite 100\nSan Francisco, CA 94105",
    description: "Visit our headquarters"
  },
  {
    icon: Clock,
    title: "Business Hours",
    info: "Monday - Friday: 9AM - 6PM EST\nWeekends: Closed",
    description: "We're here to help during business hours"
  }
];

const departments = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "billing", label: "Billing & Subscriptions" },
  { value: "business", label: "Business & Partnerships" },
  { value: "press", label: "Press & Media" }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      department: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our resume builder? Need help with your account? We're here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                    <p className="text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your question or issue in detail..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Support */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <HeadphonesIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Need Immediate Help?</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Check out our Help Center for instant answers to common questions, or start a live chat for real-time support.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    Visit Help Center
                  </Button>
                  <Button size="sm">
                    Start Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Other Ways to Reach Us</h3>
              {contactInfo.map((contact, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <contact.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-1">{contact.title}</h4>
                        <p className="text-sm font-mono text-foreground mb-2 whitespace-pre-line">
                          {contact.info}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Link */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Find quick answers to the most common questions about our resume builder.
                </p>
                <Button variant="outline" className="w-full">
                  Browse FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Support Options */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">More Ways We Can Help</h2>
            <p className="text-muted-foreground">
              Explore our resources designed to help you succeed in your job search.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Career Advice</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Expert tips and guidance for advancing your career.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Resume Tips</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Best practices for writing compelling resumes.
                </p>
                <Button variant="outline" size="sm">Read Tips</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Interview Prep</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Prepare for interviews with our comprehensive guide.
                </p>
                <Button variant="outline" size="sm">Get Prepared</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}