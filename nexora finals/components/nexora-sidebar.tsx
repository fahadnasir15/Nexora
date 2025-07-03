"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChatBubbleLeftIcon, 
  CommandLineIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  MicrophoneIcon,
  DocumentTextIcon,
  BoltIcon,
  CogIcon,
  PlusIcon,
  Bars3Icon,
  XMarkIcon,
  ShareIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  SparklesIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  FilmIcon,
  SpeakerWaveIcon,
  FolderIcon,
  UserIcon,
  HeartIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  BeakerIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import NexoraLogo from "./nexora-logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeFeature: string;
  onFeatureSelect: (feature: string) => void;
}

const features = [
  {
    id: "chat",
    name: "Smart Chat",
    icon: ChatBubbleLeftIcon,
    description: "Multi-turn AI conversations",
    category: "core",
    badge: "GPT-4 Level",
    color: "text-blue-400"
  },
  {
    id: "agents",
    name: "AI Agents",
    icon: BoltIcon,
    description: "Custom autonomous agents",
    category: "core", 
    badge: "AutoGPT",
    color: "text-purple-400"
  },
  {
    id: "code",
    name: "Code Assistant",
    icon: CodeBracketIcon,
    description: "AI-powered coding help",
    category: "developer",
    badge: "DeepSeek",
    color: "text-green-400"
  },
  {
    id: "image",
    name: "Image Generator",
    icon: PhotoIcon,
    description: "AI image creation",
    category: "creative",
    badge: "SDXL",
    color: "text-pink-400"
  },
  {
    id: "video",
    name: "Video Creator",
    icon: VideoCameraIcon,
    description: "Text-to-video generation",
    category: "creative",
    badge: "Veo3 Style",
    color: "text-red-400"
  },
  {
    id: "voice",
    name: "Voice AI",
    icon: MicrophoneIcon,
    description: "Speech-to-text & TTS",
    category: "core",
    badge: "Whisper",
    color: "text-yellow-400"
  },
  {
    id: "files",
    name: "File Intelligence",
    icon: DocumentTextIcon,
    description: "Analyze any document",
    category: "productivity",
    badge: "RAG",
    color: "text-cyan-400"
  },
  {
    id: "web",
    name: "Web Builder",
    icon: GlobeAltIcon,
    description: "Prompt-to-website",
    category: "developer",
    badge: "Maclay Style",
    color: "text-indigo-400"
  },
  {
    id: "game",
    name: "Game Studio",
    icon: RocketLaunchIcon,
    description: "Create games with AI",
    category: "creative",
    badge: "2D/3D",
    color: "text-orange-400"
  },
  {
    id: "social",
    name: "Social Media",
    icon: ShareIcon,
    description: "Content generation",
    category: "marketing",
    badge: "Viral",
    color: "text-teal-400"
  },
  {
    id: "memory",
    name: "Memory Bank",
    icon: CpuChipIcon,
    description: "Persistent AI memory",
    category: "core",
    badge: "ChromaDB",
    color: "text-violet-400"
  },
  {
    id: "tools",
    name: "Custom Tools",
    icon: CogIcon,
    description: "Build your own plugins",
    category: "developer",
    badge: "GPT Store",
    color: "text-gray-400"
  },
  {
    id: "advanced",
    name: "Advanced Features",
    icon: SparklesIcon,
    description: "Trending AI capabilities",
    category: "core",
    badge: "🔥 Hot",
    color: "text-orange-400"
  }
];

const categories = {
  core: { name: "Core AI", icon: SparklesIcon, color: "text-blue-400" },
  creative: { name: "Creative", icon: PaintBrushIcon, color: "text-pink-400" },
  developer: { name: "Developer", icon: CommandLineIcon, color: "text-green-400" },
  productivity: { name: "Productivity", icon: AcademicCapIcon, color: "text-yellow-400" },
  marketing: { name: "Marketing", icon: FireIcon, color: "text-red-400" }
};

export default function NexoraSidebar({ isOpen, onToggle, activeFeature, onFeatureSelect }: SidebarProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  console.log("Sidebar rendered - isOpen:", isOpen, "activeFeature:", activeFeature);

  return (
    <TooltipProvider>
      <div className="relative">
        {/* Mobile overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={onToggle}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isOpen ? 0 : -280 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 nexora-glass"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <NexoraLogo size="md" />
                  <div>
                    <h1 className="text-xl font-bold nexora-text-gradient">Nexora AI</h1>
                    <p className="text-sm text-muted-foreground">Super Intelligence Platform</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="lg:hidden"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {Object.entries(categories).map(([categoryId, category]) => (
                  <div key={categoryId}>
                    <div className="flex items-center space-x-2 mb-3">
                      <category.icon className={`h-4 w-4 ${category.color}`} />
                      <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
                    </div>
                    <div className="space-y-2">
                      {features.filter(f => f.category === categoryId).map((feature) => (
                        <Tooltip key={feature.id}>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onMouseEnter={() => setHoveredFeature(feature.id)}
                              onMouseLeave={() => setHoveredFeature(null)}
                            >
                              <Button
                                variant={activeFeature === feature.id ? "default" : "ghost"}
                                className={`w-full justify-start p-3 h-auto ${
                                  activeFeature === feature.id 
                                    ? "nexora-glow bg-primary text-primary-foreground" 
                                    : "hover:bg-muted"
                                }`}
                                onClick={() => onFeatureSelect(feature.id)}
                              >
                                <div className="flex items-center space-x-3 w-full">
                                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                                  <div className="flex-1 text-left">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">{feature.name}</span>
                                      <Badge variant="secondary" className="text-xs">
                                        {feature.badge}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {feature.description}
                                    </p>
                                  </div>
                                </div>
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{feature.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>© 2024 Nexora AI</span>
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <HeartIcon className="h-4 w-4 text-red-400" />
                  <span>Free Forever</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className={`fixed top-4 ${
            isOpen ? 'left-72' : 'left-4'
          } z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg nexora-glow transition-all duration-200 lg:hidden`}
        >
          {isOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </motion.button>
      </div>
    </TooltipProvider>
  );
}