"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Wallet, Shield, Lock, Check, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

// Mock product data (in real app, this would come from API)
const mockProduct = {
  id: 1,
  title: "iPhone 15 Pro Max Lottery Entry",
  brand: "Apple",
  price: 12500,
  originalPrice: 15000,
  seller: "TechLuxury_PK",
  sellerRating: 4.9,
  image: "/placeholder.svg?height=200&width=200&text=iPhone+15+Pro+Max",
  ticketNumber: "LDD-2024-001234",
  prizeValue: 450000,
  drawDate: "2024-02-15",
  condition: "Mint",
  guarantees: ["100% Authentic", "Instant Transfer", "Full Refund Protection", "24/7 Support"],
}

// Mock user's digital cards
const userDigitalCards = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra Card",
    value: 15000,
    cardNumber: "DLC-2024-001",
    expiryDate: "2024-12-31",
    type: "lottery-win",
  },
  {
    id: 2,
    name: "PlayStation 5 Pro Card",
    value: 8500,
    cardNumber: "DLC-2024-002",
    expiryDate: "2024-11-30",
    type: "lottery-win",
  },
  {
    id: 3,
    name: "MacBook Air M3 Card",
    value: 20000,
    cardNumber: "DLC-2024-003",
    expiryDate: "2024-10-15",
    type: "lottery-win",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")

  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "digital-card">("credit-card")
  const [selectedDigitalCard, setSelectedDigitalCard] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const product = mockProduct // In real app, fetch based on productId

  const subtotal = product.price
  const processingFee = Math.round(subtotal * 0.025) // 2.5% processing fee
  const tax = Math.round(subtotal * 0.17) // 17% tax
  const total = subtotal + processingFee + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToTerms) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Redirect to thank you page
    router.push("/thank-you?orderId=ORD-2024-001&productId=" + productId)
  }

  const canProceed =
    paymentMethod === "credit-card"
      ? formData.email &&
        formData.firstName &&
        formData.lastName &&
        formData.cardNumber &&
        formData.expiryDate &&
        formData.cvv &&
        agreeToTerms
      : selectedDigitalCard && formData.email && formData.firstName && formData.lastName && agreeToTerms

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          <h1 className="text-3xl font-light text-gray-900">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Karachi"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="75500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pakistan">Pakistan</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="credit-card" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit/Debit Card
                    </TabsTrigger>
                    {/* <TabsTrigger value="digital-card" className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2" />
                      Digital Lottery Card
                    </TabsTrigger> */}
                  </TabsList>

                  <TabsContent value="credit-card" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        placeholder="Hamad Ali"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="digital-card" className="space-y-4 mt-6">
                    <div>
                      <Label>Select Digital Card</Label>
                      <div className="space-y-3 mt-2">
                        {userDigitalCards.map((card) => (
                          <div
                            key={card.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedDigitalCard === card.id.toString()
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedDigitalCard(card.id.toString())}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{card.name}</h4>
                                <p className="text-sm text-gray-600">Card: {card.cardNumber}</p>
                                <p className="text-sm text-gray-600">Expires: {card.expiryDate}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">₨{card.value.toLocaleString()}</div>
                                {card.value >= total && (
                                  <Badge className="bg-green-100 text-green-800 mt-1">Sufficient Balance</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedDigitalCard && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center text-blue-800">
                            <Shield className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              Your digital card will be debited ₨{total.toLocaleString()} upon successful purchase.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="terms" className="cursor-pointer">
                      I agree to the{" "}
                      <a href="#" className="text-purple-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </a>
                      . I understand that this is a digital lottery ticket purchase and all sales are final.
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Details */}
                <div className="flex space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{product.title}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
                    <p className="text-xs text-gray-600">Ticket: {product.ticketNumber}</p>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-gray-600">{product.seller}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span>{product.sellerRating}</span>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₨{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee (2.5%)</span>
                    <span>₨{processingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (17%)</span>
                    <span>₨{tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₨{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center text-green-800 mb-2">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Buyer Protection</span>
                  </div>
                  <div className="space-y-1">
                    {product.guarantees.map((guarantee, index) => (
                      <div key={index} className="flex items-center text-xs text-green-700">
                        <Check className="h-3 w-3 mr-2" />
                        {guarantee}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prize Information */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Prize Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Prize Value</span>
                      <span className="font-medium text-purple-900">₨{product.prizeValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Draw Date</span>
                      <span className="font-medium text-purple-900">
                        {new Date(product.drawDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Condition</span>
                      <span className="font-medium text-purple-900">{product.condition}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    disabled={!canProceed || isProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white py-3 text-lg font-medium"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Complete Purchase - ₨${total.toLocaleString()}`
                    )}
                  </Button>
                </form>

                {/* Security Notice */}
                <div className="text-center text-xs text-gray-500">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Your payment information is encrypted and secure
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
