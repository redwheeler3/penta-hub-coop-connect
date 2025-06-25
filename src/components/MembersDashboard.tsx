
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, LogOut, MessageSquare, FileText, Search } from "lucide-react";
import ForumSection from "@/components/ForumSection";
import FileStorage from "@/components/FileStorage";

interface MembersDashboardProps {
  onLogout: () => void;
}

const MembersDashboard = ({ onLogout }: MembersDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Members Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Penta Housing Co-Op - Members</h1>
            </div>
            <Button onClick={onLogout} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Members Area</h2>
          <p className="text-gray-600">Access member resources, participate in discussions, and manage files.</p>
        </div>

        <Tabs defaultValue="forum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forum" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Buy & Sell Forum
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              File Storage
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="space-y-6">
            <ForumSection />
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <FileStorage />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Resources</CardTitle>
                <CardDescription>Quick links and important information</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p className="text-sm text-gray-600">Emergency contacts, maintenance requests, and co-op management details.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">House Rules</h3>
                  <p className="text-sm text-gray-600">Community guidelines, quiet hours, and shared space policies.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Meeting Calendar</h3>
                  <p className="text-sm text-gray-600">Upcoming meetings, events, and community activities.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Maintenance</h3>
                  <p className="text-sm text-gray-600">Report issues, schedule requests, and track work orders.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MembersDashboard;
