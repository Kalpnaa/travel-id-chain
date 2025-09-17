import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Calendar, IdCard, Phone } from "lucide-react";

interface PersonalInfoFormProps {
  data: {
    name: string;
    dateOfBirth: string;
    idNumber: string;
    emergencyContact: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export const PersonalInfoForm = ({ data, onUpdate, onNext }: PersonalInfoFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name && data.dateOfBirth && data.idNumber && data.emergencyContact) {
      onNext();
    }
  };

  const isFormValid = data.name && data.dateOfBirth && data.idNumber && data.emergencyContact;

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5 text-primary" />
          <span>Personal Information</span>
        </CardTitle>
        <CardDescription>
          Please provide your personal details for identity verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={data.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date of Birth</span>
              </Label>
              <Input
                id="dob"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber" className="flex items-center space-x-2">
                <IdCard className="h-4 w-4" />
                <span>ID Number</span>
              </Label>
              <Input
                id="idNumber"
                type="text"
                placeholder="Passport, Aadhar, or National ID"
                value={data.idNumber}
                onChange={(e) => onUpdate({ idNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Emergency Contact</span>
              </Label>
              <Input
                id="emergency"
                type="tel"
                placeholder="Phone number or email"
                value={data.emergencyContact}
                onChange={(e) => onUpdate({ emergencyContact: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={!isFormValid}
              className="bg-gradient-primary hover:opacity-90 transition-smooth"
            >
              Next Step
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );
};