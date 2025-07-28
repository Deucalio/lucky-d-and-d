"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Share2, Eye, Grid, List } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock wishlist data
const initialWishlistItems = [
  {
    id: 1,
    title: "Tesla Model S Plaid",
    description: "Experience the future of automotive technology",
    price: 140000,
    originalPrice: 160000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Automotive",
    drawDate: "2024-02-25",
    ticketsRemaining: 89,
    totalTickets: 300,
    color: "red",
    addedDate: "2024-01-15",
    prizeValue: 42000000,
    featured: false,
  },
  {
    id: 2,
    title: "Rolex Submariner",
    description: "Luxury Swiss timepiece with precision engineering",
    price: 63000,
    originalPrice: 70000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Luxury",
    drawDate: "2024-03-01",
    ticketsRemaining: 67,
    totalTickets: 200,
    color: "gold",
    addedDate: "2024-01-12",
    prizeValue: 12600000,
    featured: true,
  },
  {
    id: 3,
    title: "Diamond Necklace",
    description: "Exquisite diamond necklace with 5-carat pendant",
    price: 105000,
    originalPrice: 120000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Jewelry",
    drawDate: "2024-03-20",
    ticketsRemaining: 156,
    totalTickets: 250,
    color: "gold",
    addedDate: "2024-01-10",
    prizeValue: 21000000,
    featured: true,
  },
  {
    id: 4,
    title: "Harley Davidson Sportster",
    description: "Iconic American motorcycle with premium accessories",
    price: 119000,
    originalPrice: 130000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Automotive",
    drawDate: "2024-03-10",
    ticketsRemaining: 56,
    totalTickets: 200,
    color: "orange",
    addedDate: "2024-01-08",
    prizeValue: 23800000,
    featured: false,
  },
  {
    id: 5,
    title: "iPad Pro M2 12.9",
    description: "Ultimate iPad experience with M2 chip",
    price: 11200,
    originalPrice: 13000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Apple Technology",
    drawDate: "2024-03-05",
    ticketsRemaining: 145,
    totalTickets: 200,
    color: "blue",
    addedDate: "2024-01-05",
    prizeValue: 2240000,
    featured: false,
  },
]

const categories = ["All Categories", "Automotive", "Luxury", "Jewelry", "Apple Technology"]
const sortOptions = ["Recently Added", "Price: Low to High", "Price: High to Low", "Draw Date", "Prize Value"]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("Recently Added")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (id: number) => {
    // In a real app, this would add to cart
    console.log(`Added item ${id} to cart`)
  }

  const shareItem = (item: any) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this amazing lottery: ${item.title}`,
        url: window.location.href,
      })
    }
  }

  const getCardBackground = (color: string) => {
    switch (color) {
      case "red":
        return "from-red-600 to-red-800"
      case "gold":
        return "from-yellow-600 to-yellow-800"
      case "orange":
        return "from-orange-600 to-orange-800"
      case "blue":
        return "from-blue-600 to-blue-800"
      default:
        return "from-slate-600 to-slate-800"
    }
  }

  // Filter and sort items
  const filteredItems = wishlistItems.filter(
    (item) => selectedCategory === "All Categories" || item.category === selectedCategory,
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Draw Date":
        return new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime()
      case "Prize Value":
        return b.prizeValue - a.prizeValue
      default: // Recently Added
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
  })

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-16 h-16 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h1>
              <p className="text-gray-400 mb-8">
                Save your favorite lottery tickets here so you can easily find them later!
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                <Link href="/catalogue">
                  <Heart className="mr-2 h-4 w-4" />
                  Browse Lotteries
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-4">
            My Wishlist
          </h1>
          <p className="text-xl text-gray-400">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved for later
          </p>
        </div>

        {/* Filters and Controls */}
        <Card className="bg-slate-900/60 border-slate-700/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-purple-600" : "border-slate-600 text-gray-300 bg-transparent"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-purple-600" : "border-slate-600 text-gray-300 bg-transparent"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Items */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <Card
                key={item.id}
                className="bg-slate-900/60 border-slate-700/50 overflow-hidden group hover:border-purple-500/50 transition-colors"
              >
                <div className="relative">
                  {/* Lottery Card Preview */}
                  <div className={`bg-gradient-to-br ${getCardBackground(item.color)} p-4 aspect-[1.6/1] relative`}>
                    {item.featured && (
                      <Badge className="absolute top-2 left-2 bg-yellow-600 text-black text-xs">Featured</Badge>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => shareItem(item)}
                        className="w-8 h-8 bg-black/30 hover:bg-black/50 text-white"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-8 h-8 bg-black/30 hover:bg-black/50 text-red-400"
                      >
                        <Heart className="h-3 w-3 fill-current" />
                      </Button>
                    </div>

                    <div className="text-white h-full flex flex-col justify-between">
                      <div className="text-sm font-bold">Lucky Deals & Draws</div>
                      <div>
                        <div className="text-xs opacity-80 mb-1">Entry Cost</div>
                        <div className="font-medium">₨{item.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="p-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg border border-slate-700"
                    />
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                      <Badge variant="outline" className="border-purple-500 text-purple-400 mt-2">
                        {item.category}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Prize Value</p>
                        <p className="font-bold text-green-400">₨{item.prizeValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Draw Date</p>
                        <p className="text-white font-medium">{new Date(item.drawDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>
                          Tickets: {item.ticketsRemaining}/{item.totalTickets}
                        </span>
                        <span>{Math.round((item.ticketsRemaining / item.totalTickets) * 100)}% left</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${(item.ticketsRemaining / item.totalTickets) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl font-bold text-green-400">₨{item.price.toLocaleString()}</div>
                        {item.originalPrice > item.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₨{item.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">Added {new Date(item.addedDate).toLocaleDateString()}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(item.id)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent"
                      >
                        <Link href={`/catalogue/${item.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <Card
                key={item.id}
                className="bg-slate-900/60 border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-colors"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/4 p-4">
                      <div
                        className={`bg-gradient-to-br ${getCardBackground(item.color)} rounded-lg p-3 aspect-[1.6/1] relative mb-3`}
                      >
                        {item.featured && (
                          <Badge className="absolute top-1 left-1 bg-yellow-600 text-black text-xs">Featured</Badge>
                        )}
                        <div className="text-white h-full flex flex-col justify-between">
                          <div className="text-xs font-bold">Lucky Deals & Draws</div>
                          <div>
                            <div className="text-xs opacity-80">Entry Cost</div>
                            <div className="text-sm font-medium">₨{item.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-20 object-cover rounded border border-slate-700"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                          <Badge variant="outline" className="border-purple-500 text-purple-400">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => shareItem(item)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-400">Prize Value</p>
                          <p className="font-bold text-green-400">₨{item.prizeValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Draw Date</p>
                          <p className="text-white font-medium">{new Date(item.drawDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Tickets Left</p>
                          <p className="text-white font-medium">
                            {item.ticketsRemaining}/{item.totalTickets}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Added</p>
                          <p className="text-white font-medium">{new Date(item.addedDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400">₨{item.price.toLocaleString()}</div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-500 line-through">
                              ₨{item.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => addToCart(item.id)}
                            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent"
                          >
                            <Link href={`/catalogue/${item.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                // Add all to cart logic
                sortedItems.forEach((item) => addToCart(item.id))
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart ({sortedItems.length})
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent"
            >
              <Link href="/catalogue">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
