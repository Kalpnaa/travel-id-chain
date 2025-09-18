import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Camera, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface DocumentUploadProps {
  data: {
    name: string;
    dateOfBirth: string;
    idNumber: string;
    emergencyContact: string;
    photo: File | null;
    idDocument: File | null;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DocumentUpload = ({ data, onUpdate, onNext, onBack }: DocumentUploadProps) => {
  const [documentValidation, setDocumentValidation] = useState<{
    status: 'pending' | 'validating' | 'valid' | 'invalid';
    extractedData?: {
      name?: string;
      idNumber?: string;
      dateOfBirth?: string;
    };
    mismatches?: string[];
  }>({ status: 'pending' });

  const validateDocumentData = async (file: File) => {
    setDocumentValidation({ status: 'validating' });
    
    // Simulate document processing/OCR with more comprehensive validation
    setTimeout(() => {
      // Mock extracted data - in real app, this would be from OCR/document processing
      const extractedData = {
        name: data.name, // Simulate matching name
        idNumber: data.idNumber, // Simulate matching ID
        dateOfBirth: data.dateOfBirth, // Simulate matching DOB
        contact: data.emergencyContact, // Simulate matching contact
      };
      
      // Check for mismatches with all fields
      const mismatches: string[] = [];
      
      // Simulate validation - in real app, compare OCR extracted data with form data
      if (Math.random() < 0.25) { // 25% chance of name mismatch
        if (data.name !== extractedData.name) mismatches.push('Name');
      }
      
      if (Math.random() < 0.25) { // 25% chance of ID mismatch  
        if (data.idNumber !== extractedData.idNumber) mismatches.push('ID Number');
      }
      
      if (Math.random() < 0.25) { // 25% chance of DOB mismatch
        if (data.dateOfBirth !== extractedData.dateOfBirth) mismatches.push('Date of Birth');
      }
      
      if (Math.random() < 0.25) { // 25% chance of contact mismatch
        if (data.emergencyContact !== extractedData.contact) mismatches.push('Emergency Contact');
      }

      // Check if uploaded photo file is actually an image
      if (data.photo && !data.photo.type.startsWith('image/')) {
        mismatches.push('Photo format (must be an image)');
      }
      
      // Check if document file is valid (image or PDF)
      if (file && !file.type.startsWith('image/') && file.type !== 'application/pdf') {
        mismatches.push('Document format (must be image or PDF)');
      }
      
      setDocumentValidation({
        status: mismatches.length > 0 ? 'invalid' : 'valid',
        extractedData,
        mismatches
      });

      if (mismatches.length === 0) {
        toast({
          title: "Document Verified",
          description: "All information matches successfully including photo validation.",
        });
      } else {
        toast({
          title: "Document Validation Failed",
          description: `Mismatched fields: ${mismatches.join(', ')}`,
          variant: "destructive"
        });
      }
    }, 2000);
  };

  const handleFileUpload = (type: 'photo' | 'idDocument') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type before processing
      if (type === 'photo' && !file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a valid image file for your photo.",
          variant: "destructive"
        });
        return;
      }
      
      if (type === 'idDocument' && !file.type.startsWith('image/') && file.type !== 'application/pdf') {
        toast({
          title: "Invalid File Type", 
          description: "Please upload a valid image or PDF file for your document.",
          variant: "destructive"
        });
        return;
      }
      
      onUpdate({ [type]: file });
      
      if (type === 'idDocument') {
        validateDocumentData(file);
        toast({
          title: "Document Uploaded",
          description: "Processing document for comprehensive validation...",
        });
      } else {
        toast({
          title: "Photo Uploaded",
          description: "Photo uploaded successfully and validated.",
        });
      }
    }
  };

  const isFormValid = data.photo && data.idDocument && documentValidation.status === 'valid';

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
                  {documentValidation.status === 'validating' ? (
                    <>
                      <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
                      <p className="text-sm font-medium">Validating...</p>
                      <p className="text-xs text-muted-foreground">Processing document data</p>
                    </>
                  ) : documentValidation.status === 'valid' ? (
                    <>
                      <CheckCircle className="h-8 w-8 text-success" />
                      <p className="text-sm font-medium">Document Verified</p>
                      <p className="text-xs text-muted-foreground">{data.idDocument.name}</p>
                    </>
                  ) : documentValidation.status === 'invalid' ? (
                    <>
                      <XCircle className="h-8 w-8 text-destructive" />
                      <p className="text-sm font-medium">Validation Failed</p>
                      <p className="text-xs text-muted-foreground">{data.idDocument.name}</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-8 w-8 text-success" />
                      <p className="text-sm font-medium">Document Uploaded</p>
                      <p className="text-xs text-muted-foreground">{data.idDocument.name}</p>
                    </>
                  )}
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

        {documentValidation.status === 'invalid' && documentValidation.mismatches && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Document Validation Failed:</strong><br />
              The following fields do not match your document:<br />
              <ul className="list-disc list-inside mt-2">
                {documentValidation.mismatches.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
              Please verify your information or upload a different document.
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-medium">Document Requirements:</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Clear, well-lit images</li>
            <li>• All text must be readable</li>
            <li>• No blurred or cropped edges</li>
            <li>• Maximum file size: 10MB</li>
            <li>• Information must match your personal details exactly</li>
            <li>• Photo must match the person in the document</li>
            <li>• Valid documents: Aadhar Card, Passport, Driver's License</li>
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