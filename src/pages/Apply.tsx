import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Mail, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Apply = () => {
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [bedroomPreferences, setBedroomPreferences] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleGoogleFormClick = () => {
    // Open Google Form in new tab
    window.open("https://applications.pentacoop.com/", "_blank");
  };


  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || bedroomPreferences.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in both email and bedroom preferences",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with your Google Sheets endpoint
      const response = await fetch('YOUR_GOOGLE_SHEETS_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          bedroomPreferences: bedroomPreferences.join(', '),
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Thank you!",
          description: "You've been added to our mailing list",
        });
        setEmail("");
        setBedroomPreferences([]);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const EmailSignupForm = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
      </div>
      
      <div>
        <Label>Bedroom Preferences</Label>
        <div className="space-y-2 mt-2">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="1-bedroom"
              checked={bedroomPreferences.includes("1-bedroom")}
              onCheckedChange={(checked) => handleBedroomChange("1-bedroom", checked as boolean)}
            />
            <Label htmlFor="1-bedroom" className="font-normal">
              1 bedroom - 1 or 2 adults
            </Label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="2-bedroom"
              checked={bedroomPreferences.includes("2-bedroom")}
              onCheckedChange={(checked) => handleBedroomChange("2-bedroom", checked as boolean)}
            />
            <Label htmlFor="2-bedroom" className="font-normal">
              2 bedroom - 1 or 2 adults PLUS 1 or more children under 18
            </Label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="3-bedroom"
              checked={bedroomPreferences.includes("3-bedroom")}
              onCheckedChange={(checked) => handleBedroomChange("3-bedroom", checked as boolean)}
            />
            <Label htmlFor="3-bedroom" className="font-normal">
              3 bedroom - 1 or 2 adults PLUS 2 or more children under 18
            </Label>
          </div>
        </div>
      </div>
      
      <div className="text-center pt-2">
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3"
        >
          <Mail className="h-5 w-5 mr-2" />
          {isSubmitting ? "Subscribing..." : "Subscribe for Updates"}
        </Button>
      </div>
    </form>
  );
  const handleBedroomChange = (bedroom: string, checked: boolean) => {
    if (checked) {
      setBedroomPreferences([...bedroomPreferences, bedroom]);
    } else {
      setBedroomPreferences(bedroomPreferences.filter(b => b !== bedroom));
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
            Join our cooperative housing community in Vancouver. We're a member-owned housing cooperative that provides affordable, sustainable housing while fostering community connections. Our residents participate in governance and share in maintaining our beautiful property together.
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
                    <div className="md:col-span-2">
                      <span className="font-medium">Household Requirements:</span> 1 or 2 adults PLUS 1 or more children under 18
                    </div>
                  </div>
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
                    Opens in a new tab
                  </p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold mb-2">Don't Qualify for This Unit?</h3>
                  <p className="text-gray-600 mb-4">
                    Join our mailing list to be notified when units matching your preferences become available
                  </p>
                  
                  <EmailSignupForm />
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
                  We don't currently have any available units. Applications typically open every 2 or 3 years.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2 text-center">Get Notified</h3>
                  <p className="text-gray-600 mb-6 text-center">
                    Join our mailing list to be the first to know when applications open again
                  </p>
                  
                  <EmailSignupForm />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Application Process</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">1</div>
                      <h4 className="font-semibold">Subscribe</h4>
                      <p className="text-sm text-gray-600">Join our mailing list to get notified when units become available</p>
                    </div>
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">2</div>
                      <h4 className="font-semibold">Apply</h4>
                      <p className="text-sm text-gray-600">Submit your application when a suitable unit opens up</p>
                    </div>
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">3</div>
                      <h4 className="font-semibold">Interview</h4>
                      <p className="text-sm text-gray-600">If selected, participate in our community interview process</p>
                    </div>
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">4</div>
                      <h4 className="font-semibold">Move In</h4>
                      <p className="text-sm text-gray-600">Welcome home! Join our thriving cooperative community</p>
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <Link to="/about">
                      <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        Learn More About Our Community
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

export default Apply;