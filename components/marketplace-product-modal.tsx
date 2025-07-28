"use client"

import { useState } from "react"
import { X, Heart, Share2, ShoppingCart, Star, Clock, User, Shield, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface MarketplaceProduct {
  id: number
  title: string
  description: string
  price: number
  originalPrice: number
  seller: string
  sellerRating: number
  category: string
  timeLeft: string
  image: string
  isVerified: boolean
  totalTickets: number
  remainingTickets: number
  featured: boolean
  prizeValue: number
  drawDate: string
  purchaseDate: string
  ticketNumber: string
  condition: string
  transferHistory: number
  sellerJoinDate: string
  sellerSales: number
  guarantees: string[]
}

interface MarketplaceProductModalProps {
  product: MarketplaceProduct | null
  isOpen: boolean
  onClose: () => void
  onPurchase: (productId: number) => void
}

export function MarketplaceProductModal({ product, isOpen, onClose, onPurchase }: MarketplaceProductModalProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { toast } = useToast()

  if (!product) return null

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? `${product.title} removed from your wishlist`
        : `${product.title} added to your wishlist`,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this marketplace listing: ${product.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard",
      })
    }
  }

  const handlePurchase = () => {
    onPurchase(product.id)
    onClose()
  }

  // Mock additional images
  const productImages = [
    product.image,
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ]

  const progressPercentage = (product.remainingTickets / product.totalTickets) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-white">Product Details</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare} className="text-gray-400 hover:text-white">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlist}
              className={`${isWishlisted ? "text-red-400" : "text-gray-400"} hover:text-red-300`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-slate-800 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImageIndex] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-slate-800 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? "border-purple-500" : "border-transparent hover:border-slate-600"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Lottery Card Preview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <Award className="mr-2 h-4 w-4 text-yellow-400" />
                  Digital Lottery Ticket
                </h4>
                <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-lg p-4 text-white">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-bold">Lucky Deals & Draws</div>
                    <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                  </div>
                  <div className="text-lg font-mono mb-3">{product.ticketNumber}</div>
                  <div className="flex justify-between items-end text-sm">
                    <div>
                      <div className="opacity-80">Original Cost</div>
                      <div>₨{product.originalPrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="opacity-80">Draw Date</div>
                      <div>{new Date(product.drawDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge className="bg-yellow-600 text-black">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">{product.title}</h1>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-green-400">₨{product.price.toLocaleString()}</div>
                <Badge variant="outline" className="border-red-500 text-red-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {product.timeLeft}
                </Badge>
              </div>
              <div className="text-lg text-gray-500 line-through mb-2">₨{product.originalPrice.toLocaleString()}</div>
              <div className="text-sm text-green-400">
                You save: ₨{(product.originalPrice - product.price).toLocaleString()} (
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
              </div>
            </div>

            {/* Lottery Details */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">₨{product.prizeValue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Prize Value</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{product.remainingTickets}</div>
                  <div className="text-sm text-gray-400">Tickets Remaining</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>
                  Tickets Sold: {product.totalTickets - product.remainingTickets}/{product.totalTickets}
                </span>
                <span>{Math.round(100 - progressPercentage)}% sold</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${100 - progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Seller Information */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <User className="mr-2 h-4 w-4 text-blue-400" />
                  Seller Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white flex items-center gap-2">
                          {product.seller}
                          {product.isVerified && (
                            <Badge className="bg-green-600 text-white text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">Member since {product.sellerJoinDate}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {product.sellerRating}
                      </div>
                      <div className="text-sm text-gray-400">{product.sellerSales} sales</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Details */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-3">Ticket Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Condition</div>
                    <div className="text-white font-medium">{product.condition}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Purchase Date</div>
                    <div className="text-white font-medium">{new Date(product.purchaseDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Draw Date</div>
                    <div className="text-white font-medium">{new Date(product.drawDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Transfers</div>
                    <div className="text-white font-medium">{product.transferHistory}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guarantees */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-green-400" />
                  Buyer Protection
                </h4>
                <div className="space-y-2">
                  {product.guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {guarantee}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-lg py-6"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy Now - ₨{product.price.toLocaleString()}
              </Button>
              <div className="text-center text-sm text-gray-400">
                <Shield className="inline w-4 h-4 mr-1" />
                Secure payment • Buyer protection included
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
