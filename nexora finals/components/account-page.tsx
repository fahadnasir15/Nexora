"use client";

import { useState } from "react";
import { 
  User,
  Mail,
  Calendar,
  Crown,
  Settings,
  CreditCard,
  Award,
  BarChart,
  Clock,
  Zap,
  Star,
  TrendingUp,
  Download,
  Share,
  Edit,
  Camera,
  Shield,
  Key,
  Bell,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AccountPageProps {
  onPageSelect: (page: string) => void;
}

const stats = [
  { label: "Total Chats", value: "1,247", icon: BarChart, trend: "+12%" },
  { label: "AI Tools Used", value: "18", icon: Zap, trend: "+3" },
  { label: "Hours Saved", value: "156", icon: Clock, trend: "+28h" },
  { label: "Projects Created", value: "89", icon: Award, trend: "+15" },
];

const achievements = [
  { id: "1", title: "Early Adopter", description: "Joined during beta phase", icon: "🚀", earned: true },
  { id: "2", title: "Power User", description: "Used 10+ AI tools", icon: "⚡", earned: true },
  { id: "3", title: "Creative Master", description: "Generated 100+ images", icon: "🎨", earned: false },
  { id: "4", title: "Code Wizard", description: "Generated 50+ code snippets", icon: "💻", earned: true },
  { id: "5", title: "Productivity Pro", description: "Saved 100+ hours", icon: "📈", earned: true },
  { id: "6", title: "AI Explorer", description: "Tried every AI feature", icon: "🔍", earned: false },
];

const recentActivity = [
  { action: "Generated React component", tool: "Code Generator", time: "2 hours ago" },
  { action: "Created business plan", tool: "Smart Chat", time: "1 day ago" },
  { action: "Designed logo concept", tool: "Image Creator", time: "2 days ago" },
  { action: "Analyzed market data", tool: "Data Analyst", time: "3 days ago" },
];

export default function AccountPage({ onPageSelect }: AccountPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    joinDate: "March 2024",
    plan: "Free Plan",
    avatar: "/avatar-placeholder.jpg"
  });

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
              <AvatarFallback className="text-lg">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{userInfo.name}</h1>
              <p className="text-muted-foreground">{userInfo.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  {userInfo.plan}
                </Badge>
                <Badge variant="secondary">
                  Member since {userInfo.joinDate}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="overview" className="h-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-500">{stat.trend}</span>
                      <span className="text-xs text-muted-foreground">this month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Usage Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>AI Chat</span>
                      <span>847/1000</span>
                    </div>
                    <Progress value={84.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Image Generation</span>
                      <span>23/50</span>
                    </div>
                    <Progress value={46} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Code Generation</span>
                      <span>156/200</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Analysis</span>
                      <span>12/25</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.filter(a => a.earned).slice(0, 4).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        <Badge variant="secondary">Earned</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Settings className="h-6 w-6" />
                    Settings
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <CreditCard className="h-6 w-6" />
                    Upgrade Plan
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Bell className="h-6 w-6" />
                    Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            Using {activity.tool} • {activity.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.earned ? "border-green-200" : "opacity-60"}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned ? (
                        <Badge className="bg-green-500">
                          <Star className="h-3 w-3 mr-1" />
                          Earned
                        </Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                    <AvatarFallback className="text-lg">
                      {userInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={userInfo.name}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={userInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(false)}>
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Connected Devices
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}