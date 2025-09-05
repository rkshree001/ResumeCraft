import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();

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
            {isAuthenticated && (
              <>
                <Link href="/builder" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-builder">
                  Builder
                </Link>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-dashboard">
                  Dashboard
                </Link>
              </>
            )}
            
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {user?.profileImageUrl && (
                        <img
                          src={user.profileImageUrl}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                          data-testid="img-profile-avatar"
                        />
                      )}
                      <span className="text-sm text-foreground" data-testid="text-user-name">
                        {user?.firstName || user?.email}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => window.location.href = "/api/logout"}
                      data-testid="button-logout"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      onClick={() => window.location.href = "/api/login"}
                      data-testid="button-sign-in"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => window.location.href = "/api/login"}
                      data-testid="button-get-started"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" data-testid="button-mobile-menu">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
