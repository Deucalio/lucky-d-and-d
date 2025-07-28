"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        {/* Clean Infinity Symbol */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative">
            {/* Main Infinity Symbol */}
            <img src="" alt="Infinity Symbol" className="h-full w-full" />

            {/* Floating particles around infinity */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400/60 rounded-full animate-ping"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Loading text with better animation */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent animate-pulse">
            Lucky D&D
          </h2>

          {/* Improved loading dots */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-400 text-lg">Loading</span>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-64 mx-auto">
            <div className="w-full bg-slate-800 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-purple-600 to-violet-600 h-1 rounded-full animate-pulse"
                style={{
                  width: "100%",
                  animation: "loadingProgress 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500/10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-violet-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}
