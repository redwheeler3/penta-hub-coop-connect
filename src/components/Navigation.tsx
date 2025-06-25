
import { Button } from "@/components/ui/button";
import { Home, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Home className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Penta Housing Co-Op</h1>
          </Link>
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
  );
};

export default Navigation;
