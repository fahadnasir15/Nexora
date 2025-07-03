"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles,
  Zap,
  Cpu,
  Globe,
  Mic,
  Video,
  FileText,
  Image,
  Code,
  BarChart,
  TrendingUp,
  Flame,
  Star,
  Lightbulb,
  Rocket,
  Beaker,
  GraduationCap,
  Terminal,
  Palette,
  Music,
  Film,
  Megaphone,
  Shield,
  Box,
  Cloud,
  Smartphone,
  Monitor,
  Eye,
  Puzzle,
  Key,
  MessageSquare,
  Smile,
  Heart,
  DollarSign,
  Trophy,
  Gift,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Settings,
  Plus,
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  MapPin,
  Camera,
  QrCode,
  Languages,
  Scale,
  Presentation,
  Calculator,
  BookOpen,
  Newspaper,
  Search,
  Tag,
  Link,
  Share,
  Upload,
  Download,
  FolderOpen,
  Archive,
  Trash,
  Edit,
  Copy,
  Printer,
  Mail,
  Phone,
  MessageCircle,
  Wifi,
  Bell,
  User,
  ShoppingCart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdvancedFeaturesProps {
  onFeatureSelect: (feature: string) => void;
}

const trendingFeatures = [
  {
    id: "multimodal",
    name: "Multimodal AI",
    description: "Text, image, audio, video understanding",
    icon: Box,
    color: "from-blue-500 to-purple-500",
    badge: "Advanced",
    category: "Core AI",
    trending: true,
    new: true
  },
  {
    id: "reasoning",
    name: "Advanced Reasoning",
    description: "Chain-of-thought, step-by-step analysis",
    icon: Cpu,
    color: "from-green-500 to-blue-500",
    badge: "Logic Engine",
    category: "Intelligence",
    trending: true,
    new: true
  },
  {
    id: "realtime",
    name: "Real-time AI",
    description: "Live conversation, instant responses",
    icon: Zap,
    color: "from-yellow-500 to-red-500",
    badge: "Instant",
    category: "Communication",
    trending: true,
    new: false
  },
  {
    id: "vision",
    name: "Computer Vision",
    description: "Image analysis, object detection, OCR",
    icon: Eye,
    color: "from-purple-500 to-pink-500",
    badge: "Vision Pro",
    category: "Vision",
    trending: true,
    new: false
  },
  {
    id: "coding",
    name: "Code Generation",
    description: "Full-stack development, debugging",
    icon: Code,
    color: "from-indigo-500 to-cyan-500",
    badge: "DevAI",
    category: "Development",
    trending: true,
    new: false
  },
  {
    id: "agents",
    name: "AI Agents",
    description: "Autonomous task completion",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    badge: "AutoAI",
    category: "Automation",
    trending: true,
    new: false
  },
  {
    id: "web-search",
    name: "Web Search",
    description: "Real-time internet information",
    icon: Globe,
    color: "from-emerald-500 to-teal-500",
    badge: "Live Search",
    category: "Search",
    trending: true,
    new: false
  },
  {
    id: "memory",
    name: "Persistent Memory",
    description: "Long-term conversation context",
    icon: Archive,
    color: "from-violet-500 to-purple-500",
    badge: "Memory Bank",
    category: "Memory",
    trending: true,
    new: false
  },
  {
    id: "voice-clone",
    name: "Voice Cloning",
    description: "Custom voice synthesis",
    icon: Mic,
    color: "from-pink-500 to-rose-500",
    badge: "Voice AI",
    category: "Audio",
    trending: true,
    new: true
  },
  {
    id: "video-gen",
    name: "Video Generation",
    description: "AI-powered video creation",
    icon: Video,
    color: "from-red-500 to-orange-500",
    badge: "VideoAI",
    category: "Video",
    trending: true,
    new: true
  },
  {
    id: "music-gen",
    name: "Music Generation",
    description: "AI composer and sound designer",
    icon: Music,
    color: "from-cyan-500 to-blue-500",
    badge: "MusicAI",
    category: "Audio",
    trending: true,
    new: true
  },
  {
    id: "3d-models",
    name: "3D Generation",
    description: "3D models from text/images",
    icon: Box,
    color: "from-lime-500 to-green-500",
    badge: "3D Pro",
    category: "3D",
    trending: true,
    new: true
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Advanced analytics and insights",
    icon: BarChart,
    color: "from-teal-500 to-cyan-500",
    badge: "Analytics",
    category: "Analytics",
    trending: false,
    new: false
  },
  {
    id: "translation",
    name: "Neural Translation",
    description: "100+ languages, real-time",
    icon: Languages,
    color: "from-rose-500 to-pink-500",
    badge: "Universal",
    category: "Language",
    trending: false,
    new: false
  },
  {
    id: "presentation",
    name: "Presentation AI",
    description: "Auto-generate slides and content",
    icon: Presentation,
    color: "from-amber-500 to-orange-500",
    badge: "SlideAI",
    category: "Productivity",
    trending: false,
    new: false
  },
  {
    id: "pdf-chat",
    name: "Document Chat",
    description: "Chat with PDFs, analyze docs",
    icon: FileText,
    color: "from-slate-500 to-gray-500",
    badge: "DocAI",
    category: "Documents",
    trending: false,
    new: false
  },
  {
    id: "workflow",
    name: "Workflow Automation",
    description: "Custom AI workflows and pipelines",
    icon: Settings,
    color: "from-neutral-500 to-stone-500",
    badge: "AutoFlow",
    category: "Automation",
    trending: false,
    new: false
  },
  {
    id: "crypto",
    name: "Crypto Analysis",
    description: "Market analysis and trading insights",
    icon: DollarSign,
    color: "from-yellow-500 to-amber-500",
    badge: "CryptoAI",
    category: "Finance",
    trending: false,
    new: false
  },
  {
    id: "fitness",
    name: "Fitness AI",
    description: "Personalized workout and nutrition",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    badge: "FitAI",
    category: "Wellness",
    trending: false,
    new: false
  },
  {
    id: "legal",
    name: "Legal Assistant",
    description: "Legal research and document review",
    icon: Scale,
    color: "from-indigo-500 to-blue-500",
    badge: "LegalAI",
    category: "Legal",
    trending: false,
    new: false
  },
  {
    id: "social",
    name: "Social Media AI",
    description: "Content creation and management",
    icon: Megaphone,
    color: "from-pink-500 to-purple-500",
    badge: "SocialAI",
    category: "Marketing",
    trending: false,
    new: false
  },
  {
    id: "ecommerce",
    name: "E-commerce AI",
    description: "Product descriptions, pricing",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    badge: "ShopAI",
    category: "Business",
    trending: false,
    new: false
  },
  {
    id: "education",
    name: "Education AI",
    description: "Personalized learning and tutoring",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-500",
    badge: "EduAI",
    category: "Education",
    trending: false,
    new: false
  },
  {
    id: "gaming",
    name: "Gaming AI",
    description: "Game development and NPCs",
    icon: Puzzle,
    color: "from-purple-500 to-violet-500",
    badge: "GameAI",
    category: "Gaming",
    trending: false,
    new: false
  }
];

export default function NexoraAdvancedFeatures({ onFeatureSelect }: AdvancedFeaturesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const categories = [
    "all",
    "Core AI",
    "Intelligence", 
    "Communication",
    "Vision",
    "Development",
    "Automation",
    "Search",
    "Memory",
    "Audio",
    "Video",
    "3D",
    "Analytics",
    "Language",
    "Productivity",
    "Documents",
    "Finance",
    "Wellness",
    "Legal",
    "Marketing",
    "Business",
    "Education",
    "Gaming"
  ];

  const filteredFeatures = trendingFeatures.filter(feature => {
    if (selectedCategory !== "all" && feature.category !== selectedCategory) return false;
    if (showTrendingOnly && !feature.trending) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background nexora-pattern">
      <div className="nexora-container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold nexora-text-gradient mb-4">
            Advanced AI Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore cutting-edge AI capabilities that rival ChatGPT, DeepSeek, Grok, and other leading platforms
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <Button
                variant={showTrendingOnly ? "default" : "outline"}
                onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                className="flex items-center space-x-2"
              >
                <Flame className="h-4 w-4" />
                <span>Trending</span>
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => onFeatureSelect(feature.id)}
            >
              <Card className="nexora-card h-full relative overflow-hidden group hover:nexora-glow transition-all duration-300">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  {feature.new && (
                    <Badge className="bg-green-500 text-white text-xs">NEW</Badge>
                  )}
                  {feature.trending && (
                    <Badge className="bg-orange-500 text-white text-xs">🔥</Badge>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold truncate">
                        {feature.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {feature.badge}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {feature.category}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFeatureSelect(feature.id);
                      }}
                    >
                      Try Now →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="nexora-card max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Rocket className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  More Features Coming Soon
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                We're constantly adding new AI capabilities to stay ahead of the competition.
                Follow our development and suggest new features!
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Request Feature
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Get Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}