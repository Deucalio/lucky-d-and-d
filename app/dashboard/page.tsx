"use client"

import { useState } from "react"
import { TrendingUp, Trophy, Clock, DollarSign, Target, Activity, Star, Gift, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Hamad Ali",
  totalSpent: 0,
  totalWinnings: 0,
  activeTickets: 0,
  completedLotteries: 0,
  winRate: 0,
  memberSince: "January 2023",
  tier: "Member",
  nextTierProgress: 75,
}

const recentActivity = [
  {
    id: 1,
    type: "purchase",
    title: "iPhone 15 Pro Max Lottery",
    amount: 12500,
    date: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    type: "win",
    title: "Gaming Setup Ultimate",
    amount: 150000,
    date: "1 day ago",
    status: "completed",
  },
  {
    id: 3,
    type: "purchase",
    title: "MacBook Pro M3 Max",
    amount: 17500,
    date: "3 days ago",
    status: "active",
  },
  {
    id: 4,
    type: "loss",
    title: "Tesla Model S Plaid",
    amount: 50000,
    date: "5 days ago",
    status: "completed",
  },
]

const activeTickets = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    drawDate: "2024-02-15",
    ticketNumber: "LDD-2024-001234",
    prizeValue: 250000,
    participants: 156,
    maxParticipants: 200,
    daysLeft: 5,
  },
  {
    id: 2,
    title: "MacBook Pro M3 Max",
    drawDate: "2024-02-20",
    ticketNumber: "LDD-2024-005678",
    prizeValue: 350000,
    participants: 89,
    maxParticipants: 150,
    daysLeft: 10,
  },
  {
    id: 3,
    title: "Gaming Setup Ultimate",
    drawDate: "2024-02-25",
    ticketNumber: "LDD-2024-009012",
    prizeValue: 150000,
    participants: 67,
    maxParticipants: 100,
    daysLeft: 15,
  },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-xl text-gray-400">Welcome back, {userData.name}!</p>
            </div>
            <div className=" items-center gap-4 hidden">
              <Badge className="bg-yellow-600 text-black px-4 py-2 text-lg">
                <Star className="w-4 h-4 mr-2" />
                {userData.tier} Member
              </Badge>
              {/* <Button asChild className="bg-gradient-to-r from-purple-600 to-violet-600">
                <Link href="/catalogue">Browse Lotteries</Link>
              </Button> */}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₨{userData.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-gray-500 items-center hidden mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1 text-red-400" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Winnings</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₨{userData.totalWinnings.toLocaleString()}</div>
              <p className="text-xs text-gray-500 items-center hidden mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1 text-green-400" />
                +25% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Tickets</CardTitle>
              <Target className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userData.activeTickets}</div>
              <p className="text-xs text-gray-500 items-center hidden mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1 text-blue-400" />3 new this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userData.winRate}%</div>
              <p className="text-xs text-gray-500 hidden items-center mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1 text-green-400" />
                Above average
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Tickets */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-purple-400" />
                  Active Purchases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 hidden">
                {activeTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{ticket.title}</h3>
                        <p className="text-sm text-gray-400">Ticket: {ticket.ticketNumber}</p>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {ticket.daysLeft} days left
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Prize Value</p>
                        <p className="font-bold text-green-400">₨{ticket.prizeValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Draw Date</p>
                        <p className="font-medium text-white">
                          {new Date(ticket.drawDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Participants: {ticket.participants}/{ticket.maxParticipants}
                        </span>
                        <span className="text-gray-400">
                          {Math.round((ticket.participants / ticket.maxParticipants) * 100)}% filled
                        </span>
                      </div>
                      <Progress
                        value={(ticket.participants / ticket.maxParticipants) * 100}
                        className="h-2 bg-slate-700"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                >
                  <Link href="/history">View All Tickets</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Member Progress */}
            <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-yellow-400" />
                  Member Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{userData.tier}</div>
                  <p className="text-sm text-gray-400">Current Tier</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress to Platinum</span>
                    <span className="text-white">{userData.nextTierProgress}%</span>
                  </div>
                  <Progress value={userData.nextTierProgress} className="h-2 bg-slate-700" />
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500">Member since {userData.memberSince}</p>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-yellow-600 to-orange-600">
                  <Link href="/rewards">View Rewards</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm ">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-blue-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 hidden">
                {recentActivity.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "win"
                            ? "bg-green-400"
                            : activity.type === "purchase"
                              ? "bg-blue-400"
                              : "bg-red-400"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-white line-clamp-1">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          activity.type === "win"
                            ? "text-green-400"
                            : activity.type === "purchase"
                              ? "text-blue-400"
                              : "text-red-400"
                        }`}
                      >
                        {activity.type === "win" ? "+" : "-"}₨{activity.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-slate-600 text-gray-400 hover:bg-slate-800/50 bg-transparent"
                >
                  <Link href="/history">View All Activity</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-violet-600">
                  <Link href="/marketplace">Visit Marketplace</Link>
                </Button>
                {/* <Button
                  asChild
                  variant="outline"
                  className="w-full border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent"
                >
                  <Link href="/marketplace">Visit Marketplace</Link>
                </Button> */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent"
                >
                  <Link href="/wallet">Manage Wallet</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
