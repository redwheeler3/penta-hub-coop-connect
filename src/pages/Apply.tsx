
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Apply = () => {
  const [applicationsOpen, setApplicationsOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    motivation: "",
    experience: ""
  });
  const [emailSignup, setEmailSignup] = useState("");
  const { toast } = useToast();

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll review your application and get back to you soon.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      motivation: "",
      experience: ""
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you!",
      description: "We'll notify you when applications open again.",
    });
    setEmailSignup("");
  };

  const toggleApplicationStatus = () => {
    setApplicationsOpen(!applicationsOpen);
    toast({
      title: applicationsOpen ? "Applications Closed" : "Applications Opened",
      description: applicationsOpen ? "Now showing email signup form" : "Now showing application form",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Penta Housing Co-Op</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to be part of our community? {applicationsOpen ? "Applications are currently open!" : "Applications are currently closed, but you can join our waitlist."}
          </p>
          
          {/* Demo toggle button */}
          <Button 
            onClick={toggleApplicationStatus}
            variant="outline"
            className="mt-4 text-sm"
          >
            Demo: Toggle Application Status
          </Button>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {applicationsOpen ? "Membership Application" : "Join Our Waitlist"}
            </CardTitle>
            <CardDescription>
              {applicationsOpen 
                ? "Tell us about yourself and why you'd like to join our community."
                : "Get notified when applications open again."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applicationsOpen ? (
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="motivation">Why do you want to join Penta Housing Co-Op?</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Do you have any experience with cooperative living or community organizing?</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Submit Application
                </Button>
              </form>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email-signup">Email Address</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    value={emailSignup}
                    onChange={(e) => setEmailSignup(e.target.value)}
                    placeholder="Enter your email to get notified"
                    required
                  />
                </div>
                <p className="text-gray-600">
                  Applications are currently closed. Leave your email and we'll notify you 
                  as soon as they open again. We typically open applications quarterly.
                </p>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Join Waitlist
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apply;
