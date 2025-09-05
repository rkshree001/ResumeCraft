import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { renderResumeTemplate } from "@/lib/resume-templates";
import type { ResumeData } from "@/types/resume";

interface LivePreviewProps {
  data: ResumeData;
}

export default function LivePreview({ data }: LivePreviewProps) {
  return (
    <Card className="h-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg" data-testid="text-live-preview-title">Live Preview</CardTitle>
        <p className="text-sm text-muted-foreground">Your resume updates as you type</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-white rounded border mx-6 mb-6 overflow-hidden" style={{ transform: "scale(0.75)", transformOrigin: "top" }}>
          <div className="p-8 text-black text-sm min-h-[800px]" data-testid="resume-preview">
            {renderResumeTemplate(data)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
