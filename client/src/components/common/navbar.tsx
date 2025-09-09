import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Menu, Home, FileText, Settings, PlusCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">ResumeBuilder Pro</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-templates">
              Templates
            </Link>
            <Link href="/builder" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-builder">
              Builder
            </Link>
            <Link href="/home" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-dashboard">
              Dashboard
            </Link>
            <Button
              asChild
              data-testid="button-get-started"
            >
              <Link href="/builder">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2" data-testid="button-mobile-menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center space-x-2 pb-4 border-b">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <span className="text-lg font-bold">ResumeBuilder Pro</span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" 
                          data-testid="mobile-link-home">
                      <Home className="w-5 h-5 text-gray-600" />
                      <span className="text-base font-medium">Home</span>
                    </Link>
                    
                    <Link href="/enhanced-templates" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" 
                          data-testid="mobile-link-templates">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span className="text-base font-medium">Templates</span>
                    </Link>
                    
                    <Link href="/builder" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" 
                          data-testid="mobile-link-builder">
                      <PlusCircle className="w-5 h-5 text-gray-600" />
                      <span className="text-base font-medium">Resume Builder</span>
                    </Link>
                    
                    <Link href="/home" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" 
                          data-testid="mobile-link-dashboard">
                      <Home className="w-5 h-5 text-gray-600" />
                      <span className="text-base font-medium">Dashboard</span>
                    </Link>

                    <Link href="/my-resumes" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" 
                          data-testid="mobile-link-my-resumes">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span className="text-base font-medium">My Resumes</span>
                    </Link>
                    
                    <Link href="/settings" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" 
                          data-testid="mobile-link-settings">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="text-base font-medium">Settings</span>
                    </Link>
                  </nav>
                  
                  <div className="pt-4 border-t">
                    <Button asChild className="w-full py-3 text-base" onClick={() => setIsOpen(false)} data-testid="mobile-button-get-started">
                      <Link href="/builder">Create Resume</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
