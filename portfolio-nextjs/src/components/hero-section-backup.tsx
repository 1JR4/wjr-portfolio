"use client";

import { motion } from "motion/react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { HeroParticleText } from "@/components/hero-particle-text";
import { cn } from "@/lib/utils";
import { RESUME_DATA } from "@/lib/content";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className={cn("relative h-[50vh] overflow-hidden bg-black", className)}>
      {/* Background with beams on pure black */}
      <div className="absolute inset-0 bg-black">
        <BeamsBackground intensity="strong" className="opacity-60" />
      </div>
      
      {/* Hero background image overlay - very subtle */}
      <div 
        className="absolute inset-0 opacity-[0.63]"
        style={{
          backgroundImage: 'url(/contents/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          animation: 'subtleZoom 20s ease-in-out infinite alternate'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <HeroParticleText words={["Hey, I'm", "WONJAE"]} />
            </div>
            
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-4 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
            >
              {RESUME_DATA.title}
            </motion.p>
            
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button
                onClick={() => scrollToSection('articles')}
                className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105 min-w-48"
              >
                Read My Articles
              </button>
              
              <button
                onClick={() => scrollToSection('products')}
                className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105 min-w-48"
              >
                View My Work
              </button>
            </motion.div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none h-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: (i * 13.7 + (i % 7) * 11.3) % 100 + '%',
              top: (i * 17.1 + (i % 5) * 19.7) % 100 + '%',
              animationDelay: (i * 0.15) % 3 + 's',
              animationDuration: (3 + (i * 0.2) % 4) + 's'
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes subtleZoom {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(1.05) translateY(-20px); }
        }
      `}</style>
    </section>
  );
}