
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, FileText, Calendar, Download, Upload } from "lucide-react";

interface StoredFile {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  category: "minutes" | "financial" | "maintenance" | "other";
}

const FileStorage = () => {
  const [files, setFiles] = useState<StoredFile[]>([
    {
      id: 1,
      name: "Board Meeting Minutes - December 2024",
      type: "PDF",
      uploadDate: "2024-12-15",
      size: "245 KB",
      category: "minutes"
    },
    {
      id: 2,
      name: "Annual Budget Report 2024",
      type: "PDF",
      uploadDate: "2024-12-01",
      size: "1.2 MB",
      category: "financial"
    },
    {
      id: 3,
      name: "Maintenance Schedule Q4",
      type: "Excel",
      uploadDate: "2024-11-28",
      size: "67 KB",
      category: "maintenance"
    },
    {
      id: 4,
      name: "House Rules Updated",
      type: "Word",
      uploadDate: "2024-11-15",
      size: "123 KB",
      category: "other"
    },
    {
      id: 5,
      name: "November Meeting Minutes",
      type: "PDF",
      uploadDate: "2024-11-10",
      size: "198 KB",
      category: "minutes"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = () => {
    toast({
      title: "Upload Feature",
      description: "File upload functionality would be implemented with proper backend integration.",
    });
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "minutes": return "bg-blue-100 text-blue-800";
      case "financial": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-orange-100 text-orange-800";
      case "other": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "minutes": return "Meeting Minutes";
      case "financial": return "Financial";
      case "maintenance": return "Maintenance";
      case "other": return "Other";
      default: return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">File Storage</h3>
          <p className="text-gray-600">Access and manage co-op documents and files</p>
        </div>
        <Button onClick={handleFileUpload} className="bg-green-600 hover:bg-green-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="minutes">Meeting Minutes</option>
                <option value="financial">Financial</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      <div className="grid gap-4">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-start space-x-4">
                  <FileText className="h-8 w-8 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{file.name}</h4>
                    <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {file.uploadDate}
                      </span>
                      <span>{file.size}</span>
                      <span>{file.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getCategoryColor(file.category)}>
                    {getCategoryLabel(file.category)}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(file.name)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No files found</h4>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FileStorage;
