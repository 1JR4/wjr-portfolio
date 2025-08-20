"use client"

import { useEffect, useRef } from "react"
import { ParticleTextEffect } from "@/components/ui/particle-text-effect"

interface HeroParticleTextProps {
  words?: string[]
}

export function HeroParticleText({ words = ["Hey, I'm", "WONJAE"] }: HeroParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-24 flex items-center justify-center overflow-hidden"
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="scale-75 md:scale-100">
          <ParticleTextEffect words={words} />
        </div>
      </div>
    </div>
  )
}