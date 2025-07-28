import { Trophy, Calendar, DollarSign, User, Star, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock winners data
const recentWinners = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York, USA",
    prize: "Tesla Model S Plaid",
    value: 150000,
    date: "2024-01-20",
    image: "/placeholder.svg?height=80&width=80",
    category: "Machinery",
    testimonial: "I can't believe I actually won! The process was so transparent and fair. Thank you Lucky Deals!",
    verified: true,
  },
  {
    id: 2,
    name: "Ahmed K.",
    location: "Dubai, UAE",
    prize: "Rolex Submariner",
    value: 45000,
    date: "2024-01-18",
    image: "/placeholder.svg?height=80&width=80",
    category: "Money",
    testimonial: "Amazing experience! The watch arrived exactly as described. Highly recommend Lucky Deals.",
    verified: true,
  },
  {
    id: 3,
    name: "Maria L.",
    location: "London, UK",
    prize: "MacBook Pro M3 Max",
    value: 35000,
    date: "2024-01-15",
    image: "/placeholder.svg?height=80&width=80",
    category: "Apple technology",
    testimonial: "Perfect for my design work! The delivery was fast and the product was brand new.",
    verified: true,
  },
  {
    id: 4,
    name: "James R.",
    location: "Sydney, Australia",
    prize: "Gaming Setup Ultimate",
    value: 15000,
    date: "2024-01-12",
    image: "/placeholder.svg?height=80&width=80",
    category: "Machinery",
    testimonial: "The gaming setup is incredible! Every component was top quality. Best lottery site ever!",
    verified: true,
  },
  {
    id: 5,
    name: "Lisa C.",
    location: "Toronto, Canada",
    prize: "Diamond Necklace",
    value: 75000,
    date: "2024-01-10",
    image: "/placeholder.svg?height=80&width=80",
    category: "Money",
    testimonial: "Absolutely stunning! The certificate of authenticity was included. So professional!",
    verified: true,
  },
  {
    id: 6,
    name: "Carlos M.",
    location: "Madrid, Spain",
    prize: "iPhone 15 Pro Max",
    value: 25000,
    date: "2024-01-08",
    image: "/placeholder.svg?height=80&width=80",
    category: "Apple technology",
    testimonial: "Received it within a week! Packaging was perfect and the phone works flawlessly.",
    verified: true,
  },
]

const winnerStats = [
  { label: "Total Winners", value: "2,847", icon: Trophy },
  { label: "Prizes Awarded", value: "$12.5M", icon: DollarSign },
  { label: "This Month", value: "156", icon: Calendar },
  { label: "Average Prize", value: "$4,389", icon: Award },
]

export default function WinnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-6">
            Our Winners
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Celebrating the amazing people who have won life-changing prizes through Lucky Deals. Every winner is
            verified and their stories are real.
          </p>
        </div>

        {/* Winner Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {winnerStats.map((stat, index) => (
            <Card key={index} className="text-center bg-slate-900/50 border-slate-800/50">
              <CardHeader className="pb-3">
                <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-purple-300" />
                </div>
                <CardTitle className="text-3xl font-bold text-white">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Winners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Winners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentWinners.map((winner) => (
              <Card key={winner.id} className="bg-slate-900/50 border-slate-800/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={winner.image || "/placeholder.svg"}
                        alt={winner.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-700"
                      />
                      {winner.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white">{winner.name}</h3>
                        <Badge variant="outline" className="text-xs border-slate-600 text-gray-400">
                          {winner.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{winner.location}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(winner.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-white mb-1">Won: {winner.prize}</h4>
                    <p className="text-2xl font-bold text-green-400">${winner.value.toLocaleString()}</p>
                  </div>

                  <blockquote className="text-sm text-gray-400 italic border-l-2 border-purple-700 pl-3">
                    "{winner.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Winner Verification */}
        <Card className="bg-slate-900/50 border-slate-800/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white flex items-center justify-center">
              <Award className="mr-2 h-6 w-6 text-purple-300" />
              Winner Verification Process
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-purple-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Identity Verification</h3>
                <p className="text-gray-400 text-sm">
                  All winners undergo thorough identity verification to ensure authenticity and prevent fraud.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-purple-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Prize Delivery</h3>
                <p className="text-gray-400 text-sm">
                  Winners receive their prizes within 7-14 business days with full tracking and insurance coverage.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-purple-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Public Recognition</h3>
                <p className="text-gray-400 text-sm">
                  With permission, we celebrate our winners publicly to maintain transparency and build trust.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
