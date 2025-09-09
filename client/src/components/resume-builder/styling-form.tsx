import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Upload, Image, Palette, Type, Layout, Circle } from "lucide-react";
import type { ResumeSettings } from "@/types/resume";
import { useToast } from "@/hooks/use-toast";

interface StylingFormProps {
  data: ResumeSettings;
  onChange: (settings: ResumeSettings) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const colorSchemes = [
  { value: 'blue', name: 'Professional Blue', colors: ['#2563eb', '#1e40af', '#3b82f6'] },
  { value: 'green', name: 'Nature Green', colors: ['#059669', '#047857', '#10b981'] },
  { value: 'purple', name: 'Creative Purple', colors: ['#7c3aed', '#6d28d9', '#8b5cf6'] },
  { value: 'red', name: 'Bold Red', colors: ['#dc2626', '#b91c1c', '#ef4444'] },
  { value: 'gray', name: 'Modern Gray', colors: ['#4b5563', '#374151', '#6b7280'] },
  { value: 'teal', name: 'Tech Teal', colors: ['#0d9488', '#0f766e', '#14b8a6'] },
  { value: 'orange', name: 'Energy Orange', colors: ['#ea580c', '#c2410c', '#fb923c'] },
  { value: 'custom', name: 'Custom Colors', colors: ['#000000', '#333333', '#666666'] }
];

const bulletStyles = [
  { value: 'circle', label: '● Circle', preview: '●' },
  { value: 'square', label: '■ Square', preview: '■' },
  { value: 'arrow', label: '▶ Arrow', preview: '▶' },
  { value: 'dash', label: '– Dash', preview: '–' },
  { value: 'chevron', label: '› Chevron', preview: '›' },
  { value: 'diamond', label: '◆ Diamond', preview: '◆' },
  { value: 'star', label: '★ Star', preview: '★' },
  { value: 'none', label: 'No Bullets', preview: '' }
];

const fontFamilies = [
  { value: 'system', label: 'System Default', family: 'system-ui, -apple-system, sans-serif' },
  { value: 'inter', label: 'Inter (Modern)', family: 'Inter, system-ui, sans-serif' },
  { value: 'roboto', label: 'Roboto (Clean)', family: 'Roboto, system-ui, sans-serif' },
  { value: 'opensans', label: 'Open Sans (Friendly)', family: 'Open Sans, system-ui, sans-serif' },
  { value: 'lato', label: 'Lato (Professional)', family: 'Lato, system-ui, sans-serif' },
  { value: 'poppins', label: 'Poppins (Trendy)', family: 'Poppins, system-ui, sans-serif' },
  { value: 'playfair', label: 'Playfair (Elegant)', family: 'Playfair Display, serif' },
  { value: 'times', label: 'Times (Traditional)', family: 'Times New Roman, serif' },
  { value: 'georgia', label: 'Georgia (Classic)', family: 'Georgia, serif' }
];

export default function StylingForm({ data, onChange, onNext, onPrev }: StylingFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);

  const updateSetting = (key: keyof ResumeSettings, value: any) => {
    onChange({
      ...data,
      [key]: value
    });
  };

  const handleFileUpload = async (file: File, type: 'signature' | 'profileImage') => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, GIF, or WebP image.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        updateSetting(type, base64);
        toast({
          title: "Image uploaded successfully",
          description: `Your ${type === 'signature' ? 'signature' : 'profile image'} has been added.`
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'signature');
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'profileImage');
    }
  };

  const removeImage = (type: 'signature' | 'profileImage') => {
    updateSetting(type, undefined);
    toast({
      title: "Image removed",
      description: `Your ${type === 'signature' ? 'signature' : 'profile image'} has been removed.`
    });
  };

  const selectedColorScheme = colorSchemes.find(scheme => scheme.value === data.colorScheme) || colorSchemes[0];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Images
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Color Scheme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {colorSchemes.map((scheme) => (
                  <div
                    key={scheme.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                      data.colorScheme === scheme.value 
                        ? 'ring-2 ring-primary border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateSetting('colorScheme', scheme.value)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {scheme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{scheme.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {data.colorScheme === 'custom' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="accent-color"
                          type="color"
                          value={data.accentColor || '#2563eb'}
                          onChange={(e) => updateSetting('accentColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={data.accentColor || '#2563eb'}
                          onChange={(e) => updateSetting('accentColor', e.target.value)}
                          placeholder="#2563eb"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="text-color">Text Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="text-color"
                          type="color"
                          value={data.textColor || '#000000'}
                          onChange={(e) => updateSetting('textColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={data.textColor || '#000000'}
                          onChange={(e) => updateSetting('textColor', e.target.value)}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bg-color">Background Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="bg-color"
                          type="color"
                          value={data.backgroundColor || '#ffffff'}
                          onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={data.backgroundColor || '#ffffff'}
                          onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                          placeholder="#ffffff"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typography Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select value={data.fontFamily || 'system'} onValueChange={(value) => updateSetting('fontFamily', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.family }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="font-size">Font Size</Label>
                <Select value={data.fontSize || 'medium'} onValueChange={(value) => updateSetting('fontSize', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (10px)</SelectItem>
                    <SelectItem value="medium">Medium (12px)</SelectItem>
                    <SelectItem value="large">Large (14px)</SelectItem>
                    <SelectItem value="xlarge">Extra Large (16px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="line-spacing">Line Spacing</Label>
                <Select value={data.lineSpacing || 'normal'} onValueChange={(value) => updateSetting('lineSpacing', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact (1.2)</SelectItem>
                    <SelectItem value="normal">Normal (1.4)</SelectItem>
                    <SelectItem value="relaxed">Relaxed (1.6)</SelectItem>
                    <SelectItem value="loose">Loose (1.8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bullet-style">Bullet Point Style</Label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                  {bulletStyles.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      className={`p-3 text-left rounded-lg border transition-all hover:scale-105 ${
                        data.bulletStyle === style.value
                          ? 'ring-2 ring-primary border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateSetting('bulletStyle', style.value)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{style.preview}</span>
                        <span className="text-sm">{style.label.split(' ')[1]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5" />
                Layout Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="margins">Page Margins</Label>
                <Select value={data.margins || 'normal'} onValueChange={(value) => updateSetting('margins', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="narrow">Narrow (0.5 inch)</SelectItem>
                    <SelectItem value="normal">Normal (1 inch)</SelectItem>
                    <SelectItem value="wide">Wide (1.5 inch)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="section-spacing">Section Spacing</Label>
                <Select value={data.sectionSpacing || 'normal'} onValueChange={(value) => updateSetting('sectionSpacing', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="header-style">Header Style</Label>
                <Select value={data.headerStyle || 'modern'} onValueChange={(value) => updateSetting('headerStyle', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern (Clean)</SelectItem>
                    <SelectItem value="classic">Classic (Traditional)</SelectItem>
                    <SelectItem value="bold">Bold (Prominent)</SelectItem>
                    <SelectItem value="minimal">Minimal (Simple)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Profile Image & Signature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Profile Image</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add a professional profile photo to your resume header
                </p>
                {data.profileImage ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={data.profileImage}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Profile image uploaded</p>
                        <p className="text-sm text-muted-foreground">Your profile image is ready to use</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeImage('profileImage')}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={profileImageRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => profileImageRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Profile Image
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <Label>Digital Signature</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add your signature to make your resume more personal
                </p>
                {data.signature ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={data.signature}
                        alt="Signature"
                        className="max-w-32 max-h-16 object-contain border rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Signature uploaded</p>
                        <p className="text-sm text-muted-foreground">Your signature will appear at the bottom</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeImage('signature')}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Signature
                    </Button>
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                <p>• Supported formats: JPEG, PNG, GIF, WebP</p>
                <p>• Maximum file size: 2MB</p>
                <p>• Recommended: High contrast images work best</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        {onPrev && (
          <Button variant="outline" onClick={onPrev}>
            Previous
          </Button>
        )}
        {onNext && (
          <Button onClick={onNext} className="ml-auto">
            Next Step
          </Button>
        )}
      </div>
    </div>
  );
}