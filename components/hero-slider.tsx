"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Fashion Forward",
    subtitle: "Latest trends and styles",
    description:
      "Discover the newest fashion collections with exclusive deals on clothing, shoes, and accessories.",
    image:
      "https://images.unsplash.com/photo-1624222244232-5f1ae13bbd53?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Shop Fashion",
    href: "/marketplace",
    gradient: "from-pink-900/90 to-purple-900/90",
  },
  {
    id: 2,
    title: "Mega Tech Deals",
    subtitle: "Unbeatable offers on gadgets",
    description:
      "Get the latest tech gadgets with exclusive discounts and offers on smartphones, laptops, and more.",
    image:
      "https://images.unsplash.com/photo-1646771032500-27b440b2d947?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Shop Tech",
    href: "/marketplace",
    gradient: "from-purple-900/90 to-indigo-900/90",
  },
  {
    id: 3,
    title: "Home Essentials Sale",
    subtitle: "Upgrade your living space",
    description:
      "Explore stylish home goods and furniture to elevate your living space at great prices.",
    image:
      "https://plus.unsplash.com/premium_photo-1672109012124-4a8a760284ed?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Shop Home Goods",
    href: "/marketplace",
    gradient: "from-green-900/90 to-yellow-900/90",
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

  const goToSlide = (index) => {
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
            {/* Background Image */}
            <div>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              <div className={`absolute inset-0 bg-black opacity-60`} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className="text-center text-white max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-light">
                  {slide.subtitle}
                </p>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                  {slide.description}
                </p>
                <a
                  href={slide.href}
                  className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
