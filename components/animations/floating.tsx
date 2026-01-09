'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingProps {
  children: ReactNode
  duration?: number
  yOffset?: number
  className?: string
}

export function Floating({ 
  children, 
  duration = 3,
  yOffset = 10,
  className 
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

