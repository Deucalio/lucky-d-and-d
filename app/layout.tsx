import type React from "react";
import type { Metadata } from "next";
import { Inter, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import { Footer } from "@/components/footer";



const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Lucky D&D - Premium Products Platform",
  description: "Buy Premium Products at the best prices",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${openSans.variable} font-inter flex flex-col min-h-screen`}
      >
        <LoadingScreen />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
