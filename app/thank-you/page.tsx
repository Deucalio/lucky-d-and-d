"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Check, Download, Share2, ArrowRight, Star, Gift, Sparkles, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import confetti from "canvas-confetti"

// Mock order data
const mockOrder = {
  id: "ORD-2024-001",
  date: new Date().toISOString(),
  product: {
    title: "iPhone 15 Pro Max Lottery Entry",
    brand: "Apple",
    image: "/placeholder.svg?height=200&width=200&text=iPhone+15+Pro+Max",
    ticketNumber: "LDD-2024-001234",
    prizeValue: 450000,
    drawDate: "2024-02-15",
  },
  seller: "TechLuxury_PK",
  amount: 16025,
  paymentMethod: "Credit Card",
  status: "Confirmed",
}

export default function ThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Trigger confetti animation
    if (showConfetti) {
      const duration = 3000
      const end = Date.now() + duration

      const colors = ["#8B5CF6", "#A855F7", "#C084FC", "#DDD6FE"]

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()

      // Stop confetti after duration
      setTimeout(() => setShowConfetti(false), duration)
    }
  }, [showConfetti])

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = {
      orderId: mockOrder.id,
      date: mockOrder.date,
      product: mockOrder.product.title,
      amount: mockOrder.amount,
      seller: mockOrder.seller,
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `receipt-${mockOrder.id}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Lucky Deals Purchase",
        text: `I just purchased a ${mockOrder.product.title} lottery ticket!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-slate-300 mb-4">Thank You for Your Purchase!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You have successfully purchased the product.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Order Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono font-medium">{mockOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Date</span>
                    <span>{new Date(mockOrder.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Method</span>
                    <span>{mockOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      {mockOrder.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Purchase</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex space-x-6">
                  <img
                    src={mockOrder.product.image || "/placeholder.svg"}
                    alt={mockOrder.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">{mockOrder.product.title}</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">{mockOrder.product.brand}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-gray-600">Seller: </span>
                        <span className="font-medium">{mockOrder.seller}</span>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">₨{mockOrder.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total Paid</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Digital Lottery Ticket */}
            <Card className="border-0 shadow-lg overflow-hidden hidden">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  Your Digital Lottery Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 rounded-xl p-6 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold">Lucky Deals & Draws</h3>
                        <p className="text-purple-200 text-sm">Premium Lottery Ticket</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Gift className="h-6 w-6 text-purple-800" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-purple-200 text-sm">Ticket Number</p>
                        <p className="text-2xl font-mono font-bold tracking-wider">{mockOrder.product.ticketNumber}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-purple-200 text-sm">Prize Value</p>
                          <p className="text-lg font-bold">₨{mockOrder.product.prizeValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-purple-200 text-sm">Draw Date</p>
                          <p className="text-lg font-bold">
                            {new Date(mockOrder.product.drawDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-purple-400">
                        <p className="text-purple-200 text-xs">
                          This ticket is now registered in your account. You will be notified of the draw results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={handleShare} variant="outline" className="w-full justify-start bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Purchase
                </Button>
                <Button onClick={() => router.push("/wallet")} variant="outline" className="w-full justify-start">
                  <Gift className="h-4 w-4 mr-2" />
                  View My Tickets
                </Button>
                <Separator />
                <Button
                  onClick={() => router.push("/marketplace")}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
                <Button onClick={() => router.push("/")} variant="ghost" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ticket Confirmed</p>
                      <p className="text-sm text-gray-600">Your lottery ticket is now active and registered</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Draw Notification</p>
                      <p className="text-sm text-gray-600">We'll notify you before and after the draw</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Results & Prizes</p>
                      <p className="text-sm text-gray-600">Winners will be contacted within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">Our support team is here to assist you 24/7</p>
                <Button
                  onClick={() => router.push("/support")}
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
