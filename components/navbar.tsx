"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Menu,
  User,
  LayoutDashboard,
  History,
  Wallet,
  Gift,
  Heart,
  ShoppingCart,
  LogIn,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const mainNavigationItems = [
  { name: "Home", href: "/" },
  // { name: "Catalogue", href: "/catalogue" },
  { name: "Marketplace", href: "/marketplace" }, // Public page - visible to everyone
  // { name: "Winners", href: "/winners" }, // Public page
  { name: "About", href: "/about" },
  { name: "Certifications", href: "/certifications" }, // Public page
];

const userMenuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // { name: "History", href: "/history", icon: History },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  // { name: "Rewards", href: "/rewards", icon: Gift },
  { name: "Referral", href: "/referral", icon: Users }, // Auth required
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // You can change this to test logged out state
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock cart and wishlist counts - in real app, these would come from context/state
  const cartCount = 3;
  const wishlistCount = 5;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowLoginMenu(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowLoginMenu(false);
    }, 300); // 300ms delay before hiding
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-700 to-violet-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">LD</span>
            </div> */}
            <img src="/logo.png" alt="Logo" className="h-44 w-44" />
            <span className="font-bold text-xl text-white bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
              Lucky D&D
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNavigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 text-white py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-800/50 hover:text-purple-200 ${
                  pathname === item.href
                    ? "bg-slate-800/70 text-white-200"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {/* Pakistan Flag */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-800/50"
                >
                  {/*   <div className="w-6 h-4 rounded-sm overflow-hidden border border-slate-600">
                    <div className="w-full h-1/2 bg-green-600"></div>
                    <div className="w-full h-1/2 bg-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full relative">
                        <div className="absolute -right-0.5 top-0 w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div> */}
                  <img
                    src="https://www.svgrepo.com/show/405576/flag-for-flag-pakistan.svg"
                    className="w-6 h-4"
                  />
                </Button>

                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-slate-800/50"
                  asChild
                >
                  <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600 hover:bg-red-600">
                        {wishlistCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* Cart */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-slate-800/50"
                  asChild
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-700 hover:bg-purple-700">
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-slate-800/50"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-700 hover:bg-purple-700">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 hover:bg-slate-800/50"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-700 to-violet-800 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">Hamad Ali</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-card border-slate-800/50"
                  >
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">Hamad Ali</p>
                      <p className="text-xs text-muted-foreground">
                        hamad141@gmail.com
                      </p>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-800/50" />
                    {userMenuItems.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-slate-800/50" />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-400"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              /* Not logged in - Show hover menu with better timing */
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-800/50"
                >
                  <User className="h-5 w-5" />
                </Button>

                {/* Login/Signup Menu */}
                <div
                  className={`absolute right-0 top-full mt-2 w-48 bg-card border border-slate-800/50 rounded-md shadow-lg z-50 transition-all duration-200 ${
                    showLoginMenu
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                  }`}
                >
                  <div className="p-2 space-y-2">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-purple-700 to-violet-800 hover:from-purple-800 hover:to-violet-900"
                      onClick={() => {
                        setIsLoggedIn(true);
                        setShowLoginMenu(false);
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-700 hover:bg-slate-800/50 bg-transparent"
                      onClick={() => setShowLoginMenu(false)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-slate-800/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-card border-slate-800/50"
            >
              <div className="flex flex-col space-y-4 mt-8">
                {mainNavigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-slate-800/70 text-purple-200"
                        : "text-muted-foreground hover:bg-slate-800/50 hover:text-purple-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {isLoggedIn ? (
                  <div className="pt-4 border-t border-slate-800/50">
                    <div className="flex items-center space-x-3 px-3 py-2 mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-700 to-violet-800 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Hamad Ali</p>
                        <p className="text-xs text-muted-foreground">
                          hamad141@gmail.com
                        </p>
                      </div>
                    </div>

                    {/* Mobile additional links */}
                    <Link
                      href="/wishlist"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-slate-800/50 hover:text-purple-200"
                    >
                      <div className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </div>
                      {wishlistCount > 0 && (
                        <Badge className="bg-red-600 text-white">
                          {wishlistCount}
                        </Badge>
                      )}
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-slate-800/50 hover:text-purple-200"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Cart
                      </div>
                      {cartCount > 0 && (
                        <Badge className="bg-purple-700 text-white">
                          {cartCount}
                        </Badge>
                      )}
                    </Link>

                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-slate-800/50 hover:text-purple-200"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="pt-4 border-t border-slate-800/50 space-y-2">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-purple-700 to-violet-800 hover:from-purple-800 hover:to-violet-900"
                      onClick={() => {
                        setIsLoggedIn(true);
                        setIsOpen(false);
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-700 hover:bg-slate-800/50 bg-transparent"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
