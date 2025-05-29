"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"

interface CountdownTimerProps {
  targetDate: string | Date
  onComplete?: () => void
  className?: string
  showDays?: boolean
  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
  className = "",
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
}) => {
  // Use useRef for the interval to avoid it being a dependency
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Use useRef for the target date to avoid unnecessary re-renders
  const targetTimeRef = useRef<number>(
    typeof targetDate === "string" ? new Date(targetDate).getTime() : targetDate.getTime(),
  )

  // State for time left
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })

  // Memoize the calculation function to avoid recreating it on every render
  const calculateTimeLeft = useCallback(() => {
    const difference = targetTimeRef.current - new Date().getTime()

    // If the target date is reached
    if (difference <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      if (onComplete) {
        onComplete()
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    }
  }, [onComplete]) // Only depends on onComplete

  // Set up the timer
  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Set up interval
    intervalRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [calculateTimeLeft]) // Only depends on the memoized function

  // Format time with leading zeros
  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString()
  }

  return (
    <div className={`countdown-timer ${className}`}>
      {showDays && (
        <div className="countdown-item">
          <span className="countdown-value">{formatTime(timeLeft.days)}</span>
          <span className="countdown-label">Days</span>
        </div>
      )}

      {showHours && (
        <div className="countdown-item">
          <span className="countdown-value">{formatTime(timeLeft.hours)}</span>
          <span className="countdown-label">Hours</span>
        </div>
      )}

      {showMinutes && (
        <div className="countdown-item">
          <span className="countdown-value">{formatTime(timeLeft.minutes)}</span>
          <span className="countdown-label">Minutes</span>
        </div>
      )}

      {showSeconds && (
        <div className="countdown-item">
          <span className="countdown-value">{formatTime(timeLeft.seconds)}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      )}
    </div>
  )
}

export default CountdownTimer
