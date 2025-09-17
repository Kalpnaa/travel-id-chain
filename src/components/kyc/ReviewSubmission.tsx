import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Calendar, IdCard, Phone, Camera, FileText, Shield } from "lucide-react";

interface ReviewSubmissionProps {
  data: {
    name: string;
    dateOfBirth: string;
    idNumber: string;
    emergencyContact: string;
    photo: File | null;
    idDocument: File | null;
  };
  onNext: () => void;
  onBack: () => void;
}

export const ReviewSubmission = ({ data, onNext, onBack }: ReviewSubmissionProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span>Review & Submit</span>
        </CardTitle>
        <CardDescription>
          Please review your information before submitting for verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information Review */}
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 flex items-center space-x-2 text-sm font-semibold">
            <User className="h-4 w-4 text-primary" />
            <span>Personal Information</span>
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Name:</span>
              <span className="text-sm font-medium">{data.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">DOB:</span>
              <span className="text-sm font-medium">{data.dateOfBirth}</span>
            </div>
            <div className="flex items-center space-x-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">ID:</span>
              <span className="text-sm font-medium">{data.idNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Contact:</span>
              <span className="text-sm font-medium">{data.emergencyContact}</span>
            </div>
          </div>
        </div>

        {/* Documents Review */}
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 flex items-center space-x-2 text-sm font-semibold">
            <FileText className="h-4 w-4 text-primary" />
            <span>Uploaded Documents</span>
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center space-x-3">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Personal Photo</p>
                <p className="text-xs text-muted-foreground">
                  {data.photo?.name || 'No photo uploaded'}
                </p>
              </div>
              <Badge variant="outline" className="text-success">
                <CheckCircle className="mr-1 h-3 w-3" />
                Ready
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">ID Document</p>
                <p className="text-xs text-muted-foreground">
                  {data.idDocument?.name || 'No document uploaded'}
                </p>
              </div>
              <Badge variant="outline" className="text-success">
                <CheckCircle className="mr-1 h-3 w-3" />
                Ready
              </Badge>
            </div>
          </div>
        </div>

        {/* Blockchain Information */}
        <div className="rounded-lg border bg-gradient-subtle p-4">
          <h3 className="mb-3 flex items-center space-x-2 text-sm font-semibold">
            <Shield className="h-4 w-4 text-primary" />
            <span>Digital ID Information</span>
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Your data will be hashed using SHA-256 encryption</p>
            <p>• Digital ID will be stored immutably on the blockchain</p>
            <p>• Validity period: 1 year from issuance</p>
            <p>• You will receive a PDF certificate with blockchain proof</p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="rounded-lg bg-muted p-4">
          <p className="text-xs text-muted-foreground">
            By submitting this form, you agree to the processing of your personal data for KYC verification purposes. 
            Your information will be encrypted and stored securely according to data protection regulations.
          </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Documents
          </Button>
          <Button 
            onClick={onNext}
            className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow"
          >
            Submit for Verification
          </Button>
        </div>
      </CardContent>
    </>
  );
};