import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Bell, Mail, Palette, Shield, User } from "lucide-react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [colorScheme, setColorScheme] = useState("orange");
  const [companyName, setCompanyName] = useState("Delta Admin");

  const handleColorSchemeChange = (value: string) => {
    setColorScheme(value);
    
    // Update CSS variables based on color scheme
    const root = document.documentElement;
    
    if (value === "orange") {
      root.style.setProperty('--primary', '#F97316');
      root.style.setProperty('--primary-foreground', '#FFFFFF');
      root.style.setProperty('--secondary', '#FEC6A1');
      root.style.setProperty('--secondary-foreground', '#1a1a1a');
      root.style.setProperty('--muted', '#f3f3f3');
      root.style.setProperty('--muted-foreground', '#666666');
      root.style.setProperty('--accent', '#FEC6A1');
      root.style.setProperty('--accent-foreground', '#1a1a1a');
    } else if (value === "purple") {
      root.style.setProperty('--primary', '#9b87f5');
      root.style.setProperty('--primary-foreground', '#FFFFFF');
      root.style.setProperty('--secondary', '#E5DEFF');
      root.style.setProperty('--secondary-foreground', '#1a1a1a');
      root.style.setProperty('--muted', '#F1F0FB');
      root.style.setProperty('--muted-foreground', '#666666');
      root.style.setProperty('--accent', '#E5DEFF');
      root.style.setProperty('--accent-foreground', '#1a1a1a');
    } else if (value === "blue") {
      root.style.setProperty('--primary', '#0EA5E9');
      root.style.setProperty('--primary-foreground', '#FFFFFF');
      root.style.setProperty('--secondary', '#D3E4FD');
      root.style.setProperty('--secondary-foreground', '#1a1a1a');
      root.style.setProperty('--muted', '#F1F1F1');
      root.style.setProperty('--muted-foreground', '#666666');
      root.style.setProperty('--accent', '#D3E4FD');
      root.style.setProperty('--accent-foreground', '#1a1a1a');
    }

    toast.success(`Color scheme updated to ${value}`);
  };

  // Set initial color scheme
  useEffect(() => {
    handleColorSchemeChange(colorScheme);
  }, []);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your basic dashboard settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Label>Color Scheme</Label>
                  <RadioGroup
                    value={colorScheme}
                    onValueChange={handleColorSchemeChange}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="orange"
                        id="orange"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="orange"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-orange-50 p-4 hover:bg-orange-100 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Palette className="mb-2 h-6 w-6 text-orange-600" />
                        Orange
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="purple"
                        id="purple"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="purple"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-purple-50 p-4 hover:bg-purple-100 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Palette className="mb-2 h-6 w-6 text-purple-600" />
                        Purple
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="blue"
                        id="blue"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="blue"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-blue-50 p-4 hover:bg-blue-100 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Palette className="mb-2 h-6 w-6 text-blue-600" />
                        Blue
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <Label>Two-Factor Authentication</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <Label>Password Settings</Label>
                  </div>
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;