"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DollarSign, Cpu, Clock, Briefcase, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BeamsBackgroundLayer } from "@/components/ui/beams-background-layer";
import { TimelineSection } from "@/components/timeline-section";
import { RESUME_DATA } from "@/lib/content";

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  const features = [
    {
      icon: "rocket",
      title: "Business-Driven",
      description: "Tie product decisions to P&L, pricing, and GTM to grow revenue and retention.",
      delay: 0.1
    },
    {
      icon: "gear",
      title: "Technical Execution", 
      description: "Translate user needs into clear specs and scalable systems with engineering.",
      delay: 0.2
    },
    {
      icon: "bolt",
      title: "AI Product Builder",
      description: "Apply LLMs, RAG, and evals to ship safe, useful AI features with real impact.",
      delay: 0.3
    }
  ];

  return (
    <section id="about" className={cn("relative py-20 px-4", className)}>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
            {RESUME_DATA.summary}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = typeof feature.icon === 'string' ? null : feature.icon;
            const isCustomIcon = typeof feature.icon === 'string';
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="text-center transition-all duration-300 hover:translate-y-[-8px] h-full">
                  
                  <div className="relative z-10">
                    <div className="mx-auto mb-2 flex items-center justify-center">
                      {isCustomIcon ? (
                        <Image 
                          src={`/${feature.icon}.png?v=2`}
                          alt={feature.title}
                          width={256}
                          height={256}
                          className="w-64 h-64"
                        />
                      ) : (
                        <Icon className="w-64 h-64 text-gray-700 dark:text-white" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center mb-8">
            <button
              onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
              className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 inline-flex items-center gap-3 px-8 py-4 rounded-full text-gray-900 dark:text-white font-medium transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-105"
            >
              <Clock className="w-5 h-5" />
              <span>{isTimelineExpanded ? 'Hide My Journey' : 'Show My Journey'}</span>
            </button>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isTimelineExpanded ? 'auto' : 0,
              opacity: isTimelineExpanded ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <TimelineSection />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}