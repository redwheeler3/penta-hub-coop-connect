
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";

interface Application {
  id: string;
  timestamp: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  // Family Information
  maritalStatus: string;
  familySize: number;
  familyComposition: string;
  children: string;
  pets: string;
  // Housing Requirements
  unitSize: string;
  moveInDate: string;
  housingHistory: string;
  // Financial Information
  employment: string;
  income: number;
  financialDocuments: string;
  creditCheck: string;
  ownsRealEstate: string;
  // References
  personalReferences: string;
  landlordReferences: string;
  // Additional Information
  experience: string;
  interests: string;
  contribution: string;
  motivation: string;
  timeCommitment: string;
  communityValues: string;
  // Agreement
  backgroundCheck: boolean;
  termsAgreed: boolean;
}

// Mock data for demonstration
const mockApplications: Application[] = [
  {
    id: "1",
    timestamp: "2024-01-15 10:30:00",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-03-15",
    maritalStatus: "married",
    familySize: 3,
    familyComposition: "2 adults, 1 child",
    children: "1 child, age 8",
    pets: "1 cat",
    unitSize: "2-bedroom",
    moveInDate: "2024-04-01",
    housingHistory: "Currently renting in Vancouver",
    employment: "Teacher at local elementary school",
    income: 65000,
    financialDocuments: "Pay stubs and tax returns uploaded",
    creditCheck: "Authorized",
    ownsRealEstate: "no",
    personalReferences: "3 references provided",
    landlordReferences: "Current landlord reference provided",
    experience: "No prior co-op experience",
    interests: "Gardening, community events",
    contribution: "Event planning and garden maintenance",
    motivation: "Seeking affordable housing and community connection",
    timeCommitment: "5 hours per month",
    communityValues: "Sustainability and mutual support",
    backgroundCheck: true,
    termsAgreed: true
  },
  {
    id: "2",
    timestamp: "2024-01-16 14:20:00",
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@email.com",
    phone: "(555) 987-6543",
    dateOfBirth: "1990-07-22",
    maritalStatus: "single",
    familySize: 1,
    familyComposition: "1 adult",
    children: "None",
    pets: "None",
    unitSize: "1-bedroom",
    moveInDate: "2024-05-15",
    housingHistory: "Living with roommates",
    employment: "Software developer",
    income: 85000,
    financialDocuments: "Employment letter and bank statements",
    creditCheck: "Authorized",
    ownsRealEstate: "yes",
    personalReferences: "2 references provided",
    landlordReferences: "Previous landlord reference",
    experience: "Lived in student co-op during university",
    interests: "Technology, hiking, cooking",
    contribution: "IT support and website maintenance",
    motivation: "Interested in sustainable living",
    timeCommitment: "3 hours per month",
    communityValues: "Environmental responsibility",
    backgroundCheck: true,
    termsAgreed: true
  }
];

const AdminDashboard = () => {
  const [applications] = useState<Application[]>(mockApplications);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>(mockApplications);
  const [filters, setFilters] = useState({
    minIncome: "",
    maxIncome: "",
    familySize: "all",
    ownsRealEstate: "all",
    unitSize: "all"
  });

  const applyFilters = () => {
    let filtered = applications;

    if (filters.minIncome) {
      filtered = filtered.filter(app => app.income >= parseInt(filters.minIncome));
    }
    if (filters.maxIncome) {
      filtered = filtered.filter(app => app.income <= parseInt(filters.maxIncome));
    }
    if (filters.familySize !== "all") {
      filtered = filtered.filter(app => app.familySize === parseInt(filters.familySize));
    }
    if (filters.ownsRealEstate !== "all") {
      filtered = filtered.filter(app => app.ownsRealEstate === filters.ownsRealEstate);
    }
    if (filters.unitSize !== "all") {
      filtered = filtered.filter(app => app.unitSize === filters.unitSize);
    }

    setFilteredApplications(filtered);
  };

  const clearFilters = () => {
    setFilters({
      minIncome: "",
      maxIncome: "",
      familySize: "all",
      ownsRealEstate: "all",
      unitSize: "all"
    });
    setFilteredApplications(applications);
  };

  const exportToCSV = () => {
    const headers = [
      "ID", "Timestamp", "First Name", "Last Name", "Email", "Phone", "Date of Birth",
      "Marital Status", "Family Size", "Family Composition", "Children", "Pets",
      "Unit Size", "Move In Date", "Housing History", "Employment", "Income",
      "Financial Documents", "Credit Check", "Owns Real Estate", "Personal References",
      "Landlord References", "Co-op Experience", "Interests", "Contribution",
      "Motivation", "Time Commitment", "Community Values", "Background Check", "Terms Agreed"
    ];

    const csvContent = [
      headers.join(","),
      ...filteredApplications.map(app => [
        app.id, app.timestamp, app.firstName, app.lastName, app.email, app.phone, app.dateOfBirth,
        app.maritalStatus, app.familySize, `"${app.familyComposition}"`, `"${app.children}"`, `"${app.pets}"`,
        app.unitSize, app.moveInDate, `"${app.housingHistory}"`, `"${app.employment}"`, app.income,
        `"${app.financialDocuments}"`, app.creditCheck, app.ownsRealEstate, `"${app.personalReferences}"`,
        `"${app.landlordReferences}"`, `"${app.experience}"`, `"${app.interests}"`, `"${app.contribution}"`,
        `"${app.motivation}"`, `"${app.timeCommitment}"`, `"${app.communityValues}"`, app.backgroundCheck, app.termsAgreed
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "penta-coop-applications.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Applications Dashboard
            <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700">
              <FileText className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div>
              <Label htmlFor="minIncome">Min Income</Label>
              <Input
                id="minIncome"
                placeholder="e.g. 50000"
                value={filters.minIncome}
                onChange={(e) => setFilters({...filters, minIncome: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="maxIncome">Max Income</Label>
              <Input
                id="maxIncome"
                placeholder="e.g. 100000"
                value={filters.maxIncome}
                onChange={(e) => setFilters({...filters, maxIncome: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="familySize">Family Size</Label>
              <Select value={filters.familySize} onValueChange={(value) => setFilters({...filters, familySize: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any size</SelectItem>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3">3 people</SelectItem>
                  <SelectItem value="4">4+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ownsRealEstate">Owns Real Estate</Label>
              <Select value={filters.ownsRealEstate} onValueChange={(value) => setFilters({...filters, ownsRealEstate: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="unitSize">Unit Size</Label>
              <Select value={filters.unitSize} onValueChange={(value) => setFilters({...filters, unitSize: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any size</SelectItem>
                  <SelectItem value="1-bedroom">1 bedroom</SelectItem>
                  <SelectItem value="2-bedroom">2 bedroom</SelectItem>
                  <SelectItem value="3-bedroom">3 bedroom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2 mb-6">
            <Button onClick={applyFilters} variant="outline">Apply Filters</Button>
            <Button onClick={clearFilters} variant="ghost">Clear Filters</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Family Size</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Unit Size</TableHead>
                  <TableHead>Owns Real Estate</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.firstName} {app.lastName}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.familySize} ({app.familyComposition})</TableCell>
                    <TableCell>${app.income.toLocaleString()}</TableCell>
                    <TableCell>{app.unitSize}</TableCell>
                    <TableCell>{app.ownsRealEstate === 'yes' ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{new Date(app.timestamp).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
