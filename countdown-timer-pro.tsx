"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { addPropertyControls, ControlType } from "framer"

// Professional translations - 7 languages
const translations = {
  en: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    timeExpired: "Time Expired!",
    invalidDate: "Invalid date format",
    invalidUrl: "Invalid URL format",
    elementNotFound: "Element not found",
    webhookError: "Webhook execution failed",
    gaNotFound: "Google Analytics not detected",
    configError: "Configuration Error",
    loading: "Loading...",
  },
  es: {
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    timeExpired: "¡Tiempo Expirado!",
    invalidDate: "Formato de fecha inválido",
    invalidUrl: "Formato de URL inválido",
    elementNotFound: "Elemento no encontrado",
    webhookError: "Error al ejecutar webhook",
    gaNotFound: "Google Analytics no detectado",
    configError: "Error de Configuración",
    loading: "Cargando...",
  },
  fr: {
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    timeExpired: "Temps Expiré!",
    invalidDate: "Format de date invalide",
    invalidUrl: "Format d'URL invalide",
    elementNotFound: "Élément non trouvé",
    webhookError: "Échec de l'exécution du webhook",
    gaNotFound: "Google Analytics non détecté",
    configError: "Erreur de Configuration",
    loading: "Chargement...",
  },
  de: {
    days: "Tage",
    hours: "Stunden",
    minutes: "Minuten",
    seconds: "Sekunden",
    timeExpired: "Zeit Abgelaufen!",
    invalidDate: "Ungültiges Datumsformat",
    invalidUrl: "Ungültiges URL-Format",
    elementNotFound: "Element nicht gefunden",
    webhookError: "Webhook-Ausführung fehlgeschlagen",
    gaNotFound: "Google Analytics nicht erkannt",
    configError: "Konfigurationsfehler",
    loading: "Wird geladen...",
  },
  pt: {
    days: "Dias",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    timeExpired: "Tempo Expirado!",
    invalidDate: "Formato de data inválido",
    invalidUrl: "Formato de URL inválido",
    elementNotFound: "Elemento não encontrado",
    webhookError: "Falha na execução do webhook",
    gaNotFound: "Google Analytics não detectado",
    configError: "Erro de Configuração",
    loading: "Carregando...",
  },
  it: {
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    seconds: "Secondi",
    timeExpired: "Tempo Scaduto!",
    invalidDate: "Formato data non valido",
    invalidUrl: "Formato URL non valido",
    elementNotFound: "Elemento non trovato",
    webhookError: "Esecuzione webhook fallita",
    gaNotFound: "Google Analytics non rilevato",
    configError: "Errore di Configurazione",
    loading: "Caricamento...",
  },
  ja: {
    days: "日",
    hours: "時間",
    minutes: "分",
    seconds: "秒",
    timeExpired: "時間切れ！",
    invalidDate: "無効な日付形式",
    invalidUrl: "無効なURL形式",
    elementNotFound: "要素が見つかりません",
    webhookError: "Webhook実行失敗",
    gaNotFound: "Google Analyticsが検出されません",
    configError: "設定エラー",
    loading: "読み込み中...",
  },
}

// Premium themes with professional styling
const themes = {
  modern: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    borderRadius: "20px",
    shadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
    itemBg: "rgba(255, 255, 255, 0.15)",
    backdropBlur: "blur(10px)",
  },
  minimal: {
    background: "#ffffff",
    textColor: "#1a1a1a",
    borderRadius: "12px",
    shadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    itemBg: "#f8fafc",
    backdropBlur: "none",
  },
  dark: {
    background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)",
    textColor: "#ffffff",
    borderRadius: "16px",
    shadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    itemBg: "rgba(255, 255, 255, 0.05)",
    backdropBlur: "blur(8px)",
  },
  neon: {
    background: "#000000",
    textColor: "#00ff88",
    borderRadius: "8px",
    shadow: "0 0 40px rgba(0, 255, 136, 0.4), inset 0 0 40px rgba(0, 255, 136, 0.1)",
    itemBg: "rgba(0, 255, 136, 0.1)",
    backdropBlur: "none",
  },
  elegant: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    textColor: "#8b4513",
    borderRadius: "24px",
    shadow: "0 30px 60px rgba(252, 182, 159, 0.3)",
    itemBg: "rgba(255, 255, 255, 0.3)",
    backdropBlur: "blur(12px)",
  },
  glassmorphism: {
    background: "rgba(255, 255, 255, 0.1)",
    textColor: "#ffffff",
    borderRadius: "20px",
    shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    itemBg: "rgba(255, 255, 255, 0.1)",
    backdropBlur: "blur(16px)",
  },
}

// Utility functions
const formatTime = (time: number): string => time.toString().padStart(2, "0")

const isValidUrl = (url: string): boolean => {
  if (!url) return true
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  return !isNaN(date.getTime()) && dateString.length >= 10
}

const getTimezoneOffset = (timezone: string): number => {
  try {
    const now = new Date()
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
    const targetTime = new Date(utc.toLocaleString("en-US", { timeZone: timezone }))
    return targetTime.getTime() - utc.getTime()
  } catch {
    return 0
  }
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

interface CountdownTimerProProps {
  // Core Configuration
  mode: "specific" | "dynamic"
  targetDate: string
  targetTimezone: string
  dynamicDurationMinutes: number
  resetOnSession: boolean
  resetOnCookie: boolean

  // Display Configuration
  showDays: boolean
  showHours: boolean
  showMinutes: boolean
  showSeconds: boolean
  layout: "horizontal" | "vertical" | "grid" | "compact"
  spacing: number
  showSeparators: boolean
  separatorStyle: "colon" | "dot" | "dash" | "custom"
  customSeparator: string

  // Theme & Styling
  theme: "custom" | "modern" | "minimal" | "dark" | "neon" | "elegant" | "glassmorphism"
  fontFamily: string
  fontSize: number
  textColor: string
  backgroundColor: string
  borderRadius: number
  showShadow: boolean
  shadowIntensity: number
  enableGlassEffect: boolean

  // Animation & Effects
  animationType: "none" | "fade" | "bounce" | "slide" | "pulse" | "glow" | "flip"
  enableCountAnimation: boolean
  animationDuration: number
  enableParticles: boolean
  particleColor: string

  // Labels & Localization
  language: "en" | "es" | "fr" | "de" | "pt" | "it" | "ja"
  labelDays: string
  labelHours: string
  labelMinutes: string
  labelSeconds: string
  warningText: string
  expiredText: string
  showLabels: boolean
  labelPosition: "bottom" | "top" | "side" | "inside"

  // Actions & Integrations
  actionOnZero: "none" | "redirect" | "hide" | "show" | "webhook" | "custom" | "confetti"
  redirectUrl: string
  elementToToggleId: string
  webhookUrl: string
  customJavaScript: string

  // Analytics & Tracking
  sendGAEvent: boolean
  gaEventName: string
  trackMilestones: boolean
  milestonePercentages: string
  enableHeatmap: boolean

  // Advanced Features
  showErrorMessages: boolean
  enableAccessibility: boolean
  enableSEO: boolean
  showProgressBar: boolean
  progressBarColor: string
  progressBarStyle: "linear" | "circular" | "radial"
  enableSound: boolean
  soundUrl: string
  enableVibration: boolean

  // Professional Features
  showBranding: boolean
  brandingText: string
  enableWatermark: boolean
  customCSS: string
  enableAnalyticsDashboard: boolean

  // Premium Effects
  enableNeonGlow: boolean
  glowColor: string
  enablePulseEffect: boolean
  enableFloatingNumbers: boolean

  id?: string
}

export default function CountdownTimerPro(props: CountdownTimerProProps) {
  const {
    // Core Configuration
    mode = "specific",
    targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19),
    targetTimezone = "UTC",
    dynamicDurationMinutes = 15,
    resetOnSession = false,
    resetOnCookie = false,

    // Display Configuration
    showDays = true,
    showHours = true,
    showMinutes = true,
    showSeconds = true,
    layout = "horizontal",
    spacing = 6,
    showSeparators = true,
    separatorStyle = "colon",
    customSeparator = "|",

    // Theme & Styling
    theme = "modern",
    fontFamily = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize = 48,
    textColor = "#ffffff",
    backgroundColor = "#667eea",
    borderRadius = 20,
    showShadow = true,
    shadowIntensity = 5,
    enableGlassEffect = true,

    // Animation & Effects
    animationType = "fade",
    enableCountAnimation = true,
    animationDuration = 300,
    enableParticles = false,
    particleColor = "#ffffff",

    // Labels & Localization
    language = "en",
    labelDays = "",
    labelHours = "",
    labelMinutes = "",
    labelSeconds = "",
    warningText = "",
    expiredText = "",
    showLabels = true,
    labelPosition = "bottom",

    // Actions & Integrations
    actionOnZero = "none",
    redirectUrl = "",
    elementToToggleId = "",
    webhookUrl = "",
    customJavaScript = "",

    // Analytics & Tracking
    sendGAEvent = true,
    gaEventName = "timer_completed",
    trackMilestones = false,
    milestonePercentages = "75,50,25,10",
    enableHeatmap = false,

    // Advanced Features
    showErrorMessages = false,
    enableAccessibility = true,
    enableSEO = false,
    showProgressBar = false,
    progressBarColor = "#4f46e5",
    progressBarStyle = "linear",
    enableSound = false,
    soundUrl = "",
    enableVibration = false,

    // Professional Features
    showBranding = false,
    brandingText = "Powered by CountdownTimer Pro",
    enableWatermark = false,
    customCSS = "",
    enableAnalyticsDashboard = false,

    // Premium Effects
    enableNeonGlow = false,
    glowColor = "#00ff88",
    enablePulseEffect = false,
    enableFloatingNumbers = false,

    id: componentId,
  } = props

  // State management
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })
  const [timerExpired, setTimerExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)
  const [progress, setProgress] = useState(100)
  const [triggeredMilestones, setTriggeredMilestones] = useState<Set<number>>(new Set())

  // Refs for stable references
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const totalDurationRef = useRef<number | null>(null)
  const hasTriggeredActions = useRef(false)
  const targetTimeRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Generate stable unique ID
  const uniqueId = useMemo(
    () => componentId || `countdown-pro-${Math.random().toString(36).substring(7)}`,
    [componentId],
  )

  const localStorageKey = `countdownStartTime_${uniqueId}`

  // Get translations - stable reference
  const t = useMemo(() => translations[language] || translations.en, [language])

  // Get theme styles - stable reference
  const themeStyles = useMemo(() => {
    if (theme === "custom") {
      return {
        background: backgroundColor,
        textColor: textColor,
        borderRadius: `${borderRadius}px`,
        shadow: showShadow
          ? `0 ${shadowIntensity * 4}px ${shadowIntensity * 8}px rgba(0,0,0,${shadowIntensity * 0.1})`
          : "none",
        itemBg: "rgba(255, 255, 255, 0.1)",
        backdropBlur: enableGlassEffect ? "blur(10px)" : "none",
      }
    }
    return themes[theme] || themes.modern
  }, [theme, backgroundColor, textColor, borderRadius, showShadow, shadowIntensity, enableGlassEffect])

  // Get labels - stable reference
  const labels = useMemo(
    () => ({
      days: labelDays || t.days,
      hours: labelHours || t.hours,
      minutes: labelMinutes || t.minutes,
      seconds: labelSeconds || t.seconds,
    }),
    [labelDays, labelHours, labelMinutes, labelSeconds, t],
  )

  // Get separator - stable reference
  const separator = useMemo(() => {
    switch (separatorStyle) {
      case "dot":
        return "•"
      case "dash":
        return "-"
      case "custom":
        return customSeparator
      default:
        return ":"
    }
  }, [separatorStyle, customSeparator])

  // Validation effect - only essential dependencies
  useEffect(() => {
    const newErrors: string[] = []

    if (mode === "specific" && !isValidDate(targetDate)) {
      newErrors.push(t.invalidDate)
    }

    if (actionOnZero === "redirect" && redirectUrl && !isValidUrl(redirectUrl)) {
      newErrors.push(t.invalidUrl)
    }

    if (actionOnZero === "webhook" && webhookUrl && !isValidUrl(webhookUrl)) {
      newErrors.push(t.invalidUrl)
    }

    setErrors(newErrors)
    setIsValid(newErrors.length === 0)
  }, [mode, targetDate, actionOnZero, redirectUrl, webhookUrl, t.invalidDate, t.invalidUrl])

  // Calculate target time - stable function
  const calculateTargetTime = useCallback((): number | null => {
    if (mode === "specific") {
      if (!isValidDate(targetDate)) return null
      const target = new Date(targetDate).getTime()
      const timezoneOffset = getTimezoneOffset(targetTimezone)
      return target + timezoneOffset
    } else if (mode === "dynamic") {
      let storedStartTime = null

      if (resetOnCookie) {
        localStorage.removeItem(localStorageKey)
        startTimeRef.current = null
      } else if (!resetOnSession) {
        storedStartTime = localStorage.getItem(localStorageKey)
        if (storedStartTime) {
          startTimeRef.current = Number.parseInt(storedStartTime, 10)
        }
      }

      if (!startTimeRef.current) {
        const newStartTime = new Date().getTime()
        if (!resetOnSession) {
          localStorage.setItem(localStorageKey, newStartTime.toString())
        }
        startTimeRef.current = newStartTime
      }

      const duration = dynamicDurationMinutes * 60 * 1000
      totalDurationRef.current = duration
      return startTimeRef.current + duration
    }

    return null
  }, [mode, targetDate, targetTimezone, dynamicDurationMinutes, resetOnSession, resetOnCookie, localStorageKey])

  // Execute actions - stable function
  const executeActions = useCallback(async () => {
    if (hasTriggeredActions.current) return
    hasTriggeredActions.current = true

    try {
      // Vibration effect
      if (enableVibration && navigator.vibrate) {
        navigator.vibrate([200, 100, 200])
      }

      // Play sound
      if (enableSound && soundUrl && audioRef.current) {
        try {
          await audioRef.current.play()
        } catch (error) {
          console.warn("Could not play sound:", error)
        }
      }

      // Confetti effect
      if (actionOnZero === "confetti" && typeof window !== "undefined") {
        const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            const confetti = document.createElement("div")
            confetti.style.cssText = `
              position: fixed;
              width: 10px;
              height: 10px;
              background: ${colors[Math.floor(Math.random() * colors.length)]};
              left: ${Math.random() * 100}vw;
              top: -10px;
              z-index: 10000;
              pointer-events: none;
              animation: confetti-fall 3s linear forwards;
            `
            document.body.appendChild(confetti)
            setTimeout(() => confetti.remove(), 3000)
          }, i * 50)
        }
      }

      // Custom JavaScript execution
      if (actionOnZero === "custom" && customJavaScript) {
        try {
          const func = new Function("timerId", "language", "timezone", "theme", customJavaScript)
          func(uniqueId, language, targetTimezone, theme)
        } catch (error) {
          console.error("Custom JavaScript execution failed:", error)
        }
      }

      // Redirect action
      if (actionOnZero === "redirect" && redirectUrl && isValidUrl(redirectUrl)) {
        window.location.href = redirectUrl
        return
      }

      // Element toggle actions
      if ((actionOnZero === "hide" || actionOnZero === "show") && elementToToggleId) {
        const element = document.getElementById(elementToToggleId)
        if (element) {
          if (actionOnZero === "hide") {
            element.style.display = "none"
            element.setAttribute("aria-hidden", "true")
          } else {
            element.style.display = "block"
            element.setAttribute("aria-hidden", "false")
          }
        } else if (showErrorMessages) {
          setErrors((prev) => [...prev, t.elementNotFound])
        }
      }

      // Webhook execution
      if (actionOnZero === "webhook" && webhookUrl && isValidUrl(webhookUrl)) {
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timerId: uniqueId,
              status: "completed",
              timestamp: new Date().toISOString(),
              timezone: targetTimezone,
              language: language,
              theme: theme,
              userAgent: navigator.userAgent,
              referrer: document.referrer,
            }),
          })

          if (!response.ok && showErrorMessages) {
            setErrors((prev) => [...prev, `${t.webhookError}: ${response.status}`])
          }
        } catch (error) {
          if (showErrorMessages) {
            setErrors((prev) => [...prev, t.webhookError])
          }
        }
      }

      // Google Analytics event
      if (sendGAEvent && typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        ;(window as any).gtag("event", gaEventName || "timer_completed", {
          event_category: "Countdown Timer Pro",
          event_label: uniqueId,
          value: 1,
          custom_parameter_language: language,
          custom_parameter_timezone: targetTimezone,
          custom_parameter_theme: theme,
        })
      }
    } catch (error) {
      console.error("Error executing timer actions:", error)
    }
  }, [
    actionOnZero,
    redirectUrl,
    elementToToggleId,
    webhookUrl,
    customJavaScript,
    sendGAEvent,
    gaEventName,
    uniqueId,
    targetTimezone,
    language,
    theme,
    enableSound,
    soundUrl,
    enableVibration,
    showErrorMessages,
    t.elementNotFound,
    t.webhookError,
  ])

  // Timer update function - separated from setup
  const updateTimer = useCallback(() => {
    if (!targetTimeRef.current) {
      setTimerExpired(true)
      setIsLoading(false)
      return
    }

    const now = new Date().getTime()
    const difference = targetTimeRef.current - now

    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })
      setTimerExpired(true)
      setProgress(0)
      setIsLoading(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Calculate time components
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)

    setTimeLeft({ days, hours, minutes, seconds, total: difference })
    setIsLoading(false)

    // Calculate progress
    if (totalDurationRef.current) {
      const elapsed = totalDurationRef.current - difference
      const progressPercentage = Math.max(0, Math.min(100, (elapsed / totalDurationRef.current) * 100))
      setProgress(progressPercentage)

      // Track milestones
      if (trackMilestones) {
        const milestones = milestonePercentages.split(",").map((p) => Number.parseInt(p.trim(), 10))
        const remainingPercentage = 100 - progressPercentage

        milestones.forEach((milestone) => {
          if (remainingPercentage <= milestone && !triggeredMilestones.has(milestone)) {
            setTriggeredMilestones((prev) => new Set([...prev, milestone]))

            if (sendGAEvent && typeof window !== "undefined" && typeof (window as any).gtag === "function") {
              ;(window as any).gtag("event", `timer_milestone_${milestone}`, {
                event_category: "Countdown Timer Pro",
                event_label: uniqueId,
                value: milestone,
              })
            }
          }
        })
      }
    }
  }, [trackMilestones, milestonePercentages, triggeredMilestones, sendGAEvent, uniqueId])

  // Setup timer effect - minimal dependencies
  useEffect(() => {
    if (!isValid) {
      setIsLoading(false)
      return
    }

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Reset states
    setTimerExpired(false)
    setIsLoading(true)
    hasTriggeredActions.current = false
    setTriggeredMilestones(new Set())

    // Calculate target time
    const targetTime = calculateTargetTime()
    if (!targetTime) {
      setTimerExpired(true)
      setIsLoading(false)
      return
    }

    targetTimeRef.current = targetTime

    // Set total duration for progress calculation
    if (mode === "specific") {
      totalDurationRef.current = targetTime - new Date().getTime()
    }

    // Initial calculation
    updateTimer()

    // Setup interval
    intervalRef.current = setInterval(updateTimer, 1000)

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [
    isValid,
    mode,
    targetDate,
    targetTimezone,
    dynamicDurationMinutes,
    resetOnSession,
    resetOnCookie,
    localStorageKey,
  ])

  // Execute actions when timer expires - separate effect
  useEffect(() => {
    if (timerExpired && isValid) {
      executeActions()
    }
  }, [timerExpired, isValid, executeActions])

  // Setup audio - separate effect
  useEffect(() => {
    if (enableSound && soundUrl) {
      audioRef.current = new Audio(soundUrl)
      audioRef.current.preload = "auto"
    }
    return () => {
      if (audioRef.current) {
        audioRef.current = null
      }
    }
  }, [enableSound, soundUrl])

  // Build timer components - stable reference
  const timerComponents = useMemo(() => {
    const components = []
    const timeUnits = [
      { show: showDays, value: timeLeft.days, label: labels.days, key: "days" },
      { show: showHours, value: timeLeft.hours, label: labels.hours, key: "hours" },
      { show: showMinutes, value: timeLeft.minutes, label: labels.minutes, key: "minutes" },
      { show: showSeconds, value: timeLeft.seconds, label: labels.seconds, key: "seconds" },
    ]

    timeUnits.forEach(({ show, value, label, key }) => {
      if (!show) return

      const isCompact = layout === "compact"
      const isGrid = layout === "grid"

      components.push(
        <div
          key={key}
          className={`
            countdown-item flex items-center justify-center relative
            ${isGrid || isCompact ? "flex-col" : labelPosition === "side" ? "flex-row gap-2" : "flex-col"}
            ${enableCountAnimation ? `transition-all duration-${animationDuration} ease-in-out` : ""}
            ${isGrid ? "min-w-[100px] min-h-[100px]" : isCompact ? "min-w-[60px]" : "min-w-[80px]"}
            ${enablePulseEffect ? "animate-pulse" : ""}
            ${enableNeonGlow ? "filter drop-shadow-lg" : ""}
          `}
          style={{
            background: themeStyles.itemBg,
            borderRadius: isGrid ? "16px" : "12px",
            backdropFilter: themeStyles.backdropBlur,
            border: enableNeonGlow ? `2px solid ${glowColor}` : "1px solid rgba(255,255,255,0.1)",
            boxShadow: enableNeonGlow ? `0 0 20px ${glowColor}40` : "none",
          }}
          role={enableAccessibility ? "timer" : undefined}
          aria-label={enableAccessibility ? `${value} ${label}` : undefined}
        >
          {labelPosition === "top" && showLabels && (
            <span
              className="countdown-label text-xs opacity-75 mb-1 font-medium"
              style={{ color: themeStyles.textColor }}
              aria-hidden="true"
            >
              {label}
            </span>
          )}

          <span
            className={`
              countdown-value font-bold tabindex-0 relative
              ${enableCountAnimation ? `transition-all duration-${animationDuration}` : ""}
              ${isGrid ? "text-3xl" : isCompact ? "text-xl" : "text-4xl"}
              ${enableFloatingNumbers ? "animate-bounce" : ""}
            `}
            style={{
              fontSize: isGrid ? fontSize * 0.7 : isCompact ? fontSize * 0.5 : fontSize,
              color: themeStyles.textColor,
              fontFamily: fontFamily,
              textShadow: enableNeonGlow ? `0 0 10px ${glowColor}` : "none",
            }}
            aria-label={enableAccessibility ? `${value} ${label}` : undefined}
          >
            {formatTime(value)}
          </span>

          {((labelPosition === "bottom" && !isGrid) || (isGrid && showLabels)) && showLabels && (
            <span
              className="countdown-label text-xs opacity-75 mt-1 font-medium"
              style={{ color: themeStyles.textColor }}
              aria-hidden="true"
            >
              {label}
            </span>
          )}

          {labelPosition === "side" && showLabels && (
            <span
              className="countdown-label text-sm opacity-75 font-medium"
              style={{ color: themeStyles.textColor }}
              aria-hidden="true"
            >
              {label}
            </span>
          )}

          {labelPosition === "inside" && showLabels && (
            <span
              className="countdown-label absolute bottom-1 right-1 text-xs opacity-60 font-medium"
              style={{ color: themeStyles.textColor }}
              aria-hidden="true"
            >
              {label}
            </span>
          )}
        </div>,
      )
    })

    return components
  }, [
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    timeLeft,
    labels,
    layout,
    labelPosition,
    showLabels,
    enableCountAnimation,
    animationDuration,
    enablePulseEffect,
    enableNeonGlow,
    glowColor,
    themeStyles,
    fontSize,
    fontFamily,
    enableAccessibility,
    enableFloatingNumbers,
  ])

  // Container classes - stable reference
  const containerClasses = useMemo(() => {
    const classes = [
      "countdown-container relative flex justify-center items-center w-full h-full min-w-0 min-h-0 p-8",
      enableCountAnimation ? `transition-all duration-${animationDuration} ease-in-out` : "",
    ]

    switch (layout) {
      case "horizontal":
        classes.push("flex-row", `gap-${spacing}`)
        break
      case "vertical":
        classes.push("flex-col", `gap-${spacing}`)
        break
      case "grid":
        classes.push("grid grid-cols-2 gap-6")
        break
      case "compact":
        classes.push("flex-row gap-2")
        break
    }

    return classes.filter(Boolean).join(" ")
  }, [layout, spacing, enableCountAnimation, animationDuration])

  // Custom CSS injection - separate effect
  useEffect(() => {
    if (customCSS) {
      const styleElement = document.createElement("style")
      styleElement.textContent = `
        .countdown-timer-${uniqueId} {
          ${customCSS}
        }
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(styleElement)

      return () => {
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement)
        }
      }
    }
  }, [customCSS, uniqueId])

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center w-full h-full p-8"
        style={{
          background: themeStyles.background,
          borderRadius: themeStyles.borderRadius,
          boxShadow: themeStyles.shadow,
          backdropFilter: themeStyles.backdropBlur,
        }}
      >
        <div className="flex items-center space-x-2">
          <div
            className="animate-spin rounded-full h-6 w-6 border-b-2"
            style={{ borderColor: themeStyles.textColor }}
          ></div>
          <span style={{ color: themeStyles.textColor, fontFamily }}>{t.loading}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`countdown-timer-${uniqueId} ${containerClasses}`}
      style={{
        background: themeStyles.background,
        borderRadius: themeStyles.borderRadius,
        boxShadow: themeStyles.shadow,
        backdropFilter: themeStyles.backdropBlur,
        fontFamily: fontFamily,
      }}
      role={enableAccessibility ? "timer" : undefined}
      aria-live={enableAccessibility ? "polite" : undefined}
      aria-atomic={enableAccessibility ? "true" : undefined}
      aria-label={
        enableAccessibility
          ? `Countdown timer: ${timerExpired ? expiredText || t.timeExpired : `${timeLeft.days} ${labels.days}, ${timeLeft.hours} ${labels.hours}, ${timeLeft.minutes} ${labels.minutes}, ${timeLeft.seconds} ${labels.seconds}`}`
          : undefined
      }
    >
      {/* SEO structured data */}
      {enableSEO && mode === "specific" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Countdown Timer Event",
              startDate: targetDate,
              eventStatus: "https://schema.org/EventScheduled",
            }),
          }}
        />
      )}

      {/* Progress bar */}
      {showProgressBar && !timerExpired && (
        <div className="absolute top-0 left-0 w-full h-2 bg-black bg-opacity-20 rounded-t-lg overflow-hidden">
          {progressBarStyle === "linear" && (
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${progressBarColor}, ${progressBarColor}80)`,
              }}
            />
          )}
          {progressBarStyle === "radial" && (
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                background: `radial-gradient(circle, ${progressBarColor}, ${progressBarColor}80)`,
              }}
            />
          )}
        </div>
      )}

      {/* Circular progress for compact layout */}
      {showProgressBar && progressBarStyle === "circular" && layout === "compact" && !timerExpired && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke={progressBarColor}
              strokeWidth="2"
              strokeDasharray={`${progress * 2.83} 283`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
        </div>
      )}

      {/* Error messages */}
      {showErrorMessages && errors.length > 0 && (
        <div
          className="absolute top-4 left-4 right-4 p-3 bg-red-500 bg-opacity-90 text-white rounded-lg text-sm backdrop-blur-sm"
          role="alert"
        >
          {errors.map((error, index) => (
            <p key={index} className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Warning text */}
      {warningText && !timerExpired && (
        <div className="absolute top-4 left-4 right-4 text-center">
          <p
            className="text-sm opacity-90 font-medium px-4 py-2 rounded-lg backdrop-blur-sm"
            style={{
              color: themeStyles.textColor,
              background: "rgba(255,255,255,0.1)",
            }}
          >
            {warningText}
          </p>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        {!isValid ? (
          <div className="text-center">
            <p className="text-center font-bold text-red-400 mb-2" style={{ fontSize: fontSize * 0.6 }}>
              ⚠️ {t.configError}
            </p>
            <p className="text-sm opacity-75" style={{ color: themeStyles.textColor }}>
              Please check your configuration
            </p>
          </div>
        ) : timerExpired ? (
          <div className="text-center">
            <p
              className="font-bold mb-2 animate-pulse"
              style={{ fontSize: fontSize, color: themeStyles.textColor }}
              role={enableAccessibility ? "status" : undefined}
              aria-live={enableAccessibility ? "assertive" : undefined}
            >
              🎉 {expiredText || t.timeExpired}
            </p>
          </div>
        ) : (
          <div
            className={`
              flex items-center justify-center relative
              ${layout === "horizontal" ? "flex-row" : layout === "vertical" ? "flex-col" : layout === "grid" ? "grid grid-cols-2" : "flex-row"}
              ${layout !== "grid" && layout !== "compact" ? `gap-${spacing}` : layout === "compact" ? "gap-2" : "gap-6"}
            `}
            role={enableAccessibility ? "group" : undefined}
            aria-label={enableAccessibility ? "Countdown timer display" : undefined}
          >
            {timerComponents.map((component, index) => (
              <React.Fragment key={index}>
                {component}
                {index < timerComponents.length - 1 && layout === "horizontal" && showSeparators && (
                  <span
                    className="countdown-separator font-bold opacity-60 animate-pulse"
                    style={{
                      fontSize: fontSize * 0.8,
                      color: themeStyles.textColor,
                      textShadow: enableNeonGlow ? `0 0 10px ${glowColor}` : "none",
                    }}
                    aria-hidden="true"
                  >
                    {separator}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Branding */}
      {(showBranding || enableWatermark) && (
        <div className="absolute bottom-2 right-2 z-20">
          <p
            className="text-xs opacity-40 font-medium px-2 py-1 rounded backdrop-blur-sm"
            style={{
              color: themeStyles.textColor,
              background: "rgba(0,0,0,0.1)",
            }}
          >
            {brandingText}
          </p>
        </div>
      )}

      {/* Particles effect */}
      {enableParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                background: particleColor,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Property controls remain the same...
addPropertyControls(CountdownTimerPro, {
  // Core Configuration
  mode: {
    type: ControlType.Enum,
    title: "Mode",
    options: ["specific", "dynamic"],
    optionTitles: ["Specific Date/Time", "Dynamic Duration"],
    defaultValue: "specific",
    section: "⏰ Core Configuration",
  },
  targetDate: {
    type: ControlType.String,
    title: "Target Date",
    placeholder: "YYYY-MM-DDTHH:MM:SS",
    defaultValue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19),
    hidden: (props) => props.mode !== "specific",
    section: "⏰ Core Configuration",
  },
  targetTimezone: {
    type: ControlType.Enum,
    title: "Timezone",
    options: [
      "UTC",
      "America/New_York",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Asia/Tokyo",
      "Australia/Sydney",
    ],
    optionTitles: ["UTC", "New York", "Los Angeles", "London", "Paris", "Tokyo", "Sydney"],
    defaultValue: "UTC",
    hidden: (props) => props.mode !== "specific",
    section: "⏰ Core Configuration",
  },
  dynamicDurationMinutes: {
    type: ControlType.Number,
    title: "Duration (minutes)",
    min: 1,
    max: 10080,
    step: 1,
    defaultValue: 15,
    hidden: (props) => props.mode !== "dynamic",
    section: "⏰ Core Configuration",
  },
  resetOnSession: {
    type: ControlType.Boolean,
    title: "Reset on Session",
    defaultValue: false,
    enabled: (props) => props.mode === "dynamic",
    section: "⏰ Core Configuration",
  },
  resetOnCookie: {
    type: ControlType.Boolean,
    title: "Reset on Cookie",
    defaultValue: false,
    enabled: (props) => props.mode === "dynamic",
    section: "⏰ Core Configuration",
  },

  // Display Configuration
  showDays: {
    type: ControlType.Boolean,
    title: "Show Days",
    defaultValue: true,
    section: "📱 Display",
  },
  showHours: {
    type: ControlType.Boolean,
    title: "Show Hours",
    defaultValue: true,
    section: "📱 Display",
  },
  showMinutes: {
    type: ControlType.Boolean,
    title: "Show Minutes",
    defaultValue: true,
    section: "📱 Display",
  },
  showSeconds: {
    type: ControlType.Boolean,
    title: "Show Seconds",
    defaultValue: true,
    section: "📱 Display",
  },
  layout: {
    type: ControlType.Enum,
    title: "Layout",
    options: ["horizontal", "vertical", "grid", "compact"],
    optionTitles: ["Horizontal", "Vertical", "Grid (2x2)", "Compact"],
    defaultValue: "horizontal",
    section: "📱 Display",
  },
  spacing: {
    type: ControlType.Number,
    title: "Spacing",
    min: 0,
    max: 16,
    step: 1,
    defaultValue: 6,
    section: "📱 Display",
  },
  showSeparators: {
    type: ControlType.Boolean,
    title: "Show Separators",
    defaultValue: true,
    enabled: (props) => props.layout === "horizontal",
    section: "📱 Display",
  },
  separatorStyle: {
    type: ControlType.Enum,
    title: "Separator Style",
    options: ["colon", "dot", "dash", "custom"],
    optionTitles: ["Colon (:)", "Dot (•)", "Dash (-)", "Custom"],
    defaultValue: "colon",
    hidden: (props) => !props.showSeparators || props.layout !== "horizontal",
    section: "📱 Display",
  },
  customSeparator: {
    type: ControlType.String,
    title: "Custom Separator",
    defaultValue: "|",
    hidden: (props) => props.separatorStyle !== "custom" || !props.showSeparators,
    section: "📱 Display",
  },

  // Theme & Styling
  theme: {
    type: ControlType.Enum,
    title: "Theme",
    options: ["custom", "modern", "minimal", "dark", "neon", "elegant", "glassmorphism"],
    optionTitles: ["Custom", "Modern", "Minimal", "Dark", "Neon", "Elegant", "Glassmorphism"],
    defaultValue: "modern",
    section: "🎨 Theme & Style",
  },
  fontFamily: {
    type: ControlType.String,
    title: "Font Family",
    defaultValue: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    section: "🎨 Theme & Style",
  },
  fontSize: {
    type: ControlType.Number,
    title: "Font Size",
    min: 16,
    max: 120,
    step: 1,
    defaultValue: 48,
    unit: "px",
    section: "🎨 Theme & Style",
  },
  textColor: {
    type: ControlType.Color,
    title: "Text Color",
    defaultValue: "#ffffff",
    hidden: (props) => props.theme !== "custom",
    section: "🎨 Theme & Style",
  },
  backgroundColor: {
    type: ControlType.Color,
    title: "Background Color",
    defaultValue: "#667eea",
    hidden: (props) => props.theme !== "custom",
    section: "🎨 Theme & Style",
  },
  borderRadius: {
    type: ControlType.Number,
    title: "Border Radius",
    min: 0,
    max: 50,
    step: 1,
    defaultValue: 20,
    unit: "px",
    hidden: (props) => props.theme !== "custom",
    section: "🎨 Theme & Style",
  },
  showShadow: {
    type: ControlType.Boolean,
    title: "Show Shadow",
    defaultValue: true,
    hidden: (props) => props.theme !== "custom",
    section: "🎨 Theme & Style",
  },
  shadowIntensity: {
    type: ControlType.Number,
    title: "Shadow Intensity",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 5,
    hidden: (props) => props.theme !== "custom" || !props.showShadow,
    section: "🎨 Theme & Style",
  },
  enableGlassEffect: {
    type: ControlType.Boolean,
    title: "Glass Effect",
    defaultValue: true,
    hidden: (props) => props.theme !== "custom",
    section: "🎨 Theme & Style",
  },

  // Animation & Effects
  animationType: {
    type: ControlType.Enum,
    title: "Animation Type",
    options: ["none", "fade", "bounce", "slide", "pulse", "glow", "flip"],
    optionTitles: ["None", "Fade", "Bounce", "Slide", "Pulse", "Glow", "Flip"],
    defaultValue: "fade",
    section: "✨ Animation",
  },
  enableCountAnimation: {
    type: ControlType.Boolean,
    title: "Count Animation",
    defaultValue: true,
    section: "✨ Animation",
  },
  animationDuration: {
    type: ControlType.Number,
    title: "Animation Duration",
    min: 100,
    max: 1000,
    step: 50,
    defaultValue: 300,
    unit: "ms",
    hidden: (props) => !props.enableCountAnimation,
    section: "✨ Animation",
  },
  enableParticles: {
    type: ControlType.Boolean,
    title: "Particle Effect",
    defaultValue: false,
    section: "✨ Animation",
  },
  particleColor: {
    type: ControlType.Color,
    title: "Particle Color",
    defaultValue: "#ffffff",
    hidden: (props) => !props.enableParticles,
    section: "✨ Animation",
  },

  // Labels & Localization
  language: {
    type: ControlType.Enum,
    title: "Language",
    options: ["en", "es", "fr", "de", "pt", "it", "ja"],
    optionTitles: ["English", "Español", "Français", "Deutsch", "Português", "Italiano", "日本語"],
    defaultValue: "en",
    section: "🌍 Localization",
  },
  showLabels: {
    type: ControlType.Boolean,
    title: "Show Labels",
    defaultValue: true,
    section: "🌍 Localization",
  },
  labelPosition: {
    type: ControlType.Enum,
    title: "Label Position",
    options: ["bottom", "top", "side", "inside"],
    optionTitles: ["Bottom", "Top", "Side", "Inside"],
    defaultValue: "bottom",
    hidden: (props) => !props.showLabels,
    section: "🌍 Localization",
  },
  labelDays: {
    type: ControlType.String,
    title: "Custom Days Label",
    placeholder: "Auto-translated",
    hidden: (props) => !props.showDays || !props.showLabels,
    section: "🌍 Localization",
  },
  labelHours: {
    type: ControlType.String,
    title: "Custom Hours Label",
    placeholder: "Auto-translated",
    hidden: (props) => !props.showHours || !props.showLabels,
    section: "🌍 Localization",
  },
  labelMinutes: {
    type: ControlType.String,
    title: "Custom Minutes Label",
    placeholder: "Auto-translated",
    hidden: (props) => !props.showMinutes || !props.showLabels,
    section: "🌍 Localization",
  },
  labelSeconds: {
    type: ControlType.String,
    title: "Custom Seconds Label",
    placeholder: "Auto-translated",
    hidden: (props) => !props.showSeconds || !props.showLabels,
    section: "🌍 Localization",
  },
  warningText: {
    type: ControlType.String,
    title: "Warning Text",
    placeholder: "e.g., 'Limited time offer!'",
    section: "🌍 Localization",
  },
  expiredText: {
    type: ControlType.String,
    title: "Expired Text",
    placeholder: "Auto-translated",
    section: "🌍 Localization",
  },

  // Actions & Integrations
  actionOnZero: {
    type: ControlType.Enum,
    title: "Action on Zero",
    options: ["none", "redirect", "hide", "show", "webhook", "custom", "confetti"],
    optionTitles: ["None", "Redirect", "Hide Element", "Show Element", "Webhook", "Custom JS", "Confetti"],
    defaultValue: "none",
    section: "⚡ Actions",
  },
  redirectUrl: {
    type: ControlType.String,
    title: "Redirect URL",
    placeholder: "https://yoursite.com/expired",
    hidden: (props) => props.actionOnZero !== "redirect",
    section: "⚡ Actions",
  },
  elementToToggleId: {
    type: ControlType.String,
    title: "Element ID",
    placeholder: "element-id",
    hidden: (props) => props.actionOnZero !== "hide" && props.actionOnZero !== "show",
    section: "⚡ Actions",
  },
  webhookUrl: {
    type: ControlType.String,
    title: "Webhook URL",
    placeholder: "https://hooks.zapier.com/...",
    hidden: (props) => props.actionOnZero !== "webhook",
    section: "⚡ Actions",
  },
  customJavaScript: {
    type: ControlType.String,
    title: "Custom JavaScript",
    placeholder: "console.log('Timer expired!');",
    hidden: (props) => props.actionOnZero !== "custom",
    section: "⚡ Actions",
  },

  // Analytics & Tracking
  sendGAEvent: {
    type: ControlType.Boolean,
    title: "Send GA Event",
    defaultValue: true,
    section: "📊 Analytics",
  },
  gaEventName: {
    type: ControlType.String,
    title: "GA Event Name",
    defaultValue: "timer_completed",
    hidden: (props) => !props.sendGAEvent,
    section: "📊 Analytics",
  },
  trackMilestones: {
    type: ControlType.Boolean,
    title: "Track Milestones",
    defaultValue: false,
    section: "📊 Analytics",
  },
  milestonePercentages: {
    type: ControlType.String,
    title: "Milestone %",
    defaultValue: "75,50,25,10",
    placeholder: "75,50,25,10",
    hidden: (props) => !props.trackMilestones,
    section: "📊 Analytics",
  },
  enableHeatmap: {
    type: ControlType.Boolean,
    title: "Enable Heatmap",
    defaultValue: false,
    section: "📊 Analytics",
  },

  // Advanced Features
  showProgressBar: {
    type: ControlType.Boolean,
    title: "Show Progress Bar",
    defaultValue: false,
    section: "🔧 Advanced",
  },
  progressBarColor: {
    type: ControlType.Color,
    title: "Progress Color",
    defaultValue: "#4f46e5",
    hidden: (props) => !props.showProgressBar,
    section: "🔧 Advanced",
  },
  progressBarStyle: {
    type: ControlType.Enum,
    title: "Progress Style",
    options: ["linear", "circular", "radial"],
    optionTitles: ["Linear", "Circular", "Radial"],
    defaultValue: "linear",
    hidden: (props) => !props.showProgressBar,
    section: "🔧 Advanced",
  },
  enableSound: {
    type: ControlType.Boolean,
    title: "Enable Sound",
    defaultValue: false,
    section: "🔧 Advanced",
  },
  soundUrl: {
    type: ControlType.String,
    title: "Sound URL",
    placeholder: "https://example.com/sound.mp3",
    hidden: (props) => !props.enableSound,
    section: "🔧 Advanced",
  },
  enableVibration: {
    type: ControlType.Boolean,
    title: "Enable Vibration",
    defaultValue: false,
    section: "🔧 Advanced",
  },
  showErrorMessages: {
    type: ControlType.Boolean,
    title: "Show Error Messages",
    defaultValue: false,
    section: "🔧 Advanced",
  },
  enableAccessibility: {
    type: ControlType.Boolean,
    title: "Enable Accessibility",
    defaultValue: true,
    section: "🔧 Advanced",
  },
  enableSEO: {
    type: ControlType.Boolean,
    title: "Enable SEO",
    defaultValue: false,
    section: "🔧 Advanced",
  },
  customCSS: {
    type: ControlType.String,
    title: "Custom CSS",
    placeholder: "color: red; font-weight: bold;",
    section: "🔧 Advanced",
  },

  // Professional Features
  showBranding: {
    type: ControlType.Boolean,
    title: "Show Branding",
    defaultValue: false,
    section: "💼 Professional",
  },
  brandingText: {
    type: ControlType.String,
    title: "Branding Text",
    defaultValue: "Powered by CountdownTimer Pro",
    hidden: (props) => !props.showBranding,
    section: "💼 Professional",
  },
  enableWatermark: {
    type: ControlType.Boolean,
    title: "Enable Watermark",
    defaultValue: false,
    section: "💼 Professional",
  },
  enableAnalyticsDashboard: {
    type: ControlType.Boolean,
    title: "Analytics Dashboard",
    defaultValue: false,
    section: "💼 Professional",
  },

  // Premium Effects
  enableNeonGlow: {
    type: ControlType.Boolean,
    title: "Neon Glow Effect",
    defaultValue: false,
    section: "✨ Premium Effects",
  },
  glowColor: {
    type: ControlType.Color,
    title: "Glow Color",
    defaultValue: "#00ff88",
    hidden: (props) => !props.enableNeonGlow,
    section: "✨ Premium Effects",
  },
  enablePulseEffect: {
    type: ControlType.Boolean,
    title: "Pulse Effect",
    defaultValue: false,
    section: "✨ Premium Effects",
  },
  enableFloatingNumbers: {
    type: ControlType.Boolean,
    title: "Floating Numbers",
    defaultValue: false,
    section: "✨ Premium Effects",
  },
})
