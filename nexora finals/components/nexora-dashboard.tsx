"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
  GlobeAltIcon,
  UserIcon,
  BoltIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon,
  BeakerIcon,
  StarIcon,
  HeartIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  PlusIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DashboardProps {
  activeFeature: string;
  onFeatureSelect: (feature: string) => void;
}

const quickActions = [
  { id: "chat", name: "Start Chat", icon: SparklesIcon, color: "text-blue-400" },
  { id: "image", name: "Generate Image", icon: BeakerIcon, color: "text-pink-400" },
  { id: "code", name: "Code Help", icon: CpuChipIcon, color: "text-green-400" },
  { id: "agents", name: "Create Agent", icon: BoltIcon, color: "text-purple-400" },
];

const stats = [
  { name: "Total Conversations", value: "1,234", change: "+12%", trend: "up", icon: ChartBarIcon },
  { name: "Images Generated", value: "456", change: "+8%", trend: "up", icon: BeakerIcon },
  { name: "Code Completions", value: "789", change: "+23%", trend: "up", icon: CpuChipIcon },
  { name: "Active Agents", value: "12", change: "+3%", trend: "up", icon: BoltIcon },
];

const recentActivity = [
  { id: 1, type: "chat", message: "Created a comprehensive marketing strategy", time: "2 minutes ago", status: "completed" },
  { id: 2, type: "image", message: "Generated product mockup images", time: "5 minutes ago", status: "completed" },
  { id: 3, type: "code", message: "Built React component with TypeScript", time: "8 minutes ago", status: "completed" },
  { id: 4, type: "agents", message: "Deployed content creation agent", time: "12 minutes ago", status: "running" },
  { id: 5, type: "video", message: "Processing explainer video", time: "15 minutes ago", status: "processing" },
];

const systemHealth = [
  { name: "API Response Time", value: 98, status: "excellent", color: "bg-green-500" },
  { name: "Model Accuracy", value: 96, status: "excellent", color: "bg-green-500" },
  { name: "System Uptime", value: 99.9, status: "excellent", color: "bg-green-500" },
  { name: "User Satisfaction", value: 94, status: "excellent", color: "bg-green-500" },
];

export default function NexoraDashboard({ activeFeature, onFeatureSelect }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  console.log("Dashboard rendered - activeFeature:", activeFeature);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background nexora-pattern">
      <div className="nexora-container py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold nexora-text-gradient mb-2">
                Welcome to Nexora AI
              </h1>
              <p className="text-lg text-muted-foreground">
                Your super-intelligent AI platform with unlimited possibilities
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-2xl font-mono font-bold">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <RocketLaunchIcon className="h-5 w-5" />
            <span>Quick Actions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card key={action.id} className="nexora-card hover:nexora-glow transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-0 flex-col space-y-3"
                    onClick={() => onFeatureSelect(action.id)}
                  >
                    <action.icon className={`h-8 w-8 ${action.color}`} />
                    <span className="font-medium">{action.name}</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <ChartBarIcon className="h-5 w-5" />
            <span>Usage Statistics</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.name} className="nexora-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">from last week</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="nexora-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === "completed" ? "bg-green-400" :
                          activity.status === "running" ? "bg-blue-400" :
                          "bg-yellow-400"
                        }`} />
                        <div>
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="nexora-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CpuChipIcon className="h-5 w-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className="text-sm text-muted-foreground">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <InformationCircleIcon className="h-5 w-5" />
            <span>Latest Updates</span>
          </h2>
          <div className="space-y-4">
            <Alert>
              <CheckCircleIcon className="h-4 w-4" />
              <AlertDescription>
                <strong>New Feature:</strong> Multi-agent collaboration is now available! 
                Create teams of AI agents that work together on complex tasks.
              </AlertDescription>
            </Alert>
            <Alert>
              <SparklesIcon className="h-4 w-4" />
              <AlertDescription>
                <strong>Performance Boost:</strong> Image generation is now 40% faster with improved quality.
                Try the new SDXL models in the Image Generator.
              </AlertDescription>
            </Alert>
            <Alert>
              <RocketLaunchIcon className="h-4 w-4" />
              <AlertDescription>
                <strong>Coming Soon:</strong> Voice cloning and real-time video generation features 
                are in development and will be available next month.
              </AlertDescription>
            </Alert>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <HeartIcon className="h-4 w-4 text-red-400" />
                <span className="text-sm text-muted-foreground">Made with love for creators</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">Available worldwide</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Nexora AI - Free Forever
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}