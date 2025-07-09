
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import MembersDashboard from "@/components/MembersDashboard";

const Members = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { toast } = useToast();

  // Demo credentials - in a real app, this would be handled by a proper auth system
  const demoCredentials = [
    { username: "member1", password: "demo123" },
    { username: "member2", password: "demo456" },
    { username: "admin", password: "admin123" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = demoCredentials.some(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (isValid) {
      setIsAuthenticated(true);
      setCurrentUser(credentials.username);
      toast({
        title: "Welcome!",
        description: "Successfully logged into the members area.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Try: member1/demo123",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated) {
    return <MembersDashboard currentUser={currentUser} onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Members Area</CardTitle>
            <CardDescription>
              Please log in to access member resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Log In
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-semibold mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>member1 / demo123</div>
                <div>member2 / demo456</div>
                <div>admin / admin123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Members;
