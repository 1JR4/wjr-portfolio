"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
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
    <section className={cn("relative min-h-screen md:h-[80vh] overflow-hidden bg-black", className)}>
      {/* Gradient background with grain effect */}
      <div className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0">
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-purple-600 to-sky-600"></div>
        <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-pink-900 to-yellow-400"></div>
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-yellow-600 to-sky-500"></div>
      </div>

      {/* Hero background image overlay */}
      <div 
        className="absolute inset-0 opacity-[0.4] md:opacity-[0.3] z-0 bg-center bg-no-repeat bg-contain md:bg-cover"
        style={{
          backgroundImage: 'url(/contents/background.png)',
          animation: 'subtleZoom 20s ease-in-out infinite alternate'
        }}
      />

      {/* Content container */}
      <div className="relative z-10 h-full flex items-center justify-center pt-16 md:pt-0">

        {/* Hero section */}
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="mx-auto max-w-4xl text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
          >
            Hey, I&apos;m <span className="text-white">Wonjae</span>
          </motion.h1>
          <motion.p 
            className="mx-auto mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {RESUME_DATA.title}
          </motion.p>
          <motion.div 
            className="mt-8 md:mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => scrollToSection('articles')}
              className="h-10 md:h-12 rounded-full bg-white px-6 md:px-8 text-sm md:text-base font-medium text-black hover:bg-white/90 transition-all duration-300"
            >
              Read My Articles
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="h-10 md:h-12 rounded-full border border-gray-600 px-6 md:px-8 text-sm md:text-base font-medium text-white hover:bg-white/10 transition-all duration-300"
            >
              View My Work
            </button>
          </motion.div>

        </div>
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