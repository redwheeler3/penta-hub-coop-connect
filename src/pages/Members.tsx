
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, MessageSquare, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";

const Members = () => {
  const memberResources = [
    {
      title: "Bylaws & Policies",
      description: "Access the co-op's bylaws, policies, and governing documents",
      icon: FileText,
      link: "https://drive.google.com/drive/folders/1O2zb24edHeVHKLkTu5lSM0MthMccnLPF?usp=drive_link",
      external: true
    },
    {
      title: "Meeting Minutes",
      description: "View minutes from board meetings and annual general meetings",
      icon: FileText,
      link: "https://drive.google.com/drive/folders/1kyVTEUvDEYy4XcnayWsV2KisZ44CRXgE?usp=drive_link", 
      external: true
    },
    {
      title: "Management Reports",
      description: "Reports provided by our management company",
      icon: FileText,
      link: "https://drive.google.com/drive/folders/16Bjujq-0VlEEJCqToI52RMbnJ5cuglc7?usp=drive_link",
      external: true
    },
    {
      title: "Maintenance",
      description: "Guidelines for member maintenance responsibilities",
      icon: Users,
      link: "https://drive.google.com/file/d/1rrVl4VSP6l_aYXTpOXV2BHY3TA55Qrhk/view?usp=drive_link",
      external: true
    },
    {
      title: "Community Forum",
      description: "Join discussions with other members on Discord",
      icon: MessageSquare,
      link: "https://discord.gg/penta-coop",
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
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
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
              <CardContent>
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Access Resource
                  </a>
                </Button>
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
                For technical support with the website:
              </p>
              <p className="text-sm text-gray-500">Contact Jeff Oriecuia (members have contact details)</p>
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
