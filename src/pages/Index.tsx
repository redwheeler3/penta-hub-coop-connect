
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  const BASE_URL = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section
        className="relative py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${BASE_URL}lovable-uploads/87aa916d-6a62-4e0c-99b6-19ac74c367c4.png')`,
        }}
      >
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            Welcome to Penta Housing Co-Op
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A vibrant community where neighbors become family. Experience cooperative living 
            that combines affordability, sustainability, and genuine connection.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/about">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Learn More
              </Button>
            </Link>
            <Link to="/apply">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Images Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Beautiful Community
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={`${BASE_URL}lovable-uploads/72d0c5b6-c32f-4cd3-8128-d02007d26597.png`} 
                alt="Peaceful garden courtyard with mature trees and natural wood buildings" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={`${BASE_URL}lovable-uploads/80c8891c-d9d6-49ec-a7b8-b8418d8c820c.png`} 
                alt="Community playground and shared outdoor spaces with basketball hoop" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Penta Housing Co-Op?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Community Living</CardTitle>
                <CardDescription>
                  Build lasting friendships and share experiences with like-minded neighbors in our family-friendly environment
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Home className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Affordable Housing</CardTitle>
                <CardDescription>
                  Enjoy quality housing at below-market rates through cooperative ownership near beautiful Jericho Beach
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Shared Resources</CardTitle>
                <CardDescription>
                  Access shared spaces, tools, playground, and green areas that enhance your living experience
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Join Our Community - Combined Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">How to Join Our Community</h3>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">1</div>
              <h4 className="font-semibold">Subscribe</h4>
              <p className="text-sm text-gray-600">Join our mailing list to get notified when units become available</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">2</div>
              <h4 className="font-semibold">Apply</h4>
              <p className="text-sm text-gray-600">Submit your application when a suitable unit opens up</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">3</div>
              <h4 className="font-semibold">Interview</h4>
              <p className="text-sm text-gray-600">If selected, participate in our community interview process</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">4</div>
              <h4 className="font-semibold">Move In</h4>
              <p className="text-sm text-gray-600">Welcome home! Join our thriving cooperative community</p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Application Process Details</h4>
            <div className="text-left max-w-3xl mx-auto space-y-3 text-sm text-gray-700">
              <p><strong>Application Review:</strong> We keep applications on file for one year and automatically review them when new units become available.</p>
              <p><strong>Reapplication:</strong> If you already have an application on file and subscribe to our mailing list, you can submit a new application when spaces open if you prefer.</p>
              <p><strong>Mailing List:</strong> After one year, applications are removed, but you can rejoin our mailing list to be notified of future openings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Take the first step toward cooperative living. Submit your application today and become part of our vibrant community.
          </p>
          <Link to="/apply">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Start Your Application
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Index;
