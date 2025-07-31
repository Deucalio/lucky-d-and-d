"use client";

import type React from "react";

import { useState } from "react";
import {
  User,
  Calendar,
  Edit,
  Camera,
  Shield,
  Bell,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// Mock user data
const userData = {
  name: "Ahmad Khan",
  email: "ahmad.khan@email.com",
  phone: "+03422266000",
  location: "Karachi, Pakistan",
  joinDate: "January 2023",
  tier: "Gold",
  avatar: "/placeholder.svg?height=120&width=120",
  totalSpent: 125000,
  totalWinnings: 45000,
  winRate: 18,
  completedLotteries: 0,
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-4">
            Profile
          </h1>
          <p className="text-xl text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-purple-500/50"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {userData.name}
                </h2>
                <p className="text-gray-400 mb-4">{userData.email}</p>

                <Badge className="bg-yellow-600 text-black mb-6 px-4 py-2 text-lg">
                  {userData.tier} Member
                </Badge>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">
                      {userData.completedLotteries}
                    </div>
                    <div className="text-sm text-gray-400">Lotteries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {userData.winRate}%
                    </div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member since {userData.joinDate}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-700/50">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-purple-600"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-purple-600"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-purple-600"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-purple-600"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card className="bg-slate-900/60 border-slate-700/50">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white flex items-center">
                        <User className="mr-2 h-5 w-5 text-purple-400" />
                        Personal Information
                      </CardTitle>
                      <Button
                        variant="outline"
                        onClick={() =>
                          isEditing ? handleSave() : setIsEditing(true)
                        }
                        className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        {isEditing ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-800/50 border-slate-600 text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-800/50 border-slate-600 text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-300">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-800/50 border-slate-600 text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-gray-300">
                          Location
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-800/50 border-slate-600 text-white disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-700">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Total Spent</Label>
                        <div className="text-2xl font-bold text-red-400">
                          ₨{userData.totalSpent.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Total Winnings</Label>
                        <div className="text-2xl font-bold text-green-400">
                          ₨{userData.totalWinnings.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <Card className="bg-slate-900/60 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-green-400" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-400">
                            Add extra security to your account
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-600">Enabled</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-gray-300 bg-transparent"
                          >
                            Manage
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Login Notifications
                          </h3>
                          <p className="text-sm text-gray-400">
                            Get notified of new login attempts
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">Password</h3>
                          <p className="text-sm text-gray-400">
                            Last changed 3 months ago
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-gray-300 bg-transparent"
                        >
                          Change
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Active Sessions
                          </h3>
                          <p className="text-sm text-gray-400">
                            Manage your active login sessions
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-gray-300 bg-transparent"
                        >
                          View All
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card className="bg-slate-900/60 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-blue-400" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Lottery Results
                          </h3>
                          <p className="text-sm text-gray-400">
                            Get notified when lottery results are announced
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            New Lotteries
                          </h3>
                          <p className="text-sm text-gray-400">
                            Be the first to know about new lottery opportunities
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Marketplace Updates
                          </h3>
                          <p className="text-sm text-gray-400">
                            Get updates on marketplace activities
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Promotional Offers
                          </h3>
                          <p className="text-sm text-gray-400">
                            Receive special offers and promotions
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Email Notifications
                          </h3>
                          <p className="text-sm text-gray-400">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            SMS Notifications
                          </h3>
                          <p className="text-sm text-gray-400">
                            Receive notifications via SMS
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences">
                <Card className="bg-slate-900/60 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-purple-400" />
                      App Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">Language</h3>
                          <p className="text-sm text-gray-400">
                            Choose your preferred language
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-gray-300"
                        >
                          English
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">Currency</h3>
                          <p className="text-sm text-gray-400">
                            Display currency preference
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-gray-300"
                        >
                          PKR (₨)
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">Theme</h3>
                          <p className="text-sm text-gray-400">
                            Choose your preferred theme
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-gray-300"
                        >
                          Dark
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Auto-refresh
                          </h3>
                          <p className="text-sm text-gray-400">
                            Automatically refresh lottery data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">
                            Sound Effects
                          </h3>
                          <p className="text-sm text-gray-400">
                            Play sounds for notifications and actions
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
