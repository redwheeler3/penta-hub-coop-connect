
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Users, FileText, LogOut, Settings } from "lucide-react";
import Navigation from "./Navigation";
import ForumSection from "./ForumSection";
import FileStorage from "./FileStorage";
import AdminDashboard from "./AdminDashboard";

interface MembersDashboardProps {
  onLogout: () => void;
}

const MembersDashboard = ({ onLogout }: MembersDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Members Dashboard</h1>
          <Button onClick={onLogout} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Home className="h-5 w-5 mr-2 text-green-600" />
                    Community News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-600 pl-3">
                      <p className="font-semibold text-sm">Annual General Meeting</p>
                      <p className="text-xs text-gray-600">March 15, 2024 at 7:00 PM</p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-3">
                      <p className="font-semibold text-sm">Garden Cleanup Day</p>
                      <p className="text-xs text-gray-600">March 22, 2024 at 10:00 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-600" />
                    Work Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Required this year:</span>
                      <span className="font-semibold">20 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Completed:</span>
                      <span className="font-semibold text-green-600">15 hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm p-2">
                      Submit Maintenance Request
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm p-2">
                      Book Common Room
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm p-2">
                      View Bylaws
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <FileStorage />
          </TabsContent>

          <TabsContent value="forum">
            <ForumSection />
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <CardDescription>
                  View, filter, and export housing applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your member profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Account settings functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MembersDashboard;
