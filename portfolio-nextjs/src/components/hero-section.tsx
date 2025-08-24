"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { RESUME_DATA } from "@/lib/content";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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
    <section className={cn("relative overflow-hidden bg-black h-screen m-0 p-0", className)} style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Hero background image - behind everything */}
      {mounted && (
        <>
          {isMobile ? (
            // Mobile Background - full screen coverage with no gaps
            <>
              <div 
                className="absolute inset-0 opacity-[0.8] z-0"
                style={{
                  backgroundImage: 'url(/contents/background_mobile.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              {/* Mobile: Gradient overlay */}
              <div 
                className="absolute inset-0 z-[1]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 100%)'
                }}
              />
            </>
          ) : (
            // Desktop Background
            <div 
              className="absolute inset-0 opacity-[0.3] z-0"
              style={{
                backgroundImage: 'url(/contents/background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                animation: 'subtleZoom 20s ease-in-out infinite alternate'
              }}
            />
          )}
        </>
      )}
      
      {/* Fallback for SSR */}
      {!mounted && (
        <div 
          className="absolute inset-0 opacity-[0.3] z-0"
          style={{
            backgroundImage: 'url(/contents/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            animation: 'subtleZoom 20s ease-in-out infinite alternate'
          }}
        />
      )}
      
      {/* Desktop: Light gradient overlay - 30% opacity */}
      {mounted && !isMobile && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent z-[1]" />
      )}
      
      {/* Desktop: Subtle, well-distributed gradient effects */}
      {mounted && !isMobile && (
        <div className="absolute inset-0 overflow-hidden z-[2]">
          {/* Evenly distributed subtle gradients - increased opacity by 10% */}
          <div className="absolute left-1/4 top-1/4 blur-2xl">
            <div className="h-[4rem] rounded-full w-[20rem] bg-gradient-to-br blur-[3rem] from-blue-500/20 to-purple-500/20"></div>
          </div>
          
          <div className="absolute right-1/4 top-1/3 blur-2xl">
            <div className="h-[4rem] rounded-full w-[20rem] bg-gradient-to-bl blur-[3rem] from-purple-500/20 to-pink-500/20"></div>
          </div>
          
          <div className="absolute left-1/3 bottom-1/4 blur-2xl">
            <div className="h-[4rem] rounded-full w-[20rem] bg-gradient-to-tr blur-[3rem] from-cyan-400/18 to-blue-400/18"></div>
          </div>
          
          <div className="absolute right-1/3 bottom-1/3 blur-2xl">
            <div className="h-[4rem] rounded-full w-[20rem] bg-gradient-to-tl blur-[3rem] from-orange-400/18 to-yellow-400/18"></div>
          </div>
        </div>
      )}

      {/* Content container */}
      <div className="relative z-[10] h-full flex flex-col justify-center">

        {/* Hero section */}
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className={cn(
              "mx-auto max-w-4xl font-bold leading-tight text-white drop-shadow-lg",
              mounted && isMobile ? "text-3xl" : "text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
          >
            Hey, I&apos;m <span className="text-white">Wonjae</span>
          </motion.h1>
          <motion.p 
            className={cn(
              "mx-auto max-w-2xl text-gray-300",
              mounted && isMobile ? "mt-3 text-sm" : "mt-4 md:mt-6 text-base md:text-lg"
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {RESUME_DATA.title}
          </motion.p>
          {/* CTA Buttons - Only show on desktop */}
          {mounted && !isMobile && (
            <motion.div 
              className="flex mt-10 items-center justify-center space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
            <button 
              onClick={() => scrollToSection('articles')}
              className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90 transition-all duration-300"
            >
              Read My Articles
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="h-12 rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10 transition-all duration-300"
            >
              View My Work
            </button>
            </motion.div>
          )}

          {/* Scroll Down Indicator - Show on both desktop and mobile */}
          {mounted && (
            <motion.div 
              className={cn(
                "flex flex-col items-center justify-center",
                isMobile ? "mt-8" : "mt-16"
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className={cn(
                "text-white/60 mb-2",
                isMobile ? "text-xs" : "text-sm"
              )}>Scroll to explore</p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="cursor-pointer"
                onClick={() => scrollToSection('about')}
              >
                <ChevronDown className={cn(
                  "text-white/40 hover:text-white/60 transition-colors duration-300",
                  isMobile ? "w-4 h-4" : "w-5 h-5"
                )} />
              </motion.div>
            </motion.div>
          )}

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