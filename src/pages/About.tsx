
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

        {/* Location Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Location</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Near Jericho Beach</h3>
                <p className="text-gray-600 mb-4">
                  Penta Housing Co-Op is nestled in Vancouver's prestigious Point Grey neighborhood, 
                  just steps away from the beautiful Jericho Beach. This prime location offers 
                  residents the perfect blend of urban convenience and natural tranquility.
                </p>
                <p className="text-gray-600 mb-4">
                  Jericho Beach is one of Vancouver's most beloved destinations, featuring stunning 
                  views of the North Shore mountains and downtown skyline. The large Jericho Park 
                  provides a peaceful buffer from city noise while maintaining easy access to all 
                  urban amenities.
                </p>
                <p className="text-gray-600">
                  Our residents enjoy year-round access to beach activities including kayaking, 
                  sailing, and windsurfing, with equipment rentals available nearby. The area's 
                  natural beauty and recreational opportunities make it an ideal setting for 
                  community living.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Neighborhood Highlights</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Walking distance to Jericho Beach and English Bay
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Close to UBC campus and transit connections
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Access to parks, trails, and recreational facilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Nearby shopping at West 4th Avenue and Broadway
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Family-friendly community with excellent schools
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Stunning views of mountains and ocean
                  </li>
                </ul>
              </div>
            </div>
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
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Cooperative Housing Federation of Canada
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
