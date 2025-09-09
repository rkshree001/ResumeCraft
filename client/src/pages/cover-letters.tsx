import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/common/navbar";
import { Plus, FileText, Edit, Share, Download } from "lucide-react";

export default function CoverLetters() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Cover Letters
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create compelling cover letters that complement your resume and help you stand out to employers.
          </p>
        </div>

        {/* Create New Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Cover Letter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button asChild className="h-24 flex-col">
                <Link href="/cover-letter-builder">
                  <FileText className="w-8 h-8 mb-2" />
                  Start from Scratch
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-24 flex-col">
                <Link href="/cover-letter-templates">
                  <Edit className="w-8 h-8 mb-2" />
                  Use Template
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-24 flex-col">
                <Link href="/import-cover-letter">
                  <Share className="w-8 h-8 mb-2" />
                  Import Existing
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Cover Letters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">My Cover Letters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Software Engineer Application</CardTitle>
                    <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                  </div>
                  <Badge>Draft</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Last updated: 2 days ago
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Marketing Manager Role</CardTitle>
                    <p className="text-sm text-muted-foreground">Creative Agency</p>
                  </div>
                  <Badge variant="secondary">Complete</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Last updated: 1 week ago
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 flex items-center justify-center min-h-48">
              <div className="text-center">
                <Plus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Create New Cover Letter</h3>
                <p className="text-muted-foreground mb-4">Start with a template or create from scratch</p>
                <Button asChild>
                  <Link href="/cover-letter-builder">Get Started</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cover Letter Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Customize each cover letter for the specific job and company</li>
              <li>• Keep it concise - ideally one page or less</li>
              <li>• Highlight your most relevant achievements and skills</li>
              <li>• Use a professional tone while showing your personality</li>
              <li>• Always proofread before sending</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}