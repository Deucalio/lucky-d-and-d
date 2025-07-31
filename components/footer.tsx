import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-700 to-violet-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LD</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                Lucky D&D
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover premium products, and a shopping experience you can
              trust.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link href="/catalogue" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">
                  Lottery Catalogue
                </Link>
              </li> */}
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link href="/winners" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">
                  Recent Winners
                </Link>
              </li> */}
              <li>
                <Link
                  href="/marketplace"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link href="/terms" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400 text-sm">
                  Contactluckydd@gamil.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400 text-sm">+034222660007</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400 text-sm">
                  Hyderbad, Pakistan
                </span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xs text-gray-500">Licensed & Regulated</p>
              <p className="text-xs text-gray-500">Secure & Fair Gaming</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Lucky D&D. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-gray-500 hover:text-purple-300 transition-colors text-sm">
              Responsible
            </button>
            <button className="text-gray-500 hover:text-purple-300 transition-colors text-sm">
              Security
            </button>
            <button className="text-gray-500 hover:text-purple-300 transition-colors text-sm">
              Fair Play
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
