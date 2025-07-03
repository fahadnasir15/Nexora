"use client";

import { useState } from "react";
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
  Paintbrush,
  Music,
  BarChart,
  Languages,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

interface CleanSidebarProps {
  activeFeature: string;
  onFeatureSelect: (feature: string) => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const mainFeatures = [
  { id: "chat", label: "New chat", icon: Plus },
  { id: "search", label: "Search chats", icon: Search },
  { id: "library", label: "Library", icon: Library },
];

const aiFeatures = [
  { id: "reasoning", label: "Deep Thinking", icon: Brain },
  { id: "multimodal", label: "Vision & Voice", icon: Sparkles },
  { id: "code", label: "Code Assistant", icon: Code },
  { id: "image", label: "Image Creator", icon: Image },
  { id: "voice", label: "Voice AI", icon: Mic },
  { id: "video", label: "Video Generator", icon: Video },
  { id: "music", label: "Music Creator", icon: Music },
  { id: "web", label: "Web Builder", icon: Globe },
  { id: "analysis", label: "Data Analysis", icon: BarChart },
  { id: "translate", label: "Translator", icon: Languages },
  { id: "business", label: "Business Tools", icon: Briefcase },
];

const mockChats = [
  "Website Design Ideas",
  "Python Data Analysis",
  "Marketing Strategy",
  "Resume Optimization",
  "Creative Writing",
  "Math Problem Solving",
];

export default function CleanSidebar({ 
  activeFeature, 
  onFeatureSelect, 
  isSidebarOpen, 
  onSidebarToggle 
}: CleanSidebarProps) {
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
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">Nexora</h1>
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

        <ScrollArea className="flex-1 px-2">
          {/* Main Features */}
          <div className="space-y-1">
            {mainFeatures.map((feature) => (
              <div
                key={feature.id}
                onClick={() => {
                  onFeatureSelect(feature.id);
                  if (window.innerWidth < 1024) onSidebarToggle();
                }}
                className={`clean-sidebar-item ${
                  activeFeature === feature.id ? 'active' : ''
                }`}
              >
                <feature.icon className="h-4 w-4" />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* AI Features */}
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              AI Features
            </div>
            {aiFeatures.map((feature) => (
              <div
                key={feature.id}
                onClick={() => {
                  onFeatureSelect(feature.id);
                  if (window.innerWidth < 1024) onSidebarToggle();
                }}
                className={`clean-sidebar-item ${
                  activeFeature === feature.id ? 'active' : ''
                }`}
              >
                <feature.icon className="h-4 w-4" />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Recent Chats */}
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent Chats
            </div>
            {mockChats.map((chat, index) => (
              <div
                key={index}
                onClick={() => {
                  onFeatureSelect("chat");
                  if (window.innerWidth < 1024) onSidebarToggle();
                }}
                className="clean-sidebar-item"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="truncate">{chat}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom section */}
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <div className="clean-sidebar-item">
              <User className="h-4 w-4" />
              <span>Account</span>
            </div>
            <div className="clean-sidebar-item">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Free Plan • Unlimited Access
          </div>
        </div>
      </div>
    </>
  );
}