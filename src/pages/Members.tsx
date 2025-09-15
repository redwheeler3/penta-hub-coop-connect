
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Users, MessageSquare, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";

const Members = () => {
  const memberResources = [
    {
      title: "File Repository",
      description: "Access all co-op documents, bylaws, policies, and records",
      icon: FileText,
      links: [
        { text: "Browse All Files", url: "https://files.pentacoop.com" },
        { text: "Bylaws & Policies", url: "https://drive.google.com/drive/folders/1O2zb24edHeVHKLkTu5lSM0MthMccnLPF?usp=drive_link" },
        { text: "Meeting Minutes", url: "https://drive.google.com/drive/folders/1kyVTEUvDEYy4XcnayWsV2KisZ44CRXgE?usp=drive_link" },
        { text: "Management Reports", url: "https://drive.google.com/drive/folders/16Bjujq-0VlEEJCqToI52RMbnJ5cuglc7?usp=drive_link" }
      ],
      external: true
    },
    {
      title: "Community Forum",
      description: "Join discussions with other members on Discord",
      icon: MessageSquare,
      links: [
        { text: "Sign Up", url: "https://discord.gg/yJRGzyCT5B" },
        { text: "Join Discussion", url: "https://discord.com/channels/1415940719276855380/1415940719813595220" }
      ],
      external: true
    },
    {
      title: "Maintenance", 
      description: "Read guidelines and communicate with the maintenance committee",
      icon: Users,
      links: [
        { text: "Guidelines Document", url: "https://drive.google.com/file/d/1rrVl4VSP6l_aYXTpOXV2BHY3TA55Qrhk/view?usp=drive_link" },
        { text: "Maintenance Forum", url: "https://discord.com/channels/1415940719276855380/1416571930835681384" }
      ],
      external: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Members Area</h1>
          <p className="text-lg text-gray-600">
            Access member resources, documents, and community discussions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberResources.map((resource, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <resource.icon className="h-6 w-6 text-green-600 mr-3" />
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  {resource.external && (
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  )}
                </div>
                <CardDescription>
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-2">
                  {resource.links.map((link, linkIndex) => (
                    <Button 
                      key={linkIndex}
                      asChild 
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {link.text}
                      </a>
                    </Button>
                  ))}
                </div>
                {resource.title === "Maintenance" && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                    <strong>Note:</strong> You must sign up for the Community Forum first before accessing the Maintenance Forum.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Technical Assistance</h3>
              <p className="text-gray-600 mb-2">
                Contact for access requests to Google Drive or Discord, and website, Google Drive, or Discord technical support:
              </p>
              <p className="text-sm mb-4"><strong>Email:</strong> <a href="mailto:techsupport@pentacoop.com" className="text-green-600 hover:underline">techsupport@pentacoop.com</a></p>
              
              <Accordion type="single" collapsible className="mb-4">
                <AccordionItem value="telus-help">
                  <AccordionTrigger className="text-left font-medium text-sm">
                    TELUS Email Users: Accessing File Repository Documents
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="mb-3 p-2 bg-blue-100 rounded text-xs">
                          <strong>Follow these steps if you have a TELUS email account and get an "access denied" message when trying to view File Repository documents.</strong>
                        </div>
                        <div>
                          <strong>Step 1:</strong> Go to <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mail.google.com</a> (your TELUS email)
                        </div>
                        <div>
                          <strong>Step 2:</strong> Click your profile picture in the top right corner
                        </div>
                        <div>
                          <strong>Step 3:</strong> If you have a personal Gmail account, select it from the list
                        </div>
                        <div>
                          <strong>Step 4:</strong> If you don't see a personal account, click "Add another account"
                        </div>
                        <div>
                          <strong>Step 5:</strong> On the "Choose an account" screen, select "Use another account"
                        </div>
                        <div>
                          <strong>Step 6:</strong> Click "Create account" to make a new personal Gmail account
                        </div>
                        <div>
                          <strong>Step 7:</strong> Once signed in with your personal account, try accessing the File Repository links again
                        </div>
                        <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
                          <strong>Note:</strong> TELUS email accounts have restricted access to external shared folders. 
                          A personal Google/Gmail account is required to view the co-op documents.
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Maintenance Issues</h3>
              <div className="mb-4">
                <h4 className="font-medium text-green-700 mb-1">
                  <a href="https://www.tpmmanagement.ca" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 hover:underline">
                    TPM Real Estate Management
                  </a>
                </h4>
                <p className="text-gray-600 mb-2">Contact for all maintenance issues:</p>
                <div className="space-y-1">
                  <p className="text-sm"><strong>Phone:</strong> <a href="tel:604-736-8775" className="text-green-600 hover:underline">(604) 736-8775</a></p>
                  <p className="text-sm"><strong>Email:</strong> <a href="mailto:tpm_maintenance@tpmmanagement.ca" className="text-green-600 hover:underline">tpm_maintenance@tpmmanagement.ca</a></p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="font-medium text-red-800 mb-1">Emergency After Hours</h4>
                <p className="text-sm text-red-700 mb-1">For urgent emergencies only (evenings/weekends):</p>
                <p className="text-sm"><strong>Emergency Line:</strong> <a href="tel:604-736-1157" className="text-red-600 hover:underline">(604) 736-1157</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
