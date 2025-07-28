"use client"

import { useState } from "react"
import {
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  Trophy,
  Clock,
  Star,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock wallet data
const walletBalance = {
  total: 0,
  available: 0,
  pending: 0,
}

const paymentCards = [
  {
    id: 1,
    type: "visa",
    number: "**** **** **** 1234",
    holder: "Ahmad Khan",
    expiry: "12/26",
    isDefault: true,
    bank: "HBL Bank",
  },
  {
    id: 2,
    type: "mastercard",
    number: "**** **** **** 5678",
    holder: "Ahmad Khan",
    expiry: "08/25",
    isDefault: false,
    bank: "UBL Bank",
  },
]

const lotteryCards = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    ticketNumber: "LDD-2024-001234",
    purchaseDate: "2024-01-15",
    drawDate: "2024-02-15",
    status: "active",
    prizeValue: 250000,
    entryFee: 12500,
    color: "blue",
  },
  {
    id: 2,
    title: "MacBook Pro M3 Max",
    ticketNumber: "LDD-2024-005678",
    purchaseDate: "2024-01-10",
    drawDate: "2024-02-20",
    status: "active",
    prizeValue: 350000,
    entryFee: 17500,
    color: "purple",
  },
  {
    id: 3,
    title: "Gaming Setup Ultimate",
    ticketNumber: "LDD-2024-009012",
    purchaseDate: "2024-01-05",
    drawDate: "2024-01-25",
    status: "won",
    prizeValue: 150000,
    entryFee: 7500,
    color: "green",
  },
  {
    id: 4,
    title: "Tesla Model S Plaid",
    ticketNumber: "LDD-2024-003456",
    purchaseDate: "2023-12-20",
    drawDate: "2024-01-20",
    status: "lost",
    prizeValue: 1500000,
    entryFee: 50000,
    color: "red",
  },
]

const transactions = [
  {
    id: 1,
    type: "purchase",
    description: "iPhone 15 Pro Max Lottery Entry",
    amount: -12500,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    type: "win",
    description: "Gaming Setup Ultimate - Prize Won",
    amount: 150000,
    date: "2024-01-25",
    status: "completed",
  },
  {
    id: 3,
    type: "purchase",
    description: "MacBook Pro M3 Max Lottery Entry",
    amount: -17500,
    date: "2024-01-10",
    status: "completed",
  },
  {
    id: 4,
    type: "deposit",
    description: "Wallet Top-up via HBL Card",
    amount: 25000,
    date: "2024-01-08",
    status: "completed",
  },
]

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)

  const getCardBackground = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-gradient-to-br from-blue-600 to-blue-800"
      case "purple":
        return "bg-gradient-to-br from-purple-600 to-purple-800"
      case "green":
        return "bg-gradient-to-br from-green-600 to-green-800"
      case "red":
        return "bg-gradient-to-br from-red-600 to-red-800"
      default:
        return "bg-gradient-to-br from-slate-600 to-slate-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-600"
      case "won":
        return "bg-green-600"
      case "lost":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-4">
            Wallet
          </h1>
          <p className="text-xl text-gray-400">Manage your funds</p>
        </div>

        {/* Wallet Balance */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-500/50 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="h-8 w-8 text-purple-300" />
                  <h2 className="text-2xl font-bold text-white">Wallet Balance</h2>
                </div>
                <p className="text-purple-200">Available funds for products purchases</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-purple-300 hover:bg-purple-800/30"
              >
                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {showBalance ? `₨${walletBalance.total.toLocaleString()}` : "₨••••••"}
                </div>
                <p className="text-purple-200 text-sm">Total Spent</p>
              </div>
              <div className="text-center hidden">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {showBalance ? `₨${walletBalance.available.toLocaleString()}` : "₨••••••"}
                </div>
                <p className="text-purple-200 text-sm">Available</p>
              </div>
              <div className="text-center hidden">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {showBalance ? `₨${walletBalance.pending.toLocaleString()}` : "₨••••••"}
                </div>
                <p className="text-purple-200 text-sm">Pending</p>
              </div>
            </div>

            <div className=" gap-4 mt-6 hidden">
              <Button className="flex-1 bg-white text-purple-900 hover:bg-gray-100">
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-purple-400 text-purple-300 hover:bg-purple-800/30 bg-transparent"
              >
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="cards" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 border border-slate-700/50">
            <TabsTrigger value="cards" className="data-[state=active]:bg-purple-600">
              Payment Cards
            </TabsTrigger>
            {/* <TabsTrigger value="lottery" className="data-[state=active]:bg-purple-600">
              Lottery Cards
            </TabsTrigger> */}
            <TabsTrigger value="transactions" className="data-[state=active]:bg-purple-600 hidden">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Payment Cards */}
          <TabsContent value="cards" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Payment Cards</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Card
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentCards.map((card) => (
                <Card
                  key={card.id}
                  className={`relative overflow-hidden ${
                    card.type === "visa"
                      ? "bg-gradient-to-br from-blue-600 to-blue-800"
                      : "bg-gradient-to-br from-red-600 to-red-800"
                  } border-0 text-white`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-8">
                      <div className="text-2xl font-bold">{card.type === "visa" ? "VISA" : "MasterCard"}</div>
                      {card.isDefault && <Badge className="bg-white/20 text-white border-0">Default</Badge>}
                    </div>

                    <div className="space-y-4">
                      <div className="text-xl font-mono tracking-wider">{card.number}</div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs opacity-70 uppercase">Card Holder</p>
                          <p className="font-medium">{card.holder}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-70 uppercase">Expires</p>
                          <p className="font-medium">{card.expiry}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/20">
                        <p className="text-sm opacity-70">{card.bank}</p>
                      </div>
                    </div>

                    {/* Card chip */}
                    <div className="absolute top-16 left-6 w-12 h-8 bg-yellow-400 rounded-md opacity-80" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lottery Cards */}
          <TabsContent value="lottery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Lottery Cards</h2>
              <p className="text-gray-400">{lotteryCards.length} digital assets</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lotteryCards.map((card) => (
                <Card key={card.id} className="bg-slate-900/60 border-slate-700/50 overflow-hidden">
                  <div className={`h-48 ${getCardBackground(card.color)} p-6 relative`}>
                    {/* Status Badge */}
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(card.status)} border-0 text-white`}>
                      {card.status === "active" && <Clock className="w-3 h-3 mr-1" />}
                      {card.status === "won" && <Trophy className="w-3 h-3 mr-1" />}
                      {card.status === "lost" && <Star className="w-3 h-3 mr-1" />}
                      {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                    </Badge>

                    {/* Card Content */}
                    <div className="text-white h-full flex flex-col justify-between">
                      <div>
                        <div className="text-lg font-bold mb-2">Lucky D&D </div>
                        <div className="text-sm opacity-80">Digital Lottery Ticket</div>
                      </div>

                      <div>
                        <div className="text-lg font-mono mb-2">{card.ticketNumber}</div>
                        <div className="text-sm opacity-80">Draw: {new Date(card.drawDate).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-white mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-400">
                          Purchased on {new Date(card.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Prize Value</p>
                          <p className="font-bold text-green-400">₨{card.prizeValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Entry Fee</p>
                          <p className="font-medium text-white">₨{card.entryFee.toLocaleString()}</p>
                        </div>
                      </div>

                      {card.status === "active" && (
                        <div className="pt-2 border-t border-slate-700">
                          <p className="text-xs text-gray-500 text-center">
                            Draw in{" "}
                            {Math.ceil(
                              (new Date(card.drawDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions */}
          <TabsContent value="transactions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Transaction History</h2>
              <Button variant="outline" className="border-slate-600 text-gray-300 bg-transparent">
                Export
              </Button>
            </div>

            <Card className="bg-slate-900/60 border-slate-700/50">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {transactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className={`p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors ${
                        index !== transactions.length - 1 ? "border-b border-slate-700/50" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "purchase"
                              ? "bg-blue-600/20 text-blue-400"
                              : transaction.type === "win"
                                ? "bg-green-600/20 text-green-400"
                                : "bg-purple-600/20 text-purple-400"
                          }`}
                        >
                          {transaction.type === "purchase" && <ArrowDownLeft className="h-5 w-5" />}
                          {transaction.type === "win" && <Trophy className="h-5 w-5" />}
                          {transaction.type === "deposit" && <ArrowUpRight className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-white">{transaction.description}</p>
                          <p className="text-sm text-gray-400">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                          {transaction.amount > 0 ? "+" : ""}₨{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            transaction.status === "completed"
                              ? "border-green-500 text-green-400"
                              : "border-yellow-500 text-yellow-400"
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Wallet Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/60 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-400" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Add extra security to your wallet</p>
                    </div>
                    <Badge className="bg-green-600">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">Transaction Notifications</p>
                      <p className="text-sm text-gray-400">Get notified of all transactions</p>
                    </div>
                    <Badge className="bg-blue-600">Active</Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">Manage Security</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-purple-400" />
                    Payment Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">Auto-reload</p>
                      <p className="text-sm text-gray-400">Automatically add funds when low</p>
                    </div>
                    <Badge variant="outline" className="border-gray-500 text-gray-400">
                      Disabled
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">Default Payment Method</p>
                      <p className="text-sm text-gray-400">HBL Visa **** 1234</p>
                    </div>
                    <Badge className="bg-blue-600">Primary</Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600">Update Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
