
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about Penta Housing Co-Op and the cooperative housing movement that makes 
            communities like ours possible.
          </p>
        </div>

        {/* About Penta Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Penta</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h3>
              <p className="text-gray-600 mb-4">
                Penta Housing Co-Op was established in the 1970s with a vision to create an inclusive, sustainable 
                community where residents share resources, responsibilities, and experiences. After years of planning 
                and community building, our cooperative welcomed its first residents in September 1978.
              </p>
              <p className="text-gray-600 mb-4">
                The journey began in 1974 when a group of dedicated individuals incorporated the Penta Co-operative 
                Housing Association. Through determination and community spirit, they overcame initial setbacks, 
                including a rejected rezoning application, to eventually secure and develop our current site.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we continue that legacy of cooperation, environmental stewardship, and mutual support. 
                Our residents come from diverse backgrounds but share common values that make our community thrive.
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
        </div>

        {/* About Co-op Housing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Co-op Housing</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What is Co-op Housing?</h3>
                <p className="text-gray-600 mb-4">
                  Housing cooperatives are community-based organizations that provide affordable, secure housing 
                  through member ownership and democratic governance. Unlike rental housing, co-op members have 
                  a voice in how their housing is managed and maintained.
                </p>
                <p className="text-gray-600 mb-4">
                  Co-ops operate on the principle that housing should serve people, not profit. This approach 
                  keeps costs down while ensuring long-term affordability and community stability.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of Co-op Living</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Below-market housing costs with stable, predictable fees
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Democratic control over housing decisions and policies
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Strong sense of community and mutual support
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Security of tenure and protection from displacement
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Opportunity to develop leadership and governance skills
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learn More About Co-op Housing</h3>
              <p className="text-gray-600 mb-4">
                For more information about cooperative housing in British Columbia and across Canada, 
                visit these valuable resources:
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.chf.bc.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Cooperative Housing Federation of BC
                </a>
                <a 
                  href="https://chfcanada.coop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                >
                  Cooperative Housing Federation of Canada
                </a>
              </div>
            </div>
          </div>
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
