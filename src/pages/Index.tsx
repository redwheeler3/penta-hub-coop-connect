
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, FileText, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Penta Housing Co-Op</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link to="/apply">
                <Button variant="ghost">Apply</Button>
              </Link>
              <Link to="/members">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Lock className="h-4 w-4 mr-2" />
                  Members Area
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Penta Housing Co-Op
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
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
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
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
                  Build lasting friendships and share experiences with like-minded neighbors
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Home className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Affordable Housing</CardTitle>
                <CardDescription>
                  Enjoy quality housing at below-market rates through cooperative ownership
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Shared Resources</CardTitle>
                <CardDescription>
                  Access shared spaces, tools, and resources that enhance your living experience
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">Penta Housing Co-Op</h4>
            <p className="text-gray-400 mb-6">Building community, one home at a time</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
