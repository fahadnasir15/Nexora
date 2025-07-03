"use client";

import { useState } from "react";
import { 
  Search,
  Grid3X3,
  List,
  Filter,
  Download,
  Upload,
  History,
  FileText,
  Zap,
  Star,
  Clock,
  Trash2,
  FolderOpen,
  File,
  Image,
  Video,
  Music,
  Code,
  Database,
  Settings,
  Plus,
  Eye,
  Heart,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LibraryPageProps {
  onFeatureSelect: (feature: string) => void;
  onPageSelect: (page: string) => void;
}

const aiTools = [
  { id: "chat", name: "Smart Chat", icon: Zap, category: "Core", usage: 1250, favorite: true },
  { id: "code", name: "Code Generator", icon: Code, category: "Development", usage: 890, favorite: true },
  { id: "image", name: "Image Creator", icon: Image, category: "Creative", usage: 456, favorite: false },
  { id: "video", name: "Video Generator", icon: Video, category: "Creative", usage: 234, favorite: true },
  { id: "music", name: "Music Composer", icon: Music, category: "Creative", usage: 123, favorite: false },
  { id: "analysis", name: "Data Analyst", icon: Database, category: "Productivity", usage: 678, favorite: false },
];

const templates = [
  { id: "1", name: "Business Plan Template", category: "Business", downloads: 2.1, rating: 4.8 },
  { id: "2", name: "Website Wireframe", category: "Design", downloads: 1.8, rating: 4.9 },
  { id: "3", name: "Python Script Boilerplate", category: "Code", downloads: 3.2, rating: 4.7 },
  { id: "4", name: "Marketing Strategy", category: "Marketing", downloads: 1.5, rating: 4.6 },
  { id: "5", name: "Data Analysis Report", category: "Analytics", downloads: 2.8, rating: 4.8 },
];

const myFiles = [
  { id: "1", name: "Project Proposal.pdf", type: "pdf", size: "2.4 MB", date: "2 hours ago" },
  { id: "2", name: "Logo Design.png", type: "image", size: "856 KB", date: "1 day ago" },
  { id: "3", name: "Marketing Video.mp4", type: "video", size: "45.2 MB", date: "3 days ago" },
  { id: "4", name: "Financial Analysis.xlsx", type: "spreadsheet", size: "1.2 MB", date: "1 week ago" },
];

const recentHistory = [
  { id: "1", action: "Generated code for React component", tool: "Code Generator", time: "5 minutes ago" },
  { id: "2", action: "Created business plan outline", tool: "Smart Chat", time: "1 hour ago" },
  { id: "3", action: "Analyzed sales data trends", tool: "Data Analyst", time: "3 hours ago" },
  { id: "4", action: "Designed logo concepts", tool: "Image Creator", time: "1 day ago" },
];

export default function LibraryPage({ onFeatureSelect, onPageSelect }: LibraryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return FileText;
      case "image": return Image;
      case "video": return Video;
      case "spreadsheet": return Database;
      default: return File;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Library</h1>
            <p className="text-muted-foreground">Manage your AI tools, files, and templates</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools, files, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="tools" className="h-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md mb-6">
            <TabsTrigger value="tools">AI Tools</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="files">My Files</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {aiTools.map((tool) => (
                <Card key={tool.id} className="group hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <tool.icon className="h-8 w-8 text-primary" />
                      <div className="flex items-center gap-1">
                        {tool.favorite && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">{tool.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {tool.usage.toLocaleString()} uses
                      </span>
                      <Button
                        size="sm"
                        onClick={() => {
                          onFeatureSelect(tool.id);
                          onPageSelect("chat");
                        }}
                      >
                        Launch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="group hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {template.downloads}k downloads
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="files" className="h-full">
            <div className="space-y-3">
              {myFiles.map((file) => {
                const IconComponent = getFileIcon(file.type);
                return (
                  <Card key={file.id} className="group hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-medium">{file.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{file.size}</span>
                              <span>{file.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="h-full">
            <div className="space-y-3">
              {recentHistory.map((item) => (
                <Card key={item.id} className="group hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">{item.action}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{item.tool}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Repeat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}