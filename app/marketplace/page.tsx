"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  ShoppingBag,
  Star,
  ChevronRight,
  Grid3X3,
  List,
  SlidersHorizontal,
  User,
  Mail,
  ArrowRight,
  Clock,
  Shield,
  Truck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MarketplaceProductModal } from "@/components/marketplace-product-modal";
import { useRouter } from "next/navigation";

// Enhanced marketplace data with luxury focus
const marketplaceItems = [
  {
    id: 1,
    title: "iPhone 15 Pro Max Entry",
    brand: "Apple",
    description:
      "Premium entry for the latest iPhone 15 Pro Max. Titanium finish, 1TB storage.",
    price: 12500,
    originalPrice: 15000,
    seller: "TechLuxury_PK",
    sellerRating: 4.9,
    category: "Technology",
    subcategory: "Smartphones",
    timeLeft: "2 days",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1695048054797-7559d0c0e9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1695048054797-7559d0c0e9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 200,
    remainingTickets: 45,
    featured: true,
    isNew: true,
    isTrending: true,
    prizeValue: 450000,
    drawDate: "2024-02-15",
    purchaseDate: "2024-01-10",
    ticketNumber: "LDD-2024-001234",
    condition: "Mint",
    transferHistory: 0,
    sellerJoinDate: "January 2023",
    sellerSales: 47,
    guarantees: [
      "100% Authentic",
      "Instant Transfer",
      "Full Refund Protection",
      "24/7 Support",
    ],
    tags: ["Premium", "Latest Model", "High Value"],
  },
  {
    id: 2,
    title: "Nike Air Jordan 1 Retro High OG",
    brand: "Nike",
    description:
      "Exclusive Nike Air Jordan 1 Retro High OG. Premium leather, iconic design.",
    price: 45000,
    originalPrice: 50000,
    seller: "SneakerElite",
    sellerRating: 4.8,
    category: "Fashion",
    subcategory: "Sneakers",
    timeLeft: "5 days",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 300,
    remainingTickets: 89,
    featured: false,
    isNew: false,
    isTrending: true,
    prizeValue: 4200000,
    drawDate: "2024-02-25",
    purchaseDate: "2024-01-05",
    ticketNumber: "LDD-2024-002345",
    condition: "Perfect",
    transferHistory: 1,
    sellerJoinDate: "March 2023",
    sellerSales: 23,
    guarantees: [
      "Verified Authentic",
      "Blockchain Transfer",
      "Money-back Guarantee",
      "Priority Support",
    ],
    tags: ["Sneakers", "Luxury", "Iconic"],
  },
  {
    id: 3,
    title: "Gaming Setup Ultimate Bundle",
    brand: "Custom Build",
    description:
      "Complete high-end gaming setup with RTX 4090, 4K monitors, and premium peripherals.",
    price: 8500,
    originalPrice: 10000,
    seller: "GamingElite_PK",
    sellerRating: 4.7,
    category: "Gaming",
    subcategory: "PC Gaming",
    timeLeft: "1 day",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 150,
    remainingTickets: 23,
    featured: true,
    isNew: true,
    isTrending: false,
    prizeValue: 420000,
    drawDate: "2024-02-18",
    purchaseDate: "2024-01-08",
    ticketNumber: "LDD-2024-003456",
    condition: "Mint",
    transferHistory: 0,
    sellerJoinDate: "June 2023",
    sellerSales: 31,
    guarantees: [
      "Original Receipt",
      "Immediate Delivery",
      "Authenticity Guarantee",
      "Expert Support",
    ],
    tags: ["Gaming", "High-End", "Complete Setup"],
  },
  {
    id: 4,
    title: "Rolex Submariner Date",
    brand: "Rolex",
    description:
      "Iconic luxury timepiece. Stainless steel, ceramic bezel, automatic movement.",
    price: 22500,
    originalPrice: 25000,
    seller: "LuxuryTimepieces",
    sellerRating: 5.0,
    category: "Luxury",
    subcategory: "Watches",
    timeLeft: "3 days",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 200,
    remainingTickets: 67,
    featured: false,
    isNew: false,
    isTrending: true,
    prizeValue: 1260000,
    drawDate: "2024-03-01",
    purchaseDate: "2024-01-12",
    ticketNumber: "LDD-2024-004567",
    condition: "Excellent",
    transferHistory: 2,
    sellerJoinDate: "October 2022",
    sellerSales: 89,
    guarantees: [
      "Certificate of Authenticity",
      "Insured Transfer",
      "30-day Return",
      "Premium Support",
    ],
    tags: ["Swiss Made", "Luxury", "Investment Grade"],
  },
  {
    id: 5,
    title: "MacBook Pro M3 Max 16-inch",
    brand: "Apple",
    description:
      "Professional-grade laptop for creators. M3 Max chip, 64GB RAM, 2TB SSD.",
    price: 17500,
    originalPrice: 20000,
    seller: "CreativePro_LHR",
    sellerRating: 4.6,
    category: "Technology",
    subcategory: "Laptops",
    timeLeft: "4 days",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 180,
    remainingTickets: 92,
    featured: true,
    isNew: true,
    isTrending: false,
    prizeValue: 650000,
    drawDate: "2024-02-20",
    purchaseDate: "2024-01-15",
    ticketNumber: "LDD-2024-005678",
    condition: "Perfect",
    transferHistory: 0,
    sellerJoinDate: "August 2023",
    sellerSales: 15,
    guarantees: [
      "Brand New Guarantee",
      "Fast Processing",
      "Buyer Protection",
      "Technical Support",
    ],
    tags: ["Professional", "Creator", "High Performance"],
  },
  {
    id: 6,
    title: "Diamond Tennis Necklace",
    brand: "Tiffany & Co.",
    description:
      "Exquisite 5-carat diamond tennis necklace. VVS1 clarity, D color grade.",
    price: 37500,
    originalPrice: 40000,
    seller: "DiamondCollection",
    sellerRating: 4.9,
    category: "Jewelry",
    subcategory: "Necklaces",
    timeLeft: "6 days",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 250,
    remainingTickets: 156,
    featured: false,
    isNew: false,
    isTrending: true,
    prizeValue: 2100000,
    drawDate: "2024-03-20",
    purchaseDate: "2024-01-20",
    ticketNumber: "LDD-2024-006789",
    condition: "Mint",
    transferHistory: 1,
    sellerJoinDate: "December 2022",
    sellerSales: 67,
    guarantees: [
      "GIA Certified",
      "Secure Vault Storage",
      "Insurance Coverage",
      "White-glove Service",
    ],
    tags: ["Certified Diamonds", "Investment", "Luxury"],
  },
  {
    id: 7,
    title: "Hermès Birkin 35 Togo Leather",
    brand: "Hermès",
    description:
      "Iconic luxury handbag in Étoupe Togo leather with palladium hardware.",
    price: 85000,
    originalPrice: 90000,
    seller: "LuxuryBags_PK",
    sellerRating: 4.8,
    category: "Fashion",
    subcategory: "Handbags",
    timeLeft: "7 days",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1506629905138-23ac9d87d3b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 400,
    remainingTickets: 234,
    featured: true,
    isNew: true,
    isTrending: true,
    prizeValue: 3500000,
    drawDate: "2024-03-15",
    purchaseDate: "2024-01-25",
    ticketNumber: "LDD-2024-007890",
    condition: "Mint",
    transferHistory: 0,
    sellerJoinDate: "September 2022",
    sellerSales: 156,
    guarantees: [
      "Authenticity Guaranteed",
      "Original Receipt",
      "Dust Bag Included",
      "Concierge Service",
    ],
    tags: ["Iconic", "Investment Piece", "Rare"],
  },
  {
    id: 8,
    title: "PlayStation 5 Pro Bundle",
    brand: "Sony",
    description:
      "Latest gaming console with 2TB SSD, extra controller, and premium games collection.",
    price: 6500,
    originalPrice: 8000,
    seller: "GamingHub_KHI",
    sellerRating: 4.5,
    category: "Gaming",
    subcategory: "Consoles",
    timeLeft: "3 days",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 120,
    remainingTickets: 78,
    featured: false,
    isNew: true,
    isTrending: false,
    prizeValue: 180000,
    drawDate: "2024-02-22",
    purchaseDate: "2024-01-18",
    ticketNumber: "LDD-2024-008901",
    condition: "Perfect",
    transferHistory: 0,
    sellerJoinDate: "November 2023",
    sellerSales: 8,
    guarantees: [
      "Factory Sealed",
      "Warranty Included",
      "Fast Shipping",
      "Customer Support",
    ],
    tags: ["Gaming", "Latest", "Bundle"],
  },

{
  id: 9,
  title: "New Era 9FIFTY Snapback Premium",
  brand: "New Era",
  description:
    "Limited edition premium snapback cap. Structured crown, flat brim, premium wool blend fabric.",
  price: 8500,
  originalPrice: 12000,
  seller: "CapCollection_PK",
  sellerRating: 4.8,
  category: "Fashion",
  subcategory: "Headwear",
  timeLeft: "5 days",
  images: [
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    "https://images.unsplash.com/photo-1575428652377-a0ad3739ff65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    "https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  ],
  isVerified: true,
  totalTickets: 180,
  remainingTickets: 124,
  featured: false,
  isNew: false,
  isTrending: true,
  prizeValue: 35000,
  drawDate: "2024-02-28",
  purchaseDate: "2024-01-22",
  ticketNumber: "LDD-2024-009012",
  condition: "Excellent",
  transferHistory: 1,
  sellerJoinDate: "July 2023",
  sellerSales: 34,
  guarantees: [
    "100% Authentic",
    "Limited Edition",
    "Original Tags",
    "Fast Shipping",
  ],
  tags: ["Premium", "Streetwear", "Limited Edition"],
},
  {
    id: 10,
    title: "Omega Speedmaster Professional",
    brand: "Omega",
    description:
      "Moonwatch heritage. Manual winding, hesalite crystal, legendary chronograph.",
    price: 19500,
    originalPrice: 22000,
    seller: "WatchCollector_ISB",
    sellerRating: 4.9,
    category: "Luxury",
    subcategory: "Watches",
    timeLeft: "4 days",
    images: [
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1523170335258-f5c216cf6f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 160,
    remainingTickets: 89,
    featured: true,
    isNew: false,
    isTrending: false,
    prizeValue: 720000,
    drawDate: "2024-03-05",
    purchaseDate: "2024-01-28",
    ticketNumber: "LDD-2024-010123",
    condition: "Mint",
    transferHistory: 0,
    sellerJoinDate: "April 2023",
    sellerSales: 67,
    guarantees: [
      "Master Chronometer",
      "Warranty Card",
      "Original Box",
      "Service History",
    ],
    tags: ["Heritage", "Space Qualified", "Collectible"],
  },
  {
    id: 11,
    title: "Nike Air Max 90 Premium",
    brand: "Nike",
    description:
      "Classic Nike Air Max 90 in premium leather. Iconic visible Air unit, retro styling.",
    price: 25000,
    originalPrice: 28000,
    seller: "SneakerVault_PK",
    sellerRating: 4.8,
    category: "Fashion",
    subcategory: "Sneakers",
    timeLeft: "6 days",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    ],
    isVerified: true,
    totalTickets: 220,
    remainingTickets: 145,
    featured: false,
    isNew: true,
    isTrending: true,
    prizeValue: 85000,
    drawDate: "2024-03-08",
    purchaseDate: "2024-01-30",
    ticketNumber: "LDD-2024-011234",
    condition: "Perfect",
    transferHistory: 0,
    sellerJoinDate: "February 2023",
    sellerSales: 42,
    guarantees: [
      "100% Original",
      "Fast Delivery",
      "Return Guarantee",
      "Customer Care",
    ],
    tags: ["Classic", "Premium", "Collector's Item"],
  },
];

// Additional high-quality image alternatives for specific categories:

// Rolex/Luxury Watches
const watchImages = [
  "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1523170335258-f5c216cf6f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
];

// Gaming Setup
const gamingImages = [
  "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
];

// Nike Shoes
const nikeImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
];

const categories = [
  { name: "All Categories", count: marketplaceItems.length },
  {
    name: "Technology",
    count: marketplaceItems.filter((item) => item.category === "Technology")
      .length,
  },
  {
    name: "Luxury",
    count: marketplaceItems.filter((item) => item.category === "Luxury").length,
  },
  {
    name: "Gaming",
    count: marketplaceItems.filter((item) => item.category === "Gaming").length,
  },
  {
    name: "Automotive",
    count: marketplaceItems.filter((item) => item.category === "Automotive")
      .length,
  },
  {
    name: "Fashion",
    count: marketplaceItems.filter((item) => item.category === "Fashion")
      .length,
  },
  {
    name: "Jewelry",
    count: marketplaceItems.filter((item) => item.category === "Jewelry")
      .length,
  },
];

const subcategories = [
  "Smartphones",
  "Laptops",
  "Watches",
  "Handbags",
  "Necklaces",
  "Electric Vehicles",
  "PC Gaming",
  "Consoles",
];

const brands = [
  "Apple",
  "Tesla",
  "Rolex",
  "Hermès",
  "Tiffany & Co.",
  "Sony",
  "Custom Build",
  "Louis Vuitton",
  "Omega",
];


const heroSlides = [
  {
    id: 1,
    title: "New Season Arrivals",
    subtitle: "Discover the latest luxury collections",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: "Shop New Arrivals",
  },
  {
    id: 2,
    title: "Trending Now",
    subtitle: "Most sought-after items this week",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: "Explore Trending",
  },
  {
    id: 3,
    title: "Editor's Picks",
    subtitle: "Curated selection of premium items",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: "View Collection",
  },
];

export default function MarketplacePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle product hover image cycling
  useEffect(() => {
    if (hoveredProductId) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const product = marketplaceItems.find(
            (item) => item.id === hoveredProductId
          );
          if (!product) return prev;
          const currentIndex = prev[hoveredProductId] || 0;
          const nextIndex = (currentIndex + 1) % product.images.length;
          return { ...prev, [hoveredProductId]: nextIndex };
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [hoveredProductId]);

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;
    const matchesSubcategory =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(item.subcategory);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.brand);
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesSale = !showOnSale || item.price < item.originalPrice;
    const matchesNew = !showNewOnly || item.isNew;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSubcategory &&
      matchesBrand &&
      matchesPrice &&
      matchesSale &&
      matchesNew
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return (
          new Date(b.purchaseDate).getTime() -
          new Date(a.purchaseDate).getTime()
        );
      case "popular":
        return (
          b.totalTickets -
          b.remainingTickets -
          (a.totalTickets - a.remainingTickets)
        );
      default:
        return b.featured ? 1 : -1;
    }
  });

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handlePurchase = (productId: number) => {
    router.push(`/checkout?productId=${productId}`);
  };

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 100000]);
    setShowOnSale(false);
    setShowNewOnly(false);
    setSearchQuery("");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", newsletterEmail);
    setNewsletterEmail("");
    // You could show a success message here
  };

const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-medium text-white mb-3 text-sm">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:border-purple-500 text-sm"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <h3 ClassName="font-medium text-white mb-3 text-sm">Quick Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={showOnSale}
              onCheckedChange={setShowOnSale}
            />
            <label htmlFor="on-sale" className="text-sm text-gray-300">
              On Sale
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-arrivals"
              checked={showNewOnly}
              onCheckedChange={setShowNewOnly}
            />
            <label htmlFor="new-arrivals" className="text-sm text-gray-300">
              New Arrivals
            </label>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium text-white mb-3 text-sm">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category.name
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-800/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="truncate">{category.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({category.count})
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {selectedCategory !== "All Categories" && (
        <div>
          <h3 className="font-medium text-white mb-3 text-sm">Subcategories</h3>
          <div className="space-y-2">
            {subcategories
              .filter((sub) =>
                marketplaceItems.some(
                  (item) =>
                    item.subcategory === sub &&
                    (selectedCategory === "All Categories" ||
                      item.category === selectedCategory)
                )
              )
              .map((subcategory) => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={subcategory}
                    checked={selectedSubcategories.includes(subcategory)}
                    onCheckedChange={() => toggleSubcategory(subcategory)}
                  />
                  <label
                    htmlFor={subcategory}
                    className="text-sm text-gray-300 truncate"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Brands */}
      <div>
        <h3 className="font-medium text-white mb-3 text-sm">Brands</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label htmlFor={brand} className="text-sm text-gray-300 truncate">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-white mb-3 text-sm">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            min={0}
            step={1000}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>₨{priceRange[0].toLocaleString()}</span>
            <span>₨{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearAllFilters}
        className="w-full border-slate-700 text-gray-300 hover:bg-slate-800/50 bg-transparent text-sm"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">

      {/* Hero Carousel - Mobile Optimized */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2 sm:mb-4 tracking-wide text-white">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8 font-light opacity-90">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-purple-500" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        {/* Curated sections */}
        <div className="mb-12 sm:mb-16 space-y-12 sm:space-y-16">
          {/* New In */}
          <section>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-light text-white">New In</h2>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white text-sm sm:text-base"
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {marketplaceItems
                .filter((item) => item.isNew)
                .slice(0, 4)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer border-0 shadow-none bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300"
                    onMouseEnter={() => {
                      setHoveredProductId(item.id);
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [item.id]: 0,
                      }));
                    }}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden mb-3 sm:mb-4 rounded-lg">
                        <img
                          src={
                            hoveredProductId === item.id
                              ? item.images[currentImageIndex[item.id] || 0] ||
                                item.images[0]
                              : item.images[0] || "/placeholder.svg"
                          }
                          alt={item.title}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs">
                          New Season
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 sm:w-10 sm:h-10"
                        >
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <div className="space-y-1 p-2 sm:p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          {item.brand}
                        </p>
                        <h3 className="font-medium text-white line-clamp-2 text-sm sm:text-base">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-green-400 text-sm sm:text-base">
                            ₨{item.price.toLocaleString()}
                          </span>
                          {item.price < item.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              ₨{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>

          {/* Best of Sale */}
          <section>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-light text-white">Best of Sale</h2>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white text-sm sm:text-base"
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {marketplaceItems
                .filter((item) => item.price < item.originalPrice)
                .slice(0, 4)
                .map((item) => {
                  const discountPercent = Math.round(
                    ((item.originalPrice - item.price) / item.originalPrice) *
                      100
                  );
                  return (
                    <Card
                      key={item.id}
                      className="group cursor-pointer border-0 shadow-none bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300"
                      onMouseEnter={() => {
                        setHoveredProductId(item.id);
                        setCurrentImageIndex((prev) => ({
                          ...prev,
                          [item.id]: 0,
                        }));
                      }}
                      onMouseLeave={() => setHoveredProductId(null)}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden mb-3 sm:mb-4 rounded-lg">
                          <img
                            src={
                              hoveredProductId === item.id
                                ? item.images[
                                    currentImageIndex[item.id] || 0
                                  ] || item.images[0]
                                : item.images[0] || "/placeholder.svg"
                            }
                            alt={item.title}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-600 text-white text-xs">
                            -{discountPercent}%
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 sm:w-10 sm:h-10"
                          >
                            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                        <div className="space-y-1 p-2 sm:p-4">
                          <p className="text-xs text-gray-400 uppercase tracking-wide">
                            {item.brand}
                          </p>
                          <h3 className="font-medium text-white line-clamp-2 text-sm sm:text-base">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-red-400 text-sm sm:text-base">
                              ₨{item.price.toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              ₨{item.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </section>

          {/* Trending Now - Horizontal Scroll for Mobile */}
          <section>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-light text-white">Trending Now</h2>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white text-sm sm:text-base"
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-3 sm:space-x-6 overflow-x-auto pb-4 -mx-3 px-3 sm:mx-0 sm:px-0">
              {marketplaceItems
                .filter((item) => item.isTrending).slice(0,5)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer border-0 shadow-none flex-shrink-0 w-40 sm:w-64 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300"
                    onMouseEnter={() => {
                      setHoveredProductId(item.id);
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [item.id]: 0,
                      }));
                    }}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden mb-3 sm:mb-4 rounded-lg">
                        <img
                          src={
                            hoveredProductId === item.id
                              ? item.images[currentImageIndex[item.id] || 0] ||
                                item.images[0]
                              : item.images[0] || "/placeholder.svg"
                          }
                          alt={item.title}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r bg-purple-700 text-white text-xs">
                          Trending
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 sm:w-10 sm:h-10"
                        >
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <div className="space-y-1 p-2 sm:p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          {item.brand}
                        </p>
                        <h3 className="font-medium text-white line-clamp-2 text-sm sm:text-base">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-green-400 text-sm sm:text-base">
                            ₨{item.price.toLocaleString()}
                          </span>
                          {item.price < item.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              ₨{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>

          {/* Trust & Security Section - Mobile Optimized */}
          <section className="py-12 sm:py-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
                Why Choose Our Marketplace
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Experience secure, verified transactions with complete buyer
                protection
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-white mb-2">
                  Buyer Protection
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  100% secure transactions with full refund guarantee
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-white mb-2">
                  Verified Sellers
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  All sellers are verified and rated by our community
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-white mb-2">
                  Instant Transfer
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Digital lottery tickets transferred immediately
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-white mb-2">
                  24/7 Support
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Round-the-clock customer service and assistance
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Main Product Listing */}
        <div className="flex gap-4 sm:gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-white">Filters</h2>
                  <SlidersHorizontal className="h-5 w-5 text-gray-400" />
                </div>
                <FilterContent />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-slate-700/50 space-y-4 sm:space-y-0">
              <div className="flex items-center justify-between sm:justify-start space-x-4">
                <h2 className="text-lg sm:text-2xl font-light text-white">
                  All Products ({sortedItems.length})
                </h2>

                {/* Mobile Filter Button */}
                <Sheet
                  open={isMobileFiltersOpen}
                  onOpenChange={setIsMobileFiltersOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden bg-slate-800/50 border-slate-700 text-white"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-80 bg-slate-900 border-slate-700 p-4"
                  >
                    <SheetHeader className="mb-4">
                      <SheetTitle className="text-white">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-slate-700 rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none bg-slate-800/50 text-white hover:bg-slate-700/50 px-2 sm:px-3"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none bg-slate-800/50 text-white hover:bg-slate-700/50 px-2 sm:px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 sm:w-48 bg-slate-800/50 border-slate-700 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="featured" className="text-white">
                      Featured
                    </SelectItem>
                    <SelectItem value="newest" className="text-white">
                      Newest First
                    </SelectItem>
                    <SelectItem value="price-low" className="text-white">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high" className="text-white">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="popular" className="text-white">
                      Most Popular
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid - Mobile Optimized */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {sortedItems.map((item) => {
                  const discountPercent =
                    item.price < item.originalPrice
                      ? Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                            100
                        )
                      : 0;

                  return (
                    <Card
                      key={item.id}
                      className="group cursor-pointer border-0 shadow-none bg-slate-900/60 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
                      onMouseEnter={() => {
                        setHoveredProductId(item.id);
                        setCurrentImageIndex((prev) => ({
                          ...prev,
                          [item.id]: 0,
                        }));
                      }}
                      onMouseLeave={() => setHoveredProductId(null)}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden mb-3 sm:mb-4 rounded-lg">
                          <img
                            src={
                              hoveredProductId === item.id
                                ? item.images[
                                    currentImageIndex[item.id] || 0
                                  ] || item.images[0]
                                : item.images[0] || "/placeholder.svg"
                            }
                            alt={item.title}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Badges */}
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col space-y-1">
                            {item.isNew && (
                              <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs">
                                New
                              </Badge>
                            )}
                            {discountPercent > 0 && (
                              <Badge className="bg-red-600 text-white text-xs">
                                -{discountPercent}%
                              </Badge>
                            )}
                            {item.isTrending && (
                              <Badge className="bg-orange-500 text-white text-xs">
                                Trending
                              </Badge>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10"
                            >
                              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(item)}
                              className="bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10"
                            >
                              <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>

                          {/* Quick Add to Cart - Hidden on mobile */}
                          <Button
                            onClick={() => handlePurchase(item.id)}
                            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-sm sm:text-base py-1 sm:py-2 hidden sm:flex items-center justify-center"
                          >
                            <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Quick Buy
                          </Button>
                        </div>

                        <div className="space-y-1 sm:space-y-2 p-2 sm:p-4">
                          <p className="text-xs text-gray-400 uppercase tracking-wide">
                            {item.brand}
                          </p>
                          <h3 className="font-medium text-white line-clamp-2 group-hover:text-gray-300 transition-colors text-sm sm:text-base">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`font-medium text-sm sm:text-base ${
                                discountPercent > 0
                                  ? "text-red-400"
                                  : "text-green-400"
                              }`}
                            >
                              ₨{item.price.toLocaleString()}
                            </span>
                            {discountPercent > 0 && (
                              <span className="text-xs sm:text-sm text-gray-500 line-through">
                                ₨{item.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Seller Info */}
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span className="truncate">{item.seller}</span>
                            <div className="flex items-center ml-2">
                              <Star className="h-3 w-3 fill-current text-yellow-400 mr-1" />
                              {item.sellerRating}
                            </div>
                          </div>

                          {/* Mobile Buy Button */}
                          <Button
                            onClick={() => handlePurchase(item.id)}
                            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-sm py-2 sm:hidden"
                          >
                            <ShoppingBag className="h-3 w-3 mr-2" />
                            Buy Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* List View - Mobile Optimized */
              <div className="space-y-3 sm:space-y-4">
                {sortedItems.map((item) => {
                  const discountPercent =
                    item.price < item.originalPrice
                      ? Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                            100
                        )
                      : 0;

                  return (
                    <Card
                      key={item.id}
                      className="group cursor-pointer bg-slate-900/60 border-slate-700/50 hover:bg-slate-900/80 hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="p-3 sm:p-6">
                        <div className="flex space-x-3 sm:space-x-6">
                          <div className="relative w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0">
                            <img
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                            {discountPercent > 0 && (
                              <Badge className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-600 text-white text-xs">
                                -{discountPercent}%
                              </Badge>
                            )}
                          </div>

                          <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                {item.brand}
                              </p>
                              <h3 className="text-sm sm:text-lg font-medium text-white group-hover:text-gray-300 transition-colors line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 hidden sm:block">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-base sm:text-lg font-medium ${
                                    discountPercent > 0
                                      ? "text-red-400"
                                      : "text-green-400"
                                  }`}
                                >
                                  ₨{item.price.toLocaleString()}
                                </span>
                                {discountPercent > 0 && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₨{item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center text-xs sm:text-sm text-gray-400">
                                <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="truncate max-w-24 sm:max-w-none">{item.seller}</span>
                                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current text-yellow-400 ml-2 mr-1" />
                                {item.sellerRating}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <Button
                                onClick={() => handleViewDetails(item)}
                                variant="outline"
                                size="sm"
                                className="border-slate-700 text-gray-300 hover:bg-slate-800/50 bg-transparent text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                              >
                                Details
                              </Button>
                              <Button
                                onClick={() => handlePurchase(item.id)}
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 flex-1 sm:flex-none"
                              >
                                <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                Buy Now
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white p-1 sm:p-2"
                              >
                                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {sortedItems.length === 0 && (
              <div className="text-center py-12 sm:py-16 px-4">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-400 mb-6 sm:text-base text-sm">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="border-slate-700 text-gray-300 hover:bg-slate-800/50 bg-transparent"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section - Mobile Optimized */}
        <section className="mt-16 sm:mt-24 py-12 sm:py-16 bg-gradient-to-r from-purple-900/20 to-violet-900/20 rounded-2xl border border-purple-500/20 mx-3 sm:mx-0">
          <div className="text-center max-w-2xl mx-auto px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4">
              Never miss a thing
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
              Sign up for promotions, tailored new arrivals, stock updates and
              more – straight to your inbox
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto"
            >
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="pl-10 sm:pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:border-purple-500 h-12 text-sm sm:text-base"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 h-12 text-sm sm:text-base"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </section>

        {/* Product Details Modal */}
        <MarketplaceProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
} 