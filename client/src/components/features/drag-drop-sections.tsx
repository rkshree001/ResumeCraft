import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus } from "lucide-react";
import type { ResumeData } from "@/types/resume";

interface DragDropSectionsProps {
  resumeData: ResumeData;
  onReorder: (newOrder: string[]) => void;
  onAddSection: () => void;
}

const SECTION_CONFIG = {
  personalInfo: { title: "Personal Information", icon: "👤" },
  summary: { title: "Professional Summary", icon: "📝" },
  experiences: { title: "Work Experience", icon: "💼" },
  education: { title: "Education", icon: "🎓" },
  skills: { title: "Skills", icon: "⚡" },
  projects: { title: "Projects", icon: "🚀" },
  customSections: { title: "Custom Sections", icon: "📋" }
};

export function DragDropSections({ resumeData, onReorder, onAddSection }: DragDropSectionsProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  
  // Get current section order (sections that have content)
  const activeSections = Object.keys(SECTION_CONFIG).filter(key => {
    const data = resumeData[key as keyof ResumeData];
    return data && (
      (Array.isArray(data) && data.length > 0) ||
      (typeof data === 'string' && data.trim() !== '') ||
      (typeof data === 'object' && Object.keys(data).length > 0)
    );
  });

  const handleDragStart = (e: React.DragEvent, sectionKey: string) => {
    setDraggedItem(sectionKey);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItem(null);
    setDragOverItem(null);
    e.currentTarget.classList.remove('dragging');
    
    // Remove drag-over class from all items
    document.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
  };

  const handleDragOver = (e: React.DragEvent, sectionKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(sectionKey);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent, targetSectionKey: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (!draggedItem || draggedItem === targetSectionKey) return;

    const newOrder = [...activeSections];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(targetSectionKey);
    
    // Remove dragged item and insert at new position
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);
    
    onReorder(newOrder);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const getSectionContent = (sectionKey: string) => {
    const data = resumeData[sectionKey as keyof ResumeData];
    
    if (sectionKey === 'personalInfo' && data) {
      const info = data as any;
      return `${info.name || 'No name'} • ${info.email || 'No email'}`;
    }
    
    if (sectionKey === 'summary' && data) {
      const summary = data as string;
      return summary.length > 100 ? `${summary.substring(0, 100)}...` : summary;
    }
    
    if (Array.isArray(data)) {
      return `${data.length} item${data.length !== 1 ? 's' : ''}`;
    }
    
    return 'Content available';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Resume Sections</h3>
        <Button onClick={onAddSection} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Section
        </Button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Drag and drop to reorder sections in your resume
      </p>

      <div className="space-y-3">
        {activeSections.map((sectionKey, index) => {
          const config = SECTION_CONFIG[sectionKey as keyof typeof SECTION_CONFIG];
          if (!config) return null;
          
          return (
            <Card 
              key={sectionKey}
              className={`cursor-move transition-all duration-200 hover-lift ${
                draggedItem === sectionKey ? 'opacity-50 scale-105' : ''
              } ${
                dragOverItem === sectionKey ? 'border-blue-500' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, sectionKey)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, sectionKey)}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, sectionKey)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <span className="text-lg">{config.icon}</span>
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium">
                      {index + 1}. {config.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {getSectionContent(sectionKey)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {activeSections.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              Start building your resume to see sections here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}