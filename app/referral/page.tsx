"use client"

import { useState } from "react"
import { Copy, Share2, Gift, Users, DollarSign, Trophy, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock user data - this would come from your auth context
const userData = {
  referralCode: "LUCKY2024JD",
  totalReferrals: 12,
  totalEarnings: 450.0,
  pendingEarnings: 75.0,
  tier: "Gold",
}

const referralTiers = [
  {
    name: "Bronze",
    minReferrals: 0,
    bonus: "5",
    color: "bg-orange-600",
    benefits: ["5 per referral", "Basic support"],
  },
  {
    name: "Silver",
    minReferrals: 10,
    bonus: "7.50",
    color: "bg-gray-400",
    benefits: ["7.50 per referral", "Priority support", "Monthly bonus draws"],
  },
  {
    name: "Gold",
    minReferrals: 25,
    bonus: "10",
    color: "bg-yellow-500",
    benefits: ["10 per referral", "VIP support", "Exclusive lottery access", "Double bonus weekends"],
  },
  {
    name: "Platinum",
    minReferrals: 50,
    bonus: "15",
    color: "bg-purple-600",
    benefits: [
      "15 per referral",
      "Dedicated account manager",
      "Early access to new lotteries",
      "Custom referral bonuses",
    ],
  },
]

const recentReferrals = [
  { name: "Sarah M.", date: "2024-01-20", status: "Active", earnings: "100.00" },
  { name: "Mike R.", date: "2024-01-18", status: "Pending", earnings: "100.00" },
  { name: "Lisa K.", date: "2024-01-15", status: "Active", earnings: "100.00" },
  { name: "John D.", date: "2024-01-12", status: "Active", earnings: "100.00" },
]

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const referralLink = `https://luckydeals.com/join?ref=${userData.referralCode}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      })
    }
  }

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Lucky Deals",
          text: "Join me on Lucky Deals and get a chance to win amazing prizes!",
          url: referralLink,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      copyToClipboard()
    }
  }

  const currentTier = referralTiers.find((tier) => tier.name === userData.tier)
  const nextTier = referralTiers.find((tier) => tier.minReferrals > userData.totalReferrals)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-6">
            Referral Program
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Invite your friends to Lucky Deals and earn rewards for every successful referral. The more you refer, the
            more you earn!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-300" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">{userData.totalReferrals}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Total Referrals</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">{userData.totalEarnings}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Total Earnings</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">{userData.pendingEarnings}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Pending Earnings</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-purple-300" />
              </div>
              <CardTitle className="text-xl font-bold text-white">{userData.tier}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Current Tier</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link Section */}
        <Card className="mb-12 bg-slate-900/50 border-slate-800/50">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Your Referral Link</CardTitle>
            <p className="text-gray-400 text-center">Share this link with friends to start earning rewards</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={referralLink} readOnly className="bg-slate-800/50 border-slate-700 text-white" />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-slate-700 hover:bg-slate-800/50 bg-transparent"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={shareReferral} className="flex-1 bg-gradient-to-r from-purple-700 to-violet-800">
                <Share2 className="mr-2 h-4 w-4" />
                Share Link
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-slate-700 hover:bg-slate-800/50 bg-transparent"
              >
                Copy Code: {userData.referralCode}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referral Tiers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Referral Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {referralTiers.map((tier, index) => (
              <Card
                key={index}
                className={`bg-slate-900/50 border-slate-800/50 relative ${
                  tier.name === userData.tier ? "ring-2 ring-purple-500" : ""
                }`}
              >
                {tier.name === userData.tier && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                    Current Tier
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mb-4`}>
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">{tier.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{tier.minReferrals}+ referrals</p>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-green-400">{tier.bonus}</div>
                    <div className="text-sm text-gray-400">per referral</div>
                  </div>
                  <ul className="space-y-1">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-sm text-gray-400 flex items-center">
                        <Check className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <Card className="mb-12 bg-slate-900/50 border-slate-800/50">
            <CardHeader>
              <CardTitle className="text-xl text-white text-center">Progress to {nextTier.name} Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {userData.totalReferrals} / {nextTier.minReferrals} referrals
                  </span>
                  <span className="text-gray-400">{nextTier.minReferrals - userData.totalReferrals} more needed</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-violet-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(userData.totalReferrals / nextTier.minReferrals) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Referrals */}
        <Card className="bg-slate-900/50 border-slate-800/50">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReferrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{referral.name}</div>
                      <div className="text-sm text-gray-400">{referral.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-400">{referral.earnings}</div>
                    <Badge
                      variant={referral.status === "Active" ? "default" : "secondary"}
                      className={referral.status === "Active" ? "bg-green-600" : "bg-yellow-600"}
                    >
                      {referral.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
