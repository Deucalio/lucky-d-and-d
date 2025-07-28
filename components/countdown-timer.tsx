"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-gray-900 rounded-xl px-3 py-3 text-center min-w-[70px] shadow-lg border border-gray-700">
        <div className="text-2xl md:text-3xl font-bold text-yellow-400">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-300 font-medium">Days</div>
      </div>
      <div className="text-yellow-400 text-3xl font-bold animate-pulse">:</div>
      <div className="bg-gray-900 rounded-xl px-3 py-3 text-center min-w-[70px] shadow-lg border border-gray-700">
        <div className="text-2xl md:text-3xl font-bold text-yellow-400">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-300 font-medium">Hours</div>
      </div>
      <div className="text-yellow-400 text-3xl font-bold animate-pulse">:</div>
      <div className="bg-gray-900 rounded-xl px-3 py-3 text-center min-w-[70px] shadow-lg border border-gray-700">
        <div className="text-2xl md:text-3xl font-bold text-yellow-400">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-300 font-medium">Minutes</div>
      </div>
      <div className="text-yellow-400 text-3xl font-bold animate-pulse">:</div>
      <div className="bg-gray-900 rounded-xl px-3 py-3 text-center min-w-[70px] shadow-lg border border-gray-700">
        <div className="text-2xl md:text-3xl font-bold text-yellow-400">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-300 font-medium">Seconds</div>
      </div>
    </div>
  )
}
