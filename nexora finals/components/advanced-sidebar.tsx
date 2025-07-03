"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Search, 
  Library, 
  Video, 
  Sparkles,
  Plus,
  Menu,
  X,
  Settings,
  User,
  Zap,
  Code,
  Image,
  Mic,
  FileText,
  Globe,
  Brain,
  Cpu,
  Music,
  BarChart,
  Languages,
  Briefcase,
  History,
  Trash2,
  Download,
  Upload,
  Palette,
  Calculator,
  Camera,
  Gamepad2,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Database,
  Smartphone,
  Monitor,
  Headphones,
  WifiOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { v4 as uuidv4 } from 'uuid';

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  feature: string;
}

interface SidebarProps {
  activeFeature: string;
  activePage: string;
  onFeatureSelect: (feature: string) => void;
  onPageSelect: (page: string) => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
  chatHistory: Chat[];
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

const allFeatures = [
  // Core AI Features
  { id: "chat", label: "Smart Chat", icon: MessageSquare, category: "core" },
  { id: "reasoning", label: "Deep Thinking", icon: Brain, category: "core" },
  { id: "multimodal", label: "Vision & Voice", icon: Sparkles, category: "core" },
  
  // Creative Tools
  { id: "code", label: "Code Generator", icon: Code, category: "creative" },
  { id: "image", label: "Image Creator", icon: Image, category: "creative" },
  { id: "video", label: "Video Generator", icon: Video, category: "creative" },
  { id: "music", label: "Music Composer", icon: Music, category: "creative" },
  { id: "web", label: "Website Builder", icon: Globe, category: "creative" },
  { id: "design", label: "UI/UX Designer", icon: Palette, category: "creative" },
  
  // Productivity Tools
  { id: "analysis", label: "Data Analyst", icon: BarChart, category: "productivity" },
  { id: "translate", label: "Translator", icon: Languages, category: "productivity" },
  { id: "business", label: "Business Consultant", icon: Briefcase, category: "productivity" },
  { id: "writing", label: "Content Writer", icon: FileText, category: "productivity" },
  { id: "calculator", label: "Math Solver", icon: Calculator, category: "productivity" },
  { id: "calendar", label: "Schedule Planner", icon: Calendar, category: "productivity" },
  
  // Specialized Tools
  { id: "voice", label: "Voice Synthesizer", icon: Mic, category: "specialized" },
  { id: "photo", label: "Photo Editor", icon: Camera, category: "specialized" },
  { id: "game", label: "Game Developer", icon: Gamepad2, category: "specialized" },
  { id: "map", label: "Location Finder", icon: MapPin, category: "specialized" },
  { id: "security", label: "Cybersecurity", icon: Shield, category: "specialized" },
  { id: "database", label: "Database Expert", icon: Database, category: "specialized" },
  
  // Device & System
  { id: "mobile", label: "Mobile Developer", icon: Smartphone, category: "system" },
  { id: "desktop", label: "Desktop Apps", icon: Monitor, category: "system" },
  { id: "audio", label: "Audio Engineer", icon: Headphones, category: "system" },
  { id: "network", label: "Network Admin", icon: WifiOff, category: "system" }
];

const libraryItems = [
  { id: "tools", label: "AI Tools", icon: Zap },
  { id: "history", label: "Chat History", icon: History },
  { id: "templates", label: "Templates", icon: FileText },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "uploads", label: "My Files", icon: Upload },
];

export default function AdvancedSidebar({ 
  activeFeature, 
  activePage,
  onFeatureSelect, 
  onPageSelect,
  isSidebarOpen, 
  onSidebarToggle,
  chatHistory,
  onNewChat,
  onSelectChat,
  onDeleteChat
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFeatures, setFilteredFeatures] = useState(allFeatures);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFeatures(allFeatures);
    } else {
      const filtered = allFeatures.filter(feature =>
        feature.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFeatures(filtered);
    }
  }, [searchQuery]);

  const generateChatTitle = (lastMessage: string, feature: string): string => {
    const featureName = allFeatures.find(f => f.id === feature)?.label || "Chat";
    if (lastMessage.length > 30) {
      return `${featureName}: ${lastMessage.substring(0, 30)}...`;
    }
    return `${featureName}: ${lastMessage}`;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onSidebarToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        clean-sidebar fixed lg:relative z-50 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Nexora
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3">
          {/* Main Actions */}
          <div className="py-4 space-y-2">
            <Button
              onClick={onNewChat}
              className="w-full justify-start gap-3 bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Separator />

          {/* Library */}
          <div className="py-4">
            <div 
              onClick={() => onPageSelect("library")}
              className={`clean-sidebar-item ${activePage === "library" ? 'active' : ''}`}
            >
              <Library className="h-4 w-4" />
              <span>Library</span>
            </div>
          </div>

          <Separator />

          {/* AI Features */}
          <div className="py-4">
            <div className="px-2 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              AI Tools ({filteredFeatures.length})
            </div>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredFeatures.map((feature) => (
                <div
                  key={feature.id}
                  onClick={() => {
                    onFeatureSelect(feature.id);
                    onPageSelect("chat");
                    if (window.innerWidth < 1024) onSidebarToggle();
                  }}
                  className={`clean-sidebar-item ${
                    activeFeature === feature.id && activePage === "chat" ? 'active' : ''
                  }`}
                >
                  <feature.icon className="h-4 w-4" />
                  <span className="truncate">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Recent Chats */}
          <div className="py-4">
            <div className="px-2 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent Chats ({chatHistory.length})
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {chatHistory.slice(0, 10).map((chat) => (
                <div
                  key={chat.id}
                  className="group flex items-center justify-between clean-sidebar-item"
                >
                  <div 
                    className="flex items-center gap-2 flex-1 cursor-pointer"
                    onClick={() => {
                      onSelectChat(chat.id);
                      onPageSelect("chat");
                      if (window.innerWidth < 1024) onSidebarToggle();
                    }}
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{chat.title}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Bottom section */}
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <div 
              onClick={() => onPageSelect("account")}
              className={`clean-sidebar-item ${activePage === "account" ? 'active' : ''}`}
            >
              <User className="h-4 w-4" />
              <span>Account</span>
            </div>
            <div 
              onClick={() => onPageSelect("settings")}
              className={`clean-sidebar-item ${activePage === "settings" ? 'active' : ''}`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-center">
            <div className="text-emerald-500 font-medium">✅ Free Plan</div>
            <div className="text-muted-foreground">Unlimited Access</div>
          </div>
        </div>
      </div>
    </>
  );
}