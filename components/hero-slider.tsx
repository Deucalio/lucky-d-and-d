"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";

const slides = [
  {
    id: 2,
    title: "Mega Tech Deals",
    subtitle: "Unbeatable offers on gadgets",
    description:
      "Get the latest tech gadgets with exclusive discounts and offers on smartphones, laptops, and more.",
    image: "/images/tech-deals-slide.png", // Replace with actual tech image URL
    cta: "Shop Tech",
    href: "/catalogue?category=technology",
    gradient: "from-purple-900/90 to-indigo-900/90",
  },
  {
    id: 3,
    title: "Home Essentials Sale",
    subtitle: "Upgrade your living space",
    description:
      "Explore stylish home goods and furniture to elevate your living space at great prices.",
    image: "/images/home-essentials-slide.png", // Replace with actual home essentials image URL
    cta: "Shop Home Goods",
    href: "/catalogue?category=home",
    gradient: "from-green-900/90 to-yellow-900/90",
  },
  {
    id: 4,
    title: "Cashback Offers",
    subtitle: "Instant rewards and savings",
    description:
      "Enjoy cashback offers on your purchases, making every shopping experience even more rewarding.",
    image: "/images/cashback-offers-slide.png", // Replace with actual cashback image URL
    cta: "Claim Cashback",
    href: "/catalogue?category=offers",
    gradient: "from-orange-900/90 to-red-900/90",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="relative h-[70vh] md:h-[80vh] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background */}
            {slide.hasVideo ? (
              /* Video Background for first slide */
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg?height=500&width=800"
                >
                  <source src={slide.video} type="video/mp4" />
                  {/* Fallback image if video fails */}
                  <img
                    src="/placeholder.svg?height=500&width=800"
                    alt="Animated background"
                    className="w-full h-full object-cover"
                  />
                </video>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                />
              </div>
            ) : slide.isJackpot ? (
              /* Jackpot Slide Design */
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                                       radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                    }}
                  />
                </div>
              </div>
            ) : (
              /* Regular Image Background */
              <div>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
                />
              </div>
            )}

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                {slide.isJackpot ? (
                  /* Enhanced Jackpot Layout */
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center h-full">
                    {/* Left side - Coin Jar Animation */}
                    <div className="flex justify-center lg:justify-start">
                      <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full relative overflow-hidden border-4 border-gray-300 shadow-2xl">
                          {/* Coins inside jar */}
                          <div className="absolute inset-2 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                            <div className="text-4xl md:text-5xl animate-bounce">
                              💰
                            </div>
                          </div>
                          {/* Floating coins */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 shadow-lg"></div>
                          </div>
                        </div>
                        {/* Hand dropping coin */}
                        <div className="absolute -top-16 -right-8 text-4xl animate-pulse">
                          ✋
                        </div>
                      </div>
                    </div>

                    {/* Center - Gold Bars Stack */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="grid grid-cols-2 gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="w-16 h-8 md:w-20 md:h-10 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-sm shadow-lg border border-yellow-700 flex items-center justify-center transform hover:scale-105 transition-transform"
                              style={{
                                transform: `rotate(${
                                  (i % 2) * 5 - 2.5
                                }deg) translateY(${i * -2}px)`,
                              }}
                            >
                              <div className="text-xs font-bold text-yellow-900">
                                GOLD
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Sparkle effects */}
                        <div className="absolute -top-4 -right-4 text-2xl animate-spin">
                          ✨
                        </div>
                        <div className="absolute -bottom-4 -left-4 text-xl animate-pulse">
                          💎
                        </div>
                      </div>
                    </div>

                    {/* Right side - Jackpot Info */}
                    <div className="text-center lg:text-right space-y-6">
                      <div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-2 drop-shadow-lg">
                          MEGA
                        </h1>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">
                          JACKPOT
                        </h2>
                        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 inline-block">
                          <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-2">
                            ${slide.jackpotAmount}
                          </div>
                          <div className="text-lg md:text-xl text-yellow-200">
                            {slide.currency}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Countdown Timer */}
                      <div className="flex justify-center lg:justify-end">
                        <CountdownTimer
                          targetDate={slide.endDate!}
                          className="scale-90 md:scale-100"
                        />
                      </div>

                      {/* Participants with animation */}
                      <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-3 inline-block">
                        <div className="text-xl md:text-2xl font-bold text-white">
                          <span className="text-yellow-400 animate-pulse">
                            {slide.participants.toLocaleString()}
                          </span>{" "}
                          participants
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Button
                          asChild
                          size="lg"
                          className="bg-gray-900 text-yellow-400 hover:bg-gray-800 hover:text-yellow-300 text-lg px-8 py-4 rounded-xl font-bold shadow-2xl transform hover:scale-105 transition-all border-2 border-yellow-400"
                        >
                          <Link href={slide.href}>
                            {slide.cta}
                            <ArrowRight className="ml-2 h-6 w-6" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular Slide Layout */
                  <div className="max-w-2xl text-white">
                    <div className="space-y-6">
                      <div>
                        <p className="text-purple-200 text-sm md:text-base font-medium mb-2 opacity-90">
                          {slide.subtitle}
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-xl">
                          {slide.description}
                        </p>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3"
                      >
                        <Link href={slide.href}>
                          {slide.cta}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-0 w-12 h-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-0 w-12 h-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}
