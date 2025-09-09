import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/common/navbar";
import { Shield, Eye, Lock, UserCheck, FileText, Mail } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, build a resume, or contact us for support. This includes:

• Personal information (name, email address, phone number)
• Resume content and career information
• Payment information (processed securely through third-party providers)
• Communication preferences and support interactions`
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our resume building services
• Process transactions and send related information
• Send you technical notices, updates, and support messages
• Respond to your comments, questions, and customer service requests
• Communicate with you about products, services, and promotional offers
• Monitor and analyze trends, usage, and activities in connection with our services`
  },
  {
    icon: Lock,
    title: "Information Security",
    content: `We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. These measures include:

• Encryption of sensitive data in transit and at rest
• Regular security assessments and updates
• Limited access to personal information by employees
• Secure data centers with physical and network security controls
• Regular backups and disaster recovery procedures`
  },
  {
    icon: UserCheck,
    title: "Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties except:

• With your explicit consent
• To trusted service providers who assist us in operating our website
• When required by law or to protect our rights
• In connection with a merger, sale, or transfer of assets
• To prevent fraud or illegal activities`
  }
];

const rights = [
  "Access your personal information we have collected",
  "Request correction of inaccurate or incomplete information", 
  "Request deletion of your personal information",
  "Object to or restrict certain processing of your information",
  "Request a copy of your information in a portable format",
  "Withdraw consent where we rely on consent for processing"
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            This Privacy Policy describes how ResumeBuilder Pro collects, uses, and protects your information when you use our services.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-muted-foreground leading-relaxed">
              At ResumeBuilder Pro, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              and use our resume building services. Please read this privacy policy carefully.
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

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-xl">Your Rights and Choices</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="space-y-3">
              {rights.map((right, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{right}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Cookies and Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                Cookies are small text files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Ensure website security and prevent fraud</li>
              </ul>
              <p>
                You can control cookies through your browser settings, but disabling certain cookies may affect 
                website functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and fulfill 
              the purposes outlined in this Privacy Policy. We will retain and use your information to comply 
              with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, 
              we will delete or anonymize your personal information within 30 days, except where we are required 
              to retain it for legal purposes.
            </p>
          </CardContent>
        </Card>

        {/* International Transfers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have data protection laws that are different from the laws of your country. 
              When we transfer your information internationally, we implement appropriate safeguards to protect 
              your information in accordance with this Privacy Policy.
            </p>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us so we can delete such information.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to 
              review this Privacy Policy periodically for any changes. Your continued use of our services after 
              the posting of changes constitutes your acceptance of such changes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Questions About This Policy?</h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: privacy@resumebuilder.com</p>
              <p>Address: 123 Career Street, Suite 100, San Francisco, CA 94105</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}