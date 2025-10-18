import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Mail, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAnalytics } from "@/hooks/useAnalytics";
import { APP_CONFIG, FORM_FIELDS, BEDROOM_PREFERENCES, FORM_NAMES, ANALYTICS_EVENTS } from "@/config/constants";

// Move EmailSignupForm outside to prevent re-creation on every render
const EmailSignupForm = ({ 
  email, 
  setEmail, 
  bedroomPreferences, 
  handleBedroomChange, 
  handleEmailSubmit, 
  isSubmitting,
  setFormStarted,
  trackFormStart
}: {
  email: string;
  setEmail: (email: string) => void;
  bedroomPreferences: string[];
  handleBedroomChange: (bedroom: string, checked: boolean) => void;
  handleEmailSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  setFormStarted: (started: boolean) => void;
  trackFormStart: (formName: string) => void;
}) => (
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
        onFocus={() => {
          setFormStarted(true);
          trackFormStart('Email Signup');
        }}
      />
    </div>
    
    <div>
      <Label>Unit Preference</Label>
      <div className="space-y-2 mt-2">
        <div className="flex items-center space-x-3">
          <Checkbox
            id={BEDROOM_PREFERENCES.ONE_BEDROOM.id}
            checked={bedroomPreferences.includes(BEDROOM_PREFERENCES.ONE_BEDROOM.id)}
            onCheckedChange={(checked) => handleBedroomChange(BEDROOM_PREFERENCES.ONE_BEDROOM.id, checked as boolean)}
          />
          <Label htmlFor={BEDROOM_PREFERENCES.ONE_BEDROOM.id} className="font-normal">
            {BEDROOM_PREFERENCES.ONE_BEDROOM.label}
          </Label>
        </div>
        
        <div className="flex items-center space-x-3">
          <Checkbox
            id={BEDROOM_PREFERENCES.TWO_BEDROOM.id}
            checked={bedroomPreferences.includes(BEDROOM_PREFERENCES.TWO_BEDROOM.id)}
            onCheckedChange={(checked) => handleBedroomChange(BEDROOM_PREFERENCES.TWO_BEDROOM.id, checked as boolean)}
          />
          <Label htmlFor={BEDROOM_PREFERENCES.TWO_BEDROOM.id} className="font-normal">
            {BEDROOM_PREFERENCES.TWO_BEDROOM.label}
          </Label>
        </div>
        
        <div className="flex items-center space-x-3">
          <Checkbox
            id={BEDROOM_PREFERENCES.THREE_BEDROOM.id}
            checked={bedroomPreferences.includes(BEDROOM_PREFERENCES.THREE_BEDROOM.id)}
            onCheckedChange={(checked) => handleBedroomChange(BEDROOM_PREFERENCES.THREE_BEDROOM.id, checked as boolean)}
          />
          <Label htmlFor={BEDROOM_PREFERENCES.THREE_BEDROOM.id} className="font-normal">
            {BEDROOM_PREFERENCES.THREE_BEDROOM.label}
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

const Apply = () => {
  usePageTitle("Apply - Penta Housing Co-Op");
  
  const [email, setEmail] = useState("");
  const [bedroomPreferences, setBedroomPreferences] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const isSubmittingRef = useRef(false); // Prevent double-clicks and race conditions
  const { toast } = useToast();
  const { 
    trackCTA, 
    trackFormStart, 
    trackFormSubmit, 
    trackFormError, 
    trackFormAbandonment,
    trackEvent 
  } = useAnalytics();

  // Track form abandonment when user navigates away
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formStarted && email && !isSubmitting) {
        trackFormAbandonment(FORM_NAMES.EMAIL_SIGNUP);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formStarted, email, isSubmitting, trackFormAbandonment]);

  const handleGoogleFormClick = () => {
    trackCTA('Complete Application Form', 'Application Form');
    window.open(APP_CONFIG.GOOGLE_FORM_URL, "_blank");
  };

  const trackInternalNavigation = (destination: string) => {
    trackEvent(ANALYTICS_EVENTS.INTERNAL_NAVIGATION, {
      destination,
      button_location: 'Application Process Section',
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions using ref for synchronous check
    if (isSubmittingRef.current) {
      return;
    }
    
    if (!email || bedroomPreferences.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in both email and bedroom preferences",
        variant: "destructive",
      });
      
      trackFormError(FORM_NAMES.EMAIL_SIGNUP, 'Missing Information');
      return;
    }

    // Set both state and ref to prevent duplicates
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    
    try {
      trackFormSubmit(FORM_NAMES.EMAIL_SIGNUP);
      
      // Create a hidden form that submits to Google Forms
      const form = document.createElement('form');
      form.action = APP_CONFIG.GOOGLE_FORM_RESPONSE_URL;
      form.method = 'POST';
      form.target = 'hidden_iframe';
      form.style.display = 'none';
      
      // Add email field
      const emailInput = document.createElement('input');
      emailInput.name = FORM_FIELDS.EMAIL;
      emailInput.value = email;
      form.appendChild(emailInput);
      
      // Add each bedroom preference as a separate entry
      bedroomPreferences.forEach(pref => {
        const bedroomInput = document.createElement('input');
        bedroomInput.name = FORM_FIELDS.BEDROOM_PREFERENCE;
        
        // Map our internal values to Google Form's exact strings
        if (pref === BEDROOM_PREFERENCES.ONE_BEDROOM.id) {
          bedroomInput.value = BEDROOM_PREFERENCES.ONE_BEDROOM.formValue;
        } else if (pref === BEDROOM_PREFERENCES.TWO_BEDROOM.id) {
          bedroomInput.value = BEDROOM_PREFERENCES.TWO_BEDROOM.formValue;
        } else if (pref === BEDROOM_PREFERENCES.THREE_BEDROOM.id) {
          bedroomInput.value = BEDROOM_PREFERENCES.THREE_BEDROOM.formValue;
        } else {
          bedroomInput.value = pref;
        }
        
        form.appendChild(bedroomInput);
      });
      
      // Create hidden iframe if it doesn't exist
      let iframe = document.getElementById('hidden_iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Add form to document and submit
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      // Show success message after a brief delay
      setTimeout(() => {
        toast({
          title: "Thank you!",
          description: "You've been added to our mailing list",
        });
        setEmail("");
        setBedroomPreferences([]);
        setIsSubmitting(false);
        isSubmittingRef.current = false;
      }, 1000);
      
    } catch (_error) {
      trackFormError(FORM_NAMES.EMAIL_SIGNUP, 'Submission Failed');
      
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };
  
  const handleBedroomChange = (bedroom: string, checked: boolean) => {
    if (checked) {
      setBedroomPreferences([...bedroomPreferences, bedroom]);
    } else {
      setBedroomPreferences(bedroomPreferences.filter(b => b !== bedroom));
    }
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

        {APP_CONFIG.APPLICATIONS_OPEN ? (
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
                  
                  <EmailSignupForm
                    email={email}
                    setEmail={setEmail}
                    bedroomPreferences={bedroomPreferences}
                    handleBedroomChange={handleBedroomChange}
                    handleEmailSubmit={handleEmailSubmit}
                    isSubmitting={isSubmitting}
                    setFormStarted={setFormStarted}
                    trackFormStart={trackFormStart}
                  />
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
                  
                  <EmailSignupForm
                    email={email}
                    setEmail={setEmail}
                    bedroomPreferences={bedroomPreferences}
                    handleBedroomChange={handleBedroomChange}
                    handleEmailSubmit={handleEmailSubmit}
                    isSubmitting={isSubmitting}
                    setFormStarted={setFormStarted}
                    trackFormStart={trackFormStart}
                  />
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
                    <Link to="/about" onClick={() => trackInternalNavigation('About')}>
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
