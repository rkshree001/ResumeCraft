import { Card, CardContent } from "@/components/ui/card";
import type { Resume } from "@/types/resume";

interface StatsOverviewProps {
  resumes: Resume[];
}

export default function StatsOverview({ resumes }: StatsOverviewProps) {
  const totalViews = resumes.reduce((sum, resume) => sum + (resume.viewCount || 0), 0);
  const totalDownloads = resumes.reduce((sum, resume) => sum + (resume.downloadCount || 0), 0);
  const activeResumes = resumes.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-2" data-testid="stat-active-resumes">
            {activeResumes}
          </div>
          <div className="text-sm text-muted-foreground">Active Resumes</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-total-views">
            {totalViews}
          </div>
          <div className="text-sm text-muted-foreground">Total Views</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-2" data-testid="stat-total-downloads">
            {totalDownloads}
          </div>
          <div className="text-sm text-muted-foreground">Downloads</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2" data-testid="stat-response-rate">
            {activeResumes > 0 ? Math.round((totalViews / activeResumes) * 10) : 0}%
          </div>
          <div className="text-sm text-muted-foreground">Avg. Response Rate</div>
        </CardContent>
      </Card>
    </div>
  );
}
