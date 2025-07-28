"use client"

import { useState } from "react"
import { Heart, Share2, ShoppingCart, Minus, Plus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface Lottery {
  id: number
  name: string
  status: string
  description: string | null
  prize_pool: number
  entry_cost: number
  total_tickets: number
  sold_tickets: number
  end_time: Date
  created_at: Date
  updated_at: Date
  lottery_info?: {
    image?: string | null
    category?: string
    featured?: boolean
    color?: string
    prize_title?: string
    prize_description?: string
  }
}

interface LotteryProductCardProps {
  lottery: Lottery
  onAuthRequired: () => boolean
  isLoggedIn: boolean
}

const getCardBackground = (color?: string) => {
  switch (color) {
    case "gold":
      return "bg-gradient-to-br from-yellow-600 to-yellow-800"
    case "blue":
      return "bg-gradient-to-br from-blue-700 to-blue-900"
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

export function LotteryProductCard({ lottery, onAuthRequired, isLoggedIn }: LotteryProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { toast } = useToast()

  const progressPercentage = (lottery.sold_tickets / lottery.total_tickets) * 100
  const ticketNumber = `${lottery.id.toString().padStart(4, "0")} ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)}`

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + delta))
    setQuantity(newQuantity)
  }

  const handleWishlist = () => {
    if (!onAuthRequired()) return

    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? `${lottery.lottery_info?.prize_title || lottery.name} removed from your wishlist`
        : `${lottery.lottery_info?.prize_title || lottery.name} added to your wishlist`,
    })
  }

  const handleAddToCart = async () => {
    if (!onAuthRequired()) return

    setIsAddingToCart(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Added to Cart",
      description: `${quantity} ticket${quantity > 1 ? "s" : ""} for ${lottery.lottery_info?.prize_title || lottery.name} added to your cart`,
    })

    setIsAddingToCart(false)
  }

  const handleBuyNow = async () => {
    if (!onAuthRequired()) return

    // Add to cart first, then redirect to checkout
    await handleAddToCart()
    // In a real app, redirect to checkout
    window.location.href = "/cart"
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lottery.lottery_info?.prize_title || lottery.name,
        text: lottery.description || "",
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Lottery link copied to clipboard",
      })
    }
  }

  const isGiftCard = lottery.lottery_info?.category === "Gift card"

  return (
    <Card className="bg-slate-900/60 border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column - Lottery Card */}
          <div className="p-8 flex flex-col items-center justify-center bg-slate-800/40 relative">
            {/* Action Icons */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/30 hover:bg-black/50 text-white border-0 w-10 h-10"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`border-0 w-10 h-10 transition-colors ${
                  isWishlisted ? "bg-red-600 hover:bg-red-700 text-white" : "bg-black/30 hover:bg-black/50 text-white"
                }`}
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Price Badge */}
            {/* <div className="absolute top-4 left-4 z-20">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-yellow-400 text-lg font-bold">₨{lottery.entry_cost.toLocaleString()}</div>
                <div className="text-xs text-gray-300">Unit price including taxes</div>
              </div>
            </div> */}

            {/* Lottery Card */}
            <div
              className={`rounded-2xl shadow-lg overflow-hidden aspect-[1.58/1] w-80 ${getCardBackground(lottery.lottery_info?.color)} p-6 relative transform transition-transform duration-300 hover:scale-105 mb-6`}
            >
              {/* Geometric Pattern Overlay */}
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id={`pattern-${lottery.id}`}
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
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
                  <div className="text-white font-bold text-lg">Loyalty Card</div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-yellow-400 flex items-center justify-center">
                      <div className="w-4 h-4 bg-yellow-800 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Ticket Number */}
                <div className="my-4">
                  <div className="text-white text-xl font-mono tracking-wider">{ticketNumber}</div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/70 text-xs uppercase">Entry Cost</div>
                    <div className="text-white font-medium">₨{lottery.entry_cost.toLocaleString()}</div>
                  </div>
                  {/* <div>
                    <div className="text-white/70 text-xs uppercase">Expires</div>
                    <div className="text-white font-medium">
                      {lottery.end_time.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Action Buttons - Now on Card Side */}
            <div className="w-full max-w-sm space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-slate-800/50 rounded-full border border-slate-700">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-12 h-12 hover:bg-slate-700"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="px-6 py-2 text-xl font-semibold text-white min-w-[60px] text-center">{quantity}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-12 h-12 hover:bg-slate-700"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent border-yellow-600 text-yellow-400 hover:bg-yellow-600/10 hover:text-yellow-300"
                  onClick={handleAddToCart}
                  disabled={
                    lottery.status !== "active" || lottery.sold_tickets >= lottery.total_tickets || isAddingToCart
                  }
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isAddingToCart ? "Adding..." : "Add to cart"}
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-semibold"
                  onClick={handleBuyNow}
                  disabled={
                    lottery.status !== "active" || lottery.sold_tickets >= lottery.total_tickets || isAddingToCart
                  }
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy now
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="p-8 flex flex-col justify-center">
            <div className="space-y-6">
              {/* Product Title */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Get a chance to win:{" "}
                  <span className="text-green-400">{lottery.lottery_info?.prize_title || lottery.name}</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">{lottery.description}</p>
              </div>

              {/* Product Image or Gift Card Display - LARGER SIZE */}
              <div className="flex justify-center">
                {isGiftCard ? (
                  <div className="w-80 h-52 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-center text-white">
                      <div className="text-3xl font-bold mb-2">🎁</div>
                      <div className="text-xl font-semibold">Gift Card</div>
                      <div className="text-sm opacity-80">₨{lottery.prize_pool.toLocaleString()}</div>
                    </div>
                  </div>
                ) : (
                  <div className="w-80 h-52 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600 overflow-hidden">
                    <img
                      src={lottery.lottery_info?.image || "/placeholder.svg?height=208&width=320"}
                      alt={lottery.lottery_info?.prize_title || lottery.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Progress Section - Fixed and Centered */}
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
                        className="text-green-400 transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-white font-semibold">
                    Sold: <span className="text-green-400">{lottery.sold_tickets}</span>
                  </div>
                  <div className="text-gray-400">
                    from: <span className="text-white">{lottery.total_tickets}</span>
                  </div>
                </div>
              </div>

              {/* More Details Button - Only button on product side */}
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-slate-600 text-gray-300 hover:bg-slate-800/50"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  More details
                </Button>
              </div>

              {/* Status Info */}
              <div className="text-center text-sm text-gray-500">
                {lottery.sold_tickets >= lottery.total_tickets ? (
                  <span className="text-red-400 font-medium">Sold Out</span>
                ) : (
                  <span>{lottery.total_tickets - lottery.sold_tickets} tickets remaining</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
