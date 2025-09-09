import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/common/navbar";
import { FileText, Scale, Shield, CreditCard, AlertTriangle, Mail } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    content: `By accessing and using ResumeBuilder Pro, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms of Service, do not use this service.

These terms apply to all visitors, users, and others who access or use the service. We reserve the right to update and change the Terms of Service without notice.`
  },
  {
    icon: Shield,
    title: "Use License",
    content: `We grant you a personal, non-transferable license to use ResumeBuilder Pro for creating and managing professional resumes and cover letters. This license includes:

• Creating unlimited resumes and cover letters (Pro subscribers)
• Downloading your documents in various formats
• Using our templates and design tools
• Accessing customer support

You may not:
• Reproduce, duplicate, copy, sell, resell or exploit any portion of the service
• Share your account credentials with others
• Use the service for any unlawful purpose
• Attempt to gain unauthorized access to the service or other accounts`
  },
  {
    icon: CreditCard,
    title: "Payment and Billing",
    content: `Subscription fees are billed in advance on a recurring basis (monthly or annually). You will be charged for your subscription plan according to the pricing and billing terms presented at the time of purchase.

• All payments are non-refundable except where required by law
• We offer a 30-day money-back guarantee for new subscribers
• Subscription prices may change with 30 days notice to existing subscribers
• You may cancel your subscription at any time through your account settings
• Upon cancellation, your access will continue until the end of your billing period`
  },
  {
    icon: Scale,
    title: "User Content and Privacy",
    content: `You retain all rights to the content you create using our service. We do not claim ownership of your resumes, cover letters, or any personal information you provide.

• You are responsible for the accuracy and legality of your content
• We reserve the right to remove content that violates our policies
• Your personal information is protected according to our Privacy Policy
• We may use aggregated, anonymized data to improve our services
• We do not share your personal content with third parties without consent`
  }
];

const restrictions = [
  "Violate any applicable laws or regulations",
  "Infringe upon the rights of others", 
  "Upload malicious code or viruses",
  "Attempt to gain unauthorized access to our systems",
  "Use the service to spam or harass others",
  "Reverse engineer or copy our software",
  "Create false or misleading resumes",
  "Use automated tools to access the service"
];

const disclaimers = [
  {
    title: "Service Availability",
    content: "While we strive for 99.9% uptime, we cannot guarantee that the service will be available at all times. We may experience downtime for maintenance, updates, or technical issues."
  },
  {
    title: "Resume Effectiveness", 
    content: "We cannot guarantee that using our service will result in job interviews or employment. Resume success depends on many factors including content quality, job market conditions, and individual circumstances."
  },
  {
    title: "Third-Party Content",
    content: "Our service may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these external services."
  },
  {
    title: "Data Accuracy",
    content: "While we provide templates and guidance, you are responsible for the accuracy and truthfulness of all information in your resumes and cover letters."
  }
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            These Terms of Service govern your use of ResumeBuilder Pro and the services we provide.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to ResumeBuilder Pro! These Terms of Service ("Terms") govern your use of our website 
              and services. By using our service, you agree to these terms. Please read them carefully as 
              they contain important information about your rights and obligations.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prohibited Uses */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <CardTitle className="text-xl">Prohibited Uses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              You may not use our service to:
            </p>
            <ul className="space-y-3">
              {restrictions.map((restriction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{restriction}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6">
              Violation of these terms may result in suspension or termination of your account.
            </p>
          </CardContent>
        </Card>

        {/* Account Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Account Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                You may terminate your account at any time by contacting customer support or using the 
                account settings. Upon termination:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your subscription will be cancelled at the end of the current billing period</li>
                <li>You will retain access to your content until the subscription expires</li>
                <li>Your personal data will be deleted according to our Privacy Policy</li>
                <li>Some information may be retained for legal or accounting purposes</li>
              </ul>
              <p>
                We reserve the right to terminate accounts that violate these terms or engage in harmful behavior.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Disclaimers and Limitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {disclaimers.map((disclaimer, index) => (
                <div key={index} className="border-l-4 border-yellow-200 pl-4">
                  <h4 className="font-semibold mb-2">{disclaimer.title}</h4>
                  <p className="text-muted-foreground text-sm">{disclaimer.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, ResumeBuilder Pro shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including without limitation, loss of 
              profits, data, use, goodwill, or other intangible losses, resulting from your use of the service. 
              Our total liability shall not exceed the amount you paid for the service in the 12 months 
              preceding the claim.
            </p>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                The ResumeBuilder Pro service and its original content, features, and functionality are owned 
                by us and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
              <p>
                Our templates, design elements, and software are proprietary and may not be copied, reproduced, 
                or used without permission. However, the content you create using our service belongs to you.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the State of California, without 
              regard to its conflict of law provisions. Any disputes arising from these terms or your use 
              of the service shall be resolved through binding arbitration in San Francisco, California.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, 
              we will provide at least 30 days notice prior to any new terms taking effect. What constitutes 
              a material change will be determined at our sole discretion. By continuing to access or use 
              our service after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Questions About These Terms?</h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: legal@resumebuilder.com</p>
              <p>Address: 123 Career Street, Suite 100, San Francisco, CA 94105</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}