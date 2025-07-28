"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Gift, ArrowRight, Heart, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import Link from "next/link"

let initialCartItems: any = [];
// Mock cart data
// let initialCartItems = [
//   {
//     id: 1,
//     title: "iPhone 15 Pro Max",
//     description: "Latest flagship smartphone with titanium design",
//     price: 35000,
//     originalPrice: 40000,
//     quantity: 2,
//     image: "/placeholder.svg?height=100&width=100",
//     category: "Apple Technology",
//     drawDate: "2024-02-15",
//     ticketsRemaining: 45,
//     totalTickets: 200,
//     color: "blue",
//   },
//   {
//     id: 2,
//     title: "MacBook Pro M3 Max",
//     description: "16-inch MacBook Pro with M3 Max chip",
//     price: 49000,
//     originalPrice: 55000,
//     quantity: 1,
//     image: "/placeholder.svg?height=100&width=100",
//     category: "Apple Technology",
//     drawDate: "2024-02-20",
//     ticketsRemaining: 92,
//     totalTickets: 150,
//     color: "purple",
//   },
//   {
//     id: 3,
//     title: "Gaming Setup Ultimate",
//     description: "High-end gaming PC with RTX 4090",
//     price: 21000,
//     originalPrice: 25000,
//     quantity: 1,
//     image: "/placeholder.svg?height=100&width=100",
//     category: "Gaming",
//     drawDate: "2024-02-25",
//     ticketsRemaining: 23,
//     totalTickets: 100,
//     color: "orange",
//   },
// ]

const promoOffers = [
  {
    id: 1,
    title: "First Purchase Bonus",
    description: "Get 10% off your first purchase",
    discount: 10,
    minAmount: 50000,
    code: "FIRST10",
  },
  {
    id: 2,
    title: "Bundle Deal",
    description: "Buy 3 or more tickets and save 15%",
    discount: 15,
    minItems: 3,
    code: "BUNDLE15",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<any>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.min(newQuantity, 10) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const moveToWishlist = (id: number) => {
    // In a real app, this would add to wishlist and remove from cart
    removeItem(id)
    // Show success message
  }

  const applyPromoCode = () => {
    const promo = promoOffers.find((offer) => offer.code === promoCode.toUpperCase())
    if (promo) {
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      if (promo.minAmount && subtotal < promo.minAmount) {
        alert(`Minimum order amount of ₨${promo.minAmount.toLocaleString()} required`)
        return
      }

      if (promo.minItems && totalItems < promo.minItems) {
        alert(`Minimum ${promo.minItems} items required`)
        return
      }

      setAppliedPromo(promo)
    } else {
      alert("Invalid promo code")
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    setPromoCode("")
  }

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const tax = Math.round((subtotal - promoDiscount) * 0.17) // 17% tax in Pakistan
  const total = subtotal - promoDiscount + tax

  const getCardBackground = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-blue-800"
      case "purple":
        return "from-purple-600 to-purple-800"
      case "orange":
        return "from-orange-600 to-orange-800"
      default:
        return "from-slate-600 to-slate-800"
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
              <p className="text-gray-400 mb-8">
                Looks like you haven't added any products to your cart yet. Browse our amazing collection!
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                <Link href="/marketplace">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-gray-400">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="bg-slate-900/60 border-slate-700/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Item Image & Card Preview */}
                    <div className="md:w-1/3 p-6">
                      <div
                        className={`bg-gradient-to-br ${getCardBackground(item.color)} rounded-xl p-4 aspect-[1.6/1] relative mb-4`}
                      >
                        <div className="text-white text-sm font-bold mb-2">Lucky D&D</div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white text-xs opacity-80 mb-1">Entry Cost</div>
                          <div className="text-white font-medium">₨{item.price.toLocaleString()}</div>
                        </div>
                        <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-300 rounded-full"></div>
                      </div>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-24 object-cover rounded-lg border border-slate-700"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                          <Badge variant="outline" className="border-purple-500 text-purple-400 mb-2">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
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
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-slate-800/50 rounded-lg border border-slate-600">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-10 w-10 rounded-l-lg hover:bg-slate-700"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="px-4 py-2 text-white font-semibold min-w-[50px] text-center">
                              {item.quantity}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="h-10 w-10 rounded-r-lg hover:bg-slate-700"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveToWishlist(item.id)}
                            className="border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent"
                          >
                            <Heart className="mr-2 h-4 w-4" />
                            Move to Wishlist
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            ₨{(item.price * item.quantity).toLocaleString()}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-500 line-through">
                              ₨{(item.originalPrice * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Promo Offers */}
            <Card className="bg-slate-900/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-yellow-400" />
                  Available Offers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {promoOffers.map((offer) => (
                  <div key={offer.id} className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{offer.title}</h4>
                      <p className="text-sm text-gray-400">{offer.description}</p>
                      <Badge className="mt-1 bg-yellow-600 text-black">{offer.code}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">{offer.discount}% OFF</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card className="bg-slate-900/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-600/20 border border-green-500/50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-400">{appliedPromo.code}</p>
                      <p className="text-sm text-green-300">{appliedPromo.discount}% discount applied</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removePromoCode}
                      className="text-green-400 hover:text-green-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-white"
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-slate-900/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">₨{subtotal.toLocaleString()}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">You Save</span>
                      <span className="text-green-400">-₨{savings.toLocaleString()}</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Promo Discount ({appliedPromo.discount}%)</span>
                      <span className="text-green-400">-₨{promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax (17%)</span>
                    <span className="text-white">₨{tax.toLocaleString()}</span>
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-green-400">₨{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-lg py-6">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent"
                  >
                    <Link href="/catalogue">
                      Continue Shopping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-center text-sm text-gray-400">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    Secure checkout with 256-bit SSL encryption
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-slate-900/60 border-slate-700/50">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-400">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Entries</div>
                  <div className="text-xs text-gray-500">Across {cartItems.length} different lotteries</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
