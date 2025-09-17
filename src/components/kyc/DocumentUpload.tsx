import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Camera, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  data: {
    photo: File | null;
    idDocument: File | null;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DocumentUpload = ({ data, onUpdate, onNext, onBack }: DocumentUploadProps) => {
  const handleFileUpload = (type: 'photo' | 'idDocument') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdate({ [type]: file });
    }
  };

  const isFormValid = data.photo && data.idDocument;

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5 text-primary" />
          <span>Document Upload</span>
        </CardTitle>
        <CardDescription>
          Please upload a clear photo of yourself and your identification document
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Photo Upload */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Personal Photo</span>
            </Label>
            <div className={cn(
              "relative rounded-lg border-2 border-dashed p-6 text-center transition-smooth",
              data.photo 
                ? "border-success bg-success/5 text-success-foreground" 
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
            )}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload('photo')}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              {data.photo ? (
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="h-8 w-8 text-success" />
                  <p className="text-sm font-medium">Photo Uploaded</p>
                  <p className="text-xs text-muted-foreground">{data.photo.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">Upload Photo</p>
                  <p className="text-xs text-muted-foreground">Click to select image</p>
                </div>
              )}
            </div>
          </div>

          {/* ID Document Upload */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>ID Document</span>
            </Label>
            <div className={cn(
              "relative rounded-lg border-2 border-dashed p-6 text-center transition-smooth",
              data.idDocument 
                ? "border-success bg-success/5 text-success-foreground" 
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
            )}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload('idDocument')}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              {data.idDocument ? (
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="h-8 w-8 text-success" />
                  <p className="text-sm font-medium">Document Uploaded</p>
                  <p className="text-xs text-muted-foreground">{data.idDocument.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">Upload ID Document</p>
                  <p className="text-xs text-muted-foreground">Passport, License, or National ID</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-medium">Document Requirements:</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Clear, well-lit images</li>
            <li>• All text must be readable</li>
            <li>• No blurred or cropped edges</li>
            <li>• Maximum file size: 10MB</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={onNext}
            disabled={!isFormValid}
            className="bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            Next Step
          </Button>
        </div>
      </CardContent>
    </>
  );
};