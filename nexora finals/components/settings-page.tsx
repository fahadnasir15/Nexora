"use client";

import { useState } from "react";
import { 
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Download,
  Trash2,
  Key,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Smartphone,
  Monitor,
  Volume2,
  Mic,
  Database,
  Zap,
  Clock,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

interface SettingsPageProps {
  onPageSelect: (page: string) => void;
}

export default function SettingsPage({ onPageSelect }: SettingsPageProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    desktop: true,
    email: false,
    sounds: true,
    chatUpdates: true,
    newFeatures: false
  });
  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC",
    theme: "system",
    aiVoice: "natural",
    responseSpeed: 50,
    autoSave: true,
    dataCollection: false
  });

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Settings saved:", { notifications, preferences });
  };

  const handleResetSettings = () => {
    // Reset to defaults
    setNotifications({
      desktop: true,
      email: false,
      sounds: true,
      chatUpdates: true,
      newFeatures: false
    });
    setPreferences({
      language: "en",
      timezone: "UTC",
      theme: "system",
      aiVoice: "natural",
      responseSpeed: 50,
      autoSave: true,
      dataCollection: false
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Settings
            </h1>
            <p className="text-muted-foreground">Customize your Nexora experience</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleResetSettings}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="general" className="h-full">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ai">AI & Models</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme">Theme</Label>
                  <ThemeToggle />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="language">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      <SelectItem value="CET">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto-save conversations</Label>
                  <Switch 
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, autoSave: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Response Speed</Label>
                  <Slider
                    value={[preferences.responseSpeed]}
                    onValueChange={([value]) => 
                      setPreferences(prev => ({ ...prev, responseSpeed: value }))
                    }
                    max={100}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slower (More detailed)</span>
                    <span>Faster (Quick responses)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Models & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-model">AI Voice</Label>
                  <Select value={preferences.aiVoice} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, aiVoice: value }))
                  }>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label>Enable AI Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Voice Recognition</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Image Generation</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Code Analysis</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real-time Translation</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      placeholder="sk-..."
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add your own API key for unlimited access to premium features
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Collection</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow anonymous usage analytics
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.dataCollection}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, dataCollection: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chat History</Label>
                    <p className="text-xs text-muted-foreground">
                      Save conversations locally
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cloud Sync</Label>
                    <p className="text-xs text-muted-foreground">
                      Sync settings across devices
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete All Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Desktop Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Show notifications in your browser
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.desktop}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, desktop: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Play sounds for notifications
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.sounds}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, sounds: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label>Notification Types</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chat Updates</span>
                      <Switch 
                        checked={notifications.chatUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, chatUpdates: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Features</span>
                      <Switch 
                        checked={notifications.newFeatures}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, newFeatures: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Developer Mode</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Debug Logging</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Experimental Features</Label>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Memory Usage Limit (MB)</Label>
                  <Input type="number" defaultValue="512" />
                </div>
                <div className="space-y-2">
                  <Label>Max Concurrent Requests</Label>
                  <Input type="number" defaultValue="5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="font-mono">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>December 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage Used:</span>
                  <span>45.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Features:</span>
                  <span>12/25</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}