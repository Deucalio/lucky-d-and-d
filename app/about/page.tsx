import { Award, Shield, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent mb-6">
            About Lucky D&D
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {/* No more lottery stuff make it about marketplace and products */}
            Lucky D&D is a trusted platform where users can buy and sell premium
            products with ease. From exclusive deals to high-quality items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-300" />
              </div>
              <CardTitle className="text-white">Premium Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                High-quality, curated items ranging from luxury gadgets to
                exclusive fashion.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-violet-300" />
              </div>
              <CardTitle className="text-white">Secure Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Shop with confidence thanks to our secure payment methods and
                buyer protection.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-300" />
              </div>
              <CardTitle className="text-white">Exclusive Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Access member-only discounts and limited-time offers on top
                products.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-slate-900/50 border-slate-800/50">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-violet-300" />
              </div>
              <CardTitle className="text-white">Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Enjoy fast, reliable delivery right to your door, with real-time
                tracking updates.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/50 border-slate-800/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-gray-400 leading-relaxed mb-6">
                At Lucky D&D, we're redefining online shopping with a simple
                mission: to offer you the best premium products at unbeatable
                prices, all while ensuring a seamless, transparent, and
                trustworthy shopping experience.
              </p>

              <p className="text-gray-400 leading-relaxed mb-6">
                Whether you're hunting for high-end gadgets, exclusive fashion
                pieces, or unique home goods, we curate our collection with one
                thing in mind: delivering exceptional value straight to your
                doorstep.
              </p>

              <p className="text-gray-400 leading-relaxed">
                Every product on our platform is carefully selected to meet the
                highest standards of quality, giving you a shopping experience
                that's as rewarding as it is reliable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
