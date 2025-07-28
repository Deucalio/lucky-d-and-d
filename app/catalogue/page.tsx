"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LotteryProductCard } from "@/components/lottery-product-card"
import { CategoryFilter } from "@/components/category-filter"
import { Pagination } from "@/components/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Expanded mock data with more items for pagination
const lotteries = [
  {
    id: 1,
    name: "Lucky Gold Coin",
    status: "active",
    description:
      "With the LuckyDeals coin, luck will always be on your side! This premium gold-plated collectible coin brings fortune and prosperity to its owner.",
    prize_pool: 33600000.0, // 120,000 * 280
    entry_cost: 84000.0, // 300 * 280
    total_tickets: 200,
    sold_tickets: 101,
    end_time: new Date("2024-02-15T23:59:59"),
    created_at: new Date("2024-01-01T00:00:00"),
    updated_at: new Date("2024-01-10T12:00:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Money",
      featured: true,
      color: "gold",
      prize_title: "Lucky Gold Coin",
      prize_description: "Premium collectible gold coin with certificate of authenticity",
    },
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro Max",
    status: "active",
    description:
      "Get a chance to win the latest Apple iPhone 15 Pro Max with all premium features. The minimal bezels increase the screen area significantly, providing an immersive experience.",
    prize_pool: 7000000.0, // 25,000 * 280
    entry_cost: 35000.0, // 125 * 280
    total_tickets: 200,
    sold_tickets: 89,
    end_time: new Date("2024-02-20T23:59:59"),
    created_at: new Date("2024-01-05T00:00:00"),
    updated_at: new Date("2024-01-12T15:30:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Apple technology",
      featured: false,
      color: "blue",
      prize_title: "Apple iPhone 15 Pro Max",
      prize_description: "Latest flagship smartphone with titanium design and advanced camera system",
    },
  },
  {
    id: 3,
    name: "MacBook Pro M3 Max",
    status: "active",
    description:
      "Win the most powerful MacBook Pro ever created. Perfect for professionals and creators who demand the best performance and reliability.",
    prize_pool: 9800000.0,
    entry_cost: 49000.0,
    total_tickets: 200,
    sold_tickets: 156,
    end_time: new Date("2024-02-10T23:59:59"),
    created_at: new Date("2024-01-03T00:00:00"),
    updated_at: new Date("2024-01-11T09:15:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Apple technology",
      featured: true,
      color: "purple",
      prize_title: "MacBook Pro M3 Max",
      prize_description: "16-inch MacBook Pro with M3 Max chip, 64GB RAM, and 2TB SSD",
    },
  },
  {
    id: 4,
    name: "Tesla Model S Plaid",
    status: "active",
    description:
      "Experience the future of automotive technology with this high-performance electric vehicle. Zero to 60 mph in under 2 seconds with cutting-edge autopilot.",
    prize_pool: 42000000.0,
    entry_cost: 140000.0,
    total_tickets: 300,
    sold_tickets: 234,
    end_time: new Date("2024-02-25T23:59:59"),
    created_at: new Date("2024-01-02T00:00:00"),
    updated_at: new Date("2024-01-13T14:20:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Machinery",
      featured: false,
      color: "red",
      prize_title: "Tesla Model S Plaid",
      prize_description: "Tri-motor all-wheel drive with 1,020 horsepower and 405-mile range",
    },
  },
  {
    id: 5,
    name: "Gaming Setup Ultimate",
    status: "active",
    description:
      "Complete gaming battlestation with RTX 4090, 4K monitors, premium peripherals, and custom RGB lighting setup for the ultimate gaming experience.",
    prize_pool: 4200000.0,
    entry_cost: 21000.0,
    total_tickets: 200,
    sold_tickets: 67,
    end_time: new Date("2024-02-18T23:59:59"),
    created_at: new Date("2024-01-04T00:00:00"),
    updated_at: new Date("2024-01-14T11:45:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Machinery",
      featured: true,
      color: "orange",
      prize_title: "Ultimate Gaming Setup",
      prize_description: "High-end gaming PC with RTX 4090, dual 4K monitors, and premium accessories",
    },
  },
  {
    id: 6,
    name: "Premium Gift Card Bundle",
    status: "active",
    description:
      "Flexible spending power with a collection of premium gift cards. Shop for anything you want across multiple platforms and retailers worldwide.",
    prize_pool: 1400000.0,
    entry_cost: 7000.0,
    total_tickets: 200,
    sold_tickets: 123,
    end_time: new Date("2024-02-28T23:59:59"),
    created_at: new Date("2024-01-06T00:00:00"),
    updated_at: new Date("2024-01-15T16:30:00"),
    lottery_info: {
      image: null, // No image for gift cards
      category: "Gift card",
      featured: false,
      color: "indigo",
      prize_title: "Premium Gift Card Bundle",
      prize_description: "$5,000 worth of gift cards for Amazon, Apple Store, and other retailers",
    },
  },
  {
    id: 7,
    name: "Rolex Submariner",
    status: "active",
    description:
      "Luxury Swiss timepiece that combines precision engineering with timeless design. A symbol of excellence and prestige.",
    prize_pool: 12600000.0,
    entry_cost: 63000.0,
    total_tickets: 200,
    sold_tickets: 78,
    end_time: new Date("2024-03-01T23:59:59"),
    created_at: new Date("2024-01-07T00:00:00"),
    updated_at: new Date("2024-01-16T10:30:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Money",
      featured: true,
      color: "gold",
      prize_title: "Rolex Submariner",
      prize_description: "Authentic Rolex Submariner with ceramic bezel and automatic movement",
    },
  },
  {
    id: 8,
    name: "iPad Pro M2 12.9",
    status: "active",
    description:
      "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and support for Apple Pencil hover for creative professionals.",
    prize_pool: 2240000.0,
    entry_cost: 11200.0,
    total_tickets: 200,
    sold_tickets: 145,
    end_time: new Date("2024-03-05T23:59:59"),
    created_at: new Date("2024-01-08T00:00:00"),
    updated_at: new Date("2024-01-17T14:15:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Apple technology",
      featured: false,
      color: "blue",
      prize_title: "iPad Pro M2 12.9",
      prize_description: "12.9-inch iPad Pro with M2 chip, 1TB storage, and Magic Keyboard",
    },
  },
  {
    id: 9,
    name: "Harley Davidson Sportster",
    status: "active",
    description:
      "Iconic American motorcycle that delivers raw power and freedom on the open road. Perfect for adventure seekers and motorcycle enthusiasts.",
    prize_pool: 23800000.0,
    entry_cost: 119000.0,
    total_tickets: 200,
    sold_tickets: 56,
    end_time: new Date("2024-03-10T23:59:59"),
    created_at: new Date("2024-01-09T00:00:00"),
    updated_at: new Date("2024-01-18T16:45:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Machinery",
      featured: true,
      color: "orange",
      prize_title: "Harley Davidson Sportster",
      prize_description: "2024 Harley Davidson Sportster S with premium accessories package",
    },
  },
  {
    id: 10,
    name: "Steam Gift Card Mega Pack",
    status: "active",
    description:
      "Gaming enthusiast's dream with Steam gift cards totaling $2,000. Build your ultimate game library with the latest releases and classics.",
    prize_pool: 560000.0,
    entry_cost: 2800.0,
    total_tickets: 200,
    sold_tickets: 167,
    end_time: new Date("2024-03-12T23:59:59"),
    created_at: new Date("2024-01-10T00:00:00"),
    updated_at: new Date("2024-01-19T11:20:00"),
    lottery_info: {
      image: null, // No image for gift cards
      category: "Gift card",
      featured: false,
      color: "indigo",
      prize_title: "Steam Gift Card Mega Pack",
      prize_description: "$2,000 worth of Steam gift cards for unlimited gaming possibilities",
    },
  },
  {
    id: 11,
    name: "Apple Watch Ultra 2",
    status: "active",
    description:
      "The most rugged and capable Apple Watch designed for endurance athletes and outdoor adventurers. Built to withstand extreme conditions.",
    prize_pool: 1260000.0,
    entry_cost: 6300.0,
    total_tickets: 200,
    sold_tickets: 92,
    end_time: new Date("2024-03-15T23:59:59"),
    created_at: new Date("2024-01-11T00:00:00"),
    updated_at: new Date("2024-01-20T09:30:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Apple technology",
      featured: false,
      color: "blue",
      prize_title: "Apple Watch Ultra 2",
      prize_description: "49mm titanium case with Ocean Band and precision dual-frequency GPS",
    },
  },
  {
    id: 12,
    name: "Diamond Necklace",
    status: "active",
    description:
      "Exquisite diamond necklace crafted with precision and elegance. A timeless piece that represents luxury and sophistication.",
    prize_pool: 21000000.0,
    entry_cost: 105000.0,
    total_tickets: 200,
    sold_tickets: 34,
    end_time: new Date("2024-03-20T23:59:59"),
    created_at: new Date("2024-01-12T00:00:00"),
    updated_at: new Date("2024-01-21T13:45:00"),
    lottery_info: {
      image: "/placeholder.svg?height=400&width=400",
      category: "Money",
      featured: true,
      color: "gold",
      prize_title: "Diamond Necklace",
      prize_description: "18K white gold necklace with 5-carat diamond pendant and certificate",
    },
  },
]

const categories = ["All categories", "Money", "Apple technology", "Machinery", "Gift card"]

const itemsPerPageOptions = [6, 12, 18, 24]

export default function CataloguePage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All categories")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This should come from your auth context

  // Filter lotteries based on selected category
  const filteredLotteries =
    selectedCategory === "All categories"
      ? lotteries
      : lotteries.filter((lottery) => lottery.lottery_info?.category === selectedCategory)

  // Calculate pagination
  const totalItems = filteredLotteries.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLotteries = filteredLotteries.slice(startIndex, endIndex)

  // Reset to first page when category or items per page changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1)
  }

  const handleAuthRequired = () => {
    if (!isLoggedIn) {
      router.push("/login") // You'll need to create this page
      return false
    }
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative overflow-hidden">
      {/* Dark Gradient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-slate-800/20 to-gray-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-gray-800/20 to-slate-700/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-slate-700/10 to-gray-700/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 via-transparent to-gray-950/50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/30 via-transparent to-slate-900/30"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center relative">
          {/* Dark glowing background for title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-32 bg-gradient-to-r from-transparent via-slate-500/5 to-transparent blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-200 via-slate-300 to-gray-200 bg-clip-text text-transparent mb-6 tracking-tight leading-none">
              Catalog
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-slate-500 to-gray-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover our <span className="font-bold text-slate-300">premium collection</span> of exclusive lottery
              experiences designed for winners
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Controls Bar with Dark Gradient */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 bg-gradient-to-r from-slate-900/60 via-gray-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 shadow-2xl">
          <div className="text-gray-300 text-lg">
            Showing{" "}
            <span className="font-bold text-slate-300 text-xl">
              {startIndex + 1}-{Math.min(endIndex, totalItems)}
            </span>{" "}
            of <span className="font-bold text-slate-300 text-xl">{totalItems}</span> premium items
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-300">Items per page:</span>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-24 bg-slate-800/70 border-slate-600 text-lg font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()} className="text-lg">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Section with Enhanced Dark Gradients */}
        <div className="relative mb-16">
          {/* Dark gradient container background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-gray-900/30 to-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-700/20 shadow-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/10 via-transparent to-gray-800/10 rounded-3xl"></div>

          <div className="relative z-10 p-8 md:p-12">
            {/* Dark decorative elements */}
            <div className="absolute top-0 left-1/4 w-40 h-40 bg-gradient-to-r from-slate-600/10 to-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-gray-600/10 to-slate-600/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>

            <div className="relative z-10">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                  PREMIUM LOTTERY COLLECTION
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-500 mx-auto rounded-full"></div>
              </div>

              {/* Lottery Grid */}
              {currentLotteries.length > 0 ? (
                <div className="space-y-12">
                  {currentLotteries.map((lottery, index) => (
                    <div key={lottery.id} className="relative">
                      {/* Item number indicator with dark theme */}
                      <div className="absolute -left-4 top-8 z-20">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center shadow-lg border border-slate-500">
                          <span className="font-bold text-white text-lg">{startIndex + index + 1}</span>
                        </div>
                      </div>

                      <LotteryProductCard
                        lottery={lottery}
                        onAuthRequired={handleAuthRequired}
                        isLoggedIn={isLoggedIn}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-gray-300 text-2xl mb-6 font-bold tracking-wide">NO ITEMS FOUND</div>
                  <p className="text-gray-400 text-lg">
                    Try selecting a different category or check back later for new premium items.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination with Dark Gradient */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-slate-900/70 via-gray-800/70 to-slate-900/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 shadow-xl">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
