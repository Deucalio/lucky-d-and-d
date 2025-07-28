"use client"

import { useState } from "react"
import { DollarSign, Ticket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Lottery {
  id: number
  name: string
  status: string
  description: string | null
  prize_pool: number
  entry_cost: number
  total_tickets: number
  end_time: Date
  created_at: Date
  updated_at: Date
  lottery_info?: {
    image?: string
    category?: string
    featured?: boolean
    color?: string
  }
}

interface LotteryCardProps {
  lottery: Lottery
  featured?: boolean
}

const getCardBackground = (color?: string) => {
  switch (color) {
    case "blue":
      return "bg-gradient-to-br from-blue-700 to-blue-900"
    case "green":
      return "bg-gradient-to-br from-green-700 to-green-900"
    case "purple":
      return "bg-gradient-to-br from-purple-700 to-purple-900"
    case "red":
      return "bg-gradient-to-br from-red-700 to-red-900"
    case "orange":
      return "bg-gradient-to-br from-orange-700 to-orange-900"
    case "indigo":
      return "bg-gradient-to-br from-indigo-700 to-indigo-900"
    default:
      return "bg-gradient-to-br from-slate-700 to-slate-900"
  }
}

export function LotteryCard({ lottery, featured = false }: LotteryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const timeLeft = Math.max(0, lottery.end_time.getTime() - new Date().getTime())
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  // Mock sold tickets and generate ticket number
  const soldTickets = Math.floor(lottery.total_tickets * (0.3 + Math.random() * 0.4))
  const progressPercentage = (soldTickets / lottery.total_tickets) * 100
  const ticketNumber = `${lottery.id.toString().padStart(4, "0")} ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)}`

  return (
    <div className="group">
      <div
        className="relative group transform transition-transform duration-500 hover:scale-105 cursor-pointer mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {featured && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0">⭐ Featured</Badge>
          </div>
        )}

        {/* Lottery Card */}
        <div
          className={`rounded-2xl shadow-lg overflow-hidden aspect-[1.58/1] ${getCardBackground(lottery.lottery_info?.color)} p-6 relative`}
        >
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-${lottery.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0L20 0L0 20Z" fill="rgba(255,255,255,0.1)" />
                  <path d="M20 0L40 0L0 40Z" fill="rgba(255,255,255,0.1)" />
                  <path d="M40 0L40 20L20 40Z" fill="rgba(255,255,255,0.1)" />
                  <path d="M40 20L40 40L20 40Z" fill="rgba(255,255,255,0.1)" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${lottery.id})`} />
            </svg>
          </div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-auto">
              <div className="text-white font-bold text-lg md:text-xl">Lucky D&D</div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-yellow-400 flex items-center justify-center">
                  <Ticket className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>

            {/* Ticket Number */}
            <div className="my-4">
              <div className="text-white text-xl md:text-2xl font-mono tracking-wider">{ticketNumber}</div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-white/70 text-xs uppercase">Entry Cost</div>
                <div className="text-white font-medium">₨{lottery.entry_cost}</div>
              </div>
              <div>
                <div className="text-white/70 text-xs uppercase">Expires</div>
                <div className="text-white font-medium">
                  {lottery.end_time.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })}
                </div>
              </div>
            </div>
          </div>

          {/* Holographic effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 transition-transform duration-700 ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`}
          />
        </div>
      </div>

      {/* Prize Information Card */}
      <Card className="bg-slate-900/50 border-slate-800/50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-bold text-xl text-white mb-2">{lottery.name}</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                ₨{lottery.prize_pool.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-1">Prize Pool</p>
            </div>

            <p className="text-gray-400 text-sm line-clamp-2 text-center">{lottery.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>
                    {soldTickets.toLocaleString()} / {lottery.total_tickets.toLocaleString()} sold
                  </span>
                </div>
                <Badge
                  variant={daysLeft > 7 ? "default" : daysLeft > 3 ? "secondary" : "destructive"}
                  className="bg-slate-800/50"
                >
                  {daysLeft}d {hoursLeft}h left
                </Badge>
              </div>

              <Progress value={progressPercentage} className="h-2 bg-slate-800" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <DollarSign className="h-4 w-4 text-green-300" />
                  <span className="font-medium">₨{lottery.entry_cost}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Ticket className="h-4 w-4 text-blue-300" />
                  <span>{lottery.total_tickets - soldTickets} left</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-700 to-violet-800 hover:from-purple-800 hover:to-violet-900 border-0"
              disabled={lottery.status !== "active" || soldTickets >= lottery.total_tickets}
            >
              {soldTickets >= lottery.total_tickets ? "Sold Out" : "Purchase Card"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
