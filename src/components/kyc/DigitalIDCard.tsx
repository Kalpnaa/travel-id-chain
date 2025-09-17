import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Download, ExternalLink, CheckCircle, Calendar, Hash, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DigitalIDCardProps {
  data: {
    name: string;
    dateOfBirth: string;
    idNumber: string;
    emergencyContact: string;
  };
  digitalId: {
    userHash: string;
    issuedAt: string;
    validUntil: string;
    transactionHash: string;
  };
}

export const DigitalIDCard = ({ data, digitalId }: DigitalIDCardProps) => {
  const handleDownloadPDF = () => {
    toast({
      title: "PDF Generated",
      description: "Your Digital ID certificate has been downloaded.",
    });
  };

  const handleViewTransaction = () => {
    toast({
      title: "Transaction Viewer",
      description: "Opening blockchain explorer in new tab.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  return (
    <>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="flex items-center justify-center space-x-2 text-green-600">
          <CheckCircle className="h-6 w-6" />
          <span>Digital ID Successfully Issued!</span>
        </CardTitle>
        <CardDescription>
          Your blockchain-based Digital Identity has been created and verified
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Digital ID Card Display */}
        <div className="rounded-xl border-2 border-primary/20 bg-gradient-primary p-6 text-primary-foreground shadow-glow">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="text-lg font-bold">Digital Identity</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              VERIFIED
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm opacity-80">Full Name</p>
              <p className="text-xl font-semibold">{data.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-80">ID Number</p>
                <p className="font-medium">{data.idNumber}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Date of Birth</p>
                <p className="font-medium">{data.dateOfBirth}</p>
              </div>
            </div>
            <div>
              <p className="text-sm opacity-80">Digital ID Hash</p>
              <p className="font-mono text-sm">{shortenHash(digitalId.userHash)}</p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-3 flex items-center space-x-2 text-sm font-semibold">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Validity Information</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issued:</span>
                <span className="font-medium">{formatDate(digitalId.issuedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valid Until:</span>
                <span className="font-medium">{formatDate(digitalId.validUntil)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-3 flex items-center space-x-2 text-sm font-semibold">
              <Hash className="h-4 w-4 text-primary" />
              <span>Blockchain Proof</span>
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Transaction Hash</p>
                <p className="font-mono text-xs">{shortenHash(digitalId.transactionHash)}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewTransaction}
                className="w-full"
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                View on Blockchain
              </Button>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-3 flex items-center space-x-2 text-sm font-semibold">
            <Shield className="h-4 w-4 text-primary" />
            <span>Security Features</span>
          </h4>
          <div className="grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-success" />
              <span>SHA-256 Encrypted Hash</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-success" />
              <span>Blockchain Immutable Storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-success" />
              <span>Smart Contract Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-success" />
              <span>Tamper-Proof Digital Certificate</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button 
            onClick={handleDownloadPDF}
            className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF Certificate
          </Button>
          <Button variant="outline" className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Share Digital ID
          </Button>
        </div>

        {/* Next Steps */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="mb-2 text-sm font-semibold">What's Next?</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Your Digital ID is now active and can be used for verification</li>
            <li>• The PDF certificate can be shared with authorities when needed</li>
            <li>• Your identity is cryptographically secured on the blockchain</li>
            <li>• You can verify the authenticity anytime using the transaction hash</li>
          </ul>
        </div>
      </CardContent>
    </>
  );
};