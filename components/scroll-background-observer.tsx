'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface BackgroundContextType {
  setBackground: (color: string, gradient?: string) => void
}

const BackgroundContext = createContext<BackgroundContextType | null>(null)

/**
 * Provider component that manages the scroll-based background
 */
export function ScrollBackgroundProvider({ children }: { children: React.ReactNode }) {
  const [bgColor, setBgColor] = useState('#ffffff')
  const [bgGradient, setBgGradient] = useState<string>()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const setBackground = (color: string, gradient?: string) => {
    setIsTransitioning(true)
    setBgColor(color)
    setBgGradient(gradient)
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 600)
  }

  return (
    <BackgroundContext.Provider value={{ setBackground }}>
      {/* Fixed background layer */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-700 ease-in-out"
        style={{
          backgroundColor: bgColor,
          backgroundImage: bgGradient || 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {children}
    </BackgroundContext.Provider>
  )
}

interface ColorSectionProps {
  children: React.ReactNode
  color: string
  gradient?: string
  className?: string
  /** Threshold for when to trigger color change (0-1) */
  threshold?: number
}

/**
 * Section component that changes the background when scrolled into view
 */
export function ColorSection({
  children,
  color,
  gradient,
  className = '',
  threshold = 0.5,
}: ColorSectionProps) {
  const context = useContext(BackgroundContext)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!context || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            context.setBackground(color, gradient)
          }
        })
      },
      {
        threshold,
        rootMargin: '-10% 0px -10% 0px', // Trigger slightly before center
      }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [color, gradient, threshold, context])

  return (
    <section ref={sectionRef} className={`min-h-screen relative ${className}`}>
      {children}
    </section>
  )
}

/**
 * Hook to manually control background color
 */
export function useBackgroundColor() {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error('useBackgroundColor must be used within ScrollBackgroundProvider')
  }
  return context
}

