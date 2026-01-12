'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ScrollBackgroundProps {
  children: React.ReactNode
  sections?: {
    /** Color for this section (any valid CSS color) */
    color: string
    /** Optional gradient overlay */
    gradient?: string
  }[]
}

/**
 * Smooth scroll-based background color transitions
 * Changes background color as user scrolls through sections
 */
export function ScrollBackground({ 
  children, 
  sections = [
    { color: '#ffffff', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
    { color: '#0a0a0a', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { color: '#1a1a2e', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { color: '#0f0f23', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  ]
}: ScrollBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Create color stops for smooth transitions
  const sectionCount = sections.length
  const inputRange = sections.map((_, i) => i / (sectionCount - 1))
  
  // Transform scroll progress to background color
  const backgroundColor = useTransform(
    scrollYProgress,
    inputRange,
    sections.map(s => s.color)
  )

  // Transform scroll progress to gradient overlay
  const backgroundImage = useTransform(
    scrollYProgress,
    inputRange,
    sections.map(s => s.gradient || 'none')
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background that changes color */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor,
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      
      {children}
    </div>
  )
}

/**
 * Individual section component with color definition
 */
export function ScrollSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`min-h-screen relative ${className}`}>
      {children}
    </section>
  )
}

