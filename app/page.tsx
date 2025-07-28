import Link from "next/link"
import { ArrowRight, Sparkles, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSlider } from "@/components/hero-slider"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Slider - At the very front */}
      <HeroSlider />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-700 to-violet-800 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-300 via-violet-300 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight">
              Welcome to Lucky Deals and Draws
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
              Your premier destination for{" "}
              <span className="font-semibold text-purple-300">exclusive lottery experiences</span> with amazing prizes
              and fair draws.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-700 to-violet-800 hover:from-purple-800 hover:to-violet-900 font-semibold text-lg px-8 py-4 h-auto"
            >
              <Link href="/catalogue">
                Browse All Cards
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-purple-700 text-purple-300 hover:bg-slate-800/50 bg-transparent font-medium text-lg px-8 py-4 h-auto"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-6">
              <Trophy className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="font-bold text-2xl mb-4 text-white">Premium Prizes</h3>
            <p className="text-gray-400 leading-relaxed">
              Win luxury items, cash prizes, and exclusive experiences worth thousands of dollars
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-6">
              <Users className="w-8 h-8 text-violet-300" />
            </div>
            <h3 className="font-bold text-2xl mb-4 text-white">Fair & Transparent</h3>
            <p className="text-gray-400 leading-relaxed">
              Every draw is conducted fairly with complete transparency and verified by independent auditors
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-6">
              <Sparkles className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="font-bold text-2xl mb-4 text-white">Exclusive Access</h3>
            <p className="text-gray-400 leading-relaxed">
              Limited cards available for each premium lottery, ensuring better odds for our members
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center hidden">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Trusted by <span className="text-purple-300">Thousands</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-300 mb-2">2,847</div>
              <div className="text-gray-400">Happy Winners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-violet-300 mb-2">$12.5M</div>
              <div className="text-gray-400">Prizes Awarded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-300 mb-2">156</div>
              <div className="text-gray-400">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-violet-300 mb-2">4.9★</div>
              <div className="text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
