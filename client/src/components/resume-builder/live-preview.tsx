import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { Eye, Download, Maximize2 } from "lucide-react";
import { useState } from "react";
import type { ResumeData } from "@/types/resume";

interface LivePreviewProps {
  data: ResumeData;
}

export default function LivePreview({ data }: LivePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.45);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setPreviewScale(isFullscreen ? 0.65 : 0.9);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2" data-testid="text-live-preview-title">
                <Eye className="w-5 h-5 text-primary" />
                Live Preview
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Your resume updates as you type</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewScale(Math.min(1, previewScale + 0.1))}
                disabled={previewScale >= 1}
                title="Zoom In"
              >
                +
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewScale(Math.max(0.3, previewScale - 0.1))}
                disabled={previewScale <= 0.3}
                title="Zoom Out"
              >
                -
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="hidden sm:flex"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 h-[calc(100vh-200px)] overflow-hidden">
          <div className="h-full w-full bg-white rounded-lg border shadow-sm overflow-auto">
            <div 
              className="w-full h-fit bg-white"
              style={{ 
                transform: `scale(${previewScale})`, 
                transformOrigin: "top center",
                fontSize: '10px',
                lineHeight: '1.3',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              data-testid="resume-preview"
            >
              <ModernTemplate data={data} colorScheme={data.settings?.colorScheme || 'blue'} />
            </div>
          </div>
          
          {/* Mobile Preview Controls */}
          <div className="mt-4 flex justify-center gap-2 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewScale(Math.min(1, previewScale + 0.1))}
              disabled={previewScale >= 1}
            >
              Zoom In
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewScale(Math.max(0.4, previewScale - 0.1))}
              disabled={previewScale <= 0.4}
            >
              Zoom Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Resume Preview</h3>
              <Button variant="outline" onClick={toggleFullscreen}>
                Close
              </Button>
            </div>
            <div className="p-8 flex justify-center">
              <div 
                className="bg-white border shadow-lg"
                style={{ 
                  width: '210mm', 
                  minHeight: '297mm', 
                  padding: '20mm',
                  fontSize: '12px',
                  lineHeight: '1.4',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#000000',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                  transform: 'scale(0.8)',
                  transformOrigin: 'top center'
                }}
                data-testid="resume-preview-fullscreen"
              >
                <ModernTemplate data={data} colorScheme={data.settings?.colorScheme || 'blue'} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
