"use client"

import { useState } from "react"
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Video,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const faqData = [
  {
    id: 1,
    question: "How do I purchase a lottery ticket?",
    answer:
      "To purchase a lottery ticket, browse our catalogue, select your desired lottery, choose the number of tickets, and complete the payment process using your preferred payment method.",
    category: "Getting Started",
  },
  {
    id: 2,
    question: "When will I know if I've won?",
    answer:
      "Lottery results are announced on the specified draw date. You'll receive notifications via email, SMS, and in-app notifications if you've won.",
    category: "Lottery Process",
  },
  {
    id: 3,
    question: "How do I add funds to my wallet?",
    answer:
      "Go to your Wallet page, click 'Add Funds', select your payment method, enter the amount, and confirm the transaction. Funds are usually available instantly.",
    category: "Payments",
  },
  {
    id: 4,
    question: "Can I sell my lottery tickets?",
    answer:
      "Yes! You can list your lottery tickets on our Marketplace. Other users can purchase them before the draw date. A small transaction fee applies.",
    category: "Marketplace",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards (Visa, MasterCard), bank transfers, and popular digital wallets. All transactions are secured with bank-level encryption.",
    category: "Payments",
  },
  {
    id: 6,
    question: "How are winners selected?",
    answer:
      "Winners are selected using a certified random number generator, witnessed by independent auditors. The process is completely transparent and fair.",
    category: "Lottery Process",
  },
]

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7 Available",
    action: "Start Chat",
    color: "bg-green-600",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our experts",
    availability: "Mon-Fri 9AM-6PM",
    action: "Call Now",
    color: "bg-blue-600",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    availability: "Response within 24hrs",
    action: "Send Email",
    color: "bg-purple-600",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(faqData.map((faq) => faq.category)))]

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're here to help! Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportChannels.map((channel, index) => (
            <Card
              key={index}
              className="bg-slate-900/60 border-slate-700/50 hover:border-purple-500/50 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${channel.color} mb-4`}>
                  <channel.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{channel.title}</h3>
                <p className="text-gray-400 mb-3">{channel.description}</p>
                <Badge variant="outline" className="border-gray-500 text-gray-400 mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  {channel.availability}
                </Badge>
                <Button className={`w-full ${channel.color} hover:opacity-90`}>{channel.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-700/50">
            <TabsTrigger value="faq" className="data-[state=active]:bg-purple-600">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guides" className="data-[state=active]:bg-purple-600">
              Guides
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-purple-600">
              Contact Us
            </TabsTrigger>
          </TabsList>

          {/* FAQ Section */}
          <TabsContent value="faq" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-slate-900/60 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "border-slate-600 text-gray-300 hover:bg-slate-800/50"
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="bg-slate-900/60 border-slate-700/50">
                  <CardContent className="p-0">
                    <button
                      className="w-full p-6 text-left hover:bg-slate-800/30 transition-colors"
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{faq.question}</h3>
                          <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6 border-t border-slate-700/50 pt-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <Card className="bg-slate-900/60 border-slate-700/50">
                <CardContent className="p-12 text-center">
                  <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                  <p className="text-gray-400">Try adjusting your search terms or browse all categories.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Guides Section */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900/60 border-slate-700/50 hover:border-purple-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Getting Started Guide</h3>
                      <p className="text-sm text-gray-400">5 min read</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Learn the basics of using Lucky D&D, from account setup to your first lottery purchase.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                  >
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-700/50 hover:border-purple-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mr-4">
                      <Video className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Video Tutorials</h3>
                      <p className="text-sm text-gray-400">10+ videos</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Watch step-by-step video tutorials covering all features of our platform.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent"
                  >
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-700/50 hover:border-purple-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Marketplace Guide</h3>
                      <p className="text-sm text-gray-400">8 min read</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Master the marketplace: buying, selling, and trading lottery tickets with other users.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                  >
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Form */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-slate-900/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Send us a message</CardTitle>
                <p className="text-gray-400">
                  Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <Input placeholder="Your full name" className="bg-slate-800/50 border-slate-600 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-slate-800/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <Input
                    placeholder="What can we help you with?"
                    className="bg-slate-800/50 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <Textarea
                    placeholder="Please describe your issue or question in detail..."
                    rows={6}
                    className="bg-slate-800/50 border-slate-600 text-white resize-none"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
