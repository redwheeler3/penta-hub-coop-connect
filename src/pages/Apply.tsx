import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Mail, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Apply = () => {
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const { toast } = useToast();

  const handleGoogleFormClick = () => {
    // Open Google Form in new tab
    window.open("https://applications.pentacoop.com/", "_blank");
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
                  
                  <div className="text-center">
                    <Button 
                      onClick={() => window.open("https://mailinglist.pentacoop.com/", "_blank")}
                      className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Subscribe for Updates
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      Opens in a new tab
                    </p>
                  </div>
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
                  No units are currently available. Applications typically open every 2 or 3 years.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Get Notified</h3>
                  <p className="text-gray-600 mb-4">
                    Join our mailing list to be the first to know when applications open again
                  </p>
                  
                  <div className="text-center">
                    <Button 
                      onClick={() => window.open("https://mailinglist.pentacoop.com/", "_blank")}
                      className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Subscribe for Updates
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      Opens in a new tab
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Application Process</h3>
                  <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">1</div>
                      <h4 className="font-medium mb-1">Subscribe</h4>
                      <p className="text-gray-600">Join our mailing list</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">2</div>
                      <h4 className="font-medium mb-1">Apply</h4>
                      <p className="text-gray-600">Submit application</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">3</div>
                      <h4 className="font-medium mb-1">Interview</h4>
                      <p className="text-gray-600">Community interview</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">4</div>
                      <h4 className="font-medium mb-1">Move In</h4>
                      <p className="text-gray-600">Welcome home!</p>
                    </div>
                  </div>
                  <div className="text-center">
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