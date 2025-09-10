import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Mail, Clock, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Apply = () => {
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [emailSignup, setEmailSignup] = useState("");
  const { toast } = useToast();

  const handleGoogleFormClick = () => {
    // Open Google Form in new tab
    window.open("https://forms.gle/your-google-form-id", "_blank");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSignup.trim()) return;

    // Send email to Google Sheets via Google Apps Script Web App
    try {
      const response = await fetch("https://script.google.com/macros/s/your-script-id/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email: emailSignup,
          timestamp: new Date().toISOString(),
          type: "mailing_list_signup"
        }),
      });

      toast({
        title: "Thank you!",
        description: "We'll notify you when applications open again.",
      });
      setEmailSignup("");
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleApplicationStatus = () => {
    setApplicationsOpen(!applicationsOpen);
    toast({
      title: applicationsOpen ? "Applications Closed" : "Applications Opened",
      description: applicationsOpen 
        ? "Now showing email signup form" 
        : "Now redirecting to Google Form for applications",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Apply for Membership</h1>
          <p className="text-lg text-gray-600">
            Join our cooperative housing community in Vancouver
          </p>
        </div>

        {/* Demo toggle button for testing */}
        <div className="text-center mb-8">
          <Button 
            onClick={toggleApplicationStatus}
            variant="outline"
            className="mb-4"
          >
            {applicationsOpen ? "Close Applications (Demo)" : "Open Applications (Demo)"}
          </Button>
        </div>

        {applicationsOpen ? (
          // Applications are open - show Google Form option
          <div className="space-y-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Applications Are Open!</CardTitle>
                <CardDescription className="text-lg">
                  We're currently accepting applications for available units
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Current Available Unit</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Unit Type:</span> 2 Bedroom
                    </div>
                    <div>
                      <span className="font-medium">Monthly Housing Charge:</span> $1,092
                    </div>
                    <div>
                      <span className="font-medium">Move-in Date:</span> September 1, 2024
                    </div>
                    <div>
                      <span className="font-medium">Application Deadline:</span> June 26, 2024
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Eligibility Requirements</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Household must be 1 or 2 adults PLUS 1-4 children under 18</li>
                    <li>• Must meet income requirements</li>
                    <li>• References and credit check required</li>
                    <li>• Commitment to cooperative principles</li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={handleGoogleFormClick}
                    className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Complete Application Form
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Opens in a new tab - Google Form
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Applications are closed - show email signup
          <div className="space-y-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-12 w-12 text-orange-500" />
                </div>
                <CardTitle className="text-2xl text-orange-600">Applications Currently Closed</CardTitle>
                <CardDescription className="text-lg">
                  No units are currently available, but we'd love to keep you informed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Get Notified</h3>
                  <p className="text-gray-600 mb-4">
                    Join our mailing list to be the first to know when new units become available
                  </p>
                  
                  <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="email" className="sr-only">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={emailSignup}
                          onChange={(e) => setEmailSignup(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                        <Mail className="h-4 w-4 mr-2" />
                        Subscribe
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">About Penta Co-operative Housing</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Location</h4>
                      <p className="text-gray-600">Near Jericho Beach, Vancouver</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Community</h4>
                      <p className="text-gray-600">Family-oriented cooperative housing</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Unit Types</h4>
                      <p className="text-gray-600">1, 2, and 3 bedroom units</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Benefits</h4>
                      <p className="text-gray-600">Affordable housing with community support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-12 text-center">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Questions?</CardTitle>
              <CardDescription>
                Contact us for more information about membership and applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" asChild>
                  <a href="mailto:info@pentacoop.com">
                    <Mail className="h-4 w-4 mr-2" />
                    info@pentacoop.com
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+1-604-555-0123">
                    (604) 555-0123
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Apply;