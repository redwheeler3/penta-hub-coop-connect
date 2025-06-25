
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Penta Housing Co-Op</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded on principles of cooperation, sustainability, and community, Penta Housing Co-Op 
            represents a new way of living together in harmony.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Penta Housing Co-Op was established with a vision to create an inclusive, sustainable 
              community where residents share resources, responsibilities, and experiences. Our 
              cooperative model ensures that housing remains affordable while fostering deep 
              connections between neighbors.
            </p>
            <p className="text-gray-600 mb-6">
              We believe that housing is a human right and that communities thrive when people 
              work together towards common goals. Our residents come from diverse backgrounds 
              but share values of cooperation, environmental stewardship, and mutual support.
            </p>
            <Link to="/apply">
              <Button className="bg-green-600 hover:bg-green-700">
                Join Our Community
              </Button>
            </Link>
          </div>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-6 w-6 text-green-600 mr-2" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Users className="h-5 w-5 text-green-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Community First</h4>
                  <p className="text-sm text-gray-600">We prioritize collective well-being and shared decision-making</p>
                </div>
              </div>
              <div className="flex items-start">
                <Leaf className="h-5 w-5 text-green-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Environmental Responsibility</h4>
                  <p className="text-sm text-gray-600">Sustainable practices and eco-friendly living are core to our mission</p>
                </div>
              </div>
              <div className="flex items-start">
                <Home className="h-5 w-5 text-green-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Affordable Housing</h4>
                  <p className="text-sm text-gray-600">Quality housing should be accessible to everyone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply</h3>
              <p className="text-gray-600">Submit your application and participate in our community interview process</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Join</h3>
              <p className="text-gray-600">Become a member-owner and participate in cooperative governance</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Thrive</h3>
              <p className="text-gray-600">Enjoy community living while contributing to our shared vision</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
