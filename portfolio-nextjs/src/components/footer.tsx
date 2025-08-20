"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BeamsBackgroundLayer } from "@/components/ui/beams-background-layer";
import { RESUME_DATA } from "@/lib/content";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("relative py-8 px-4 border-t border-gray-200 dark:border-white/10", className)}>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-white/60 text-sm"
        >
          © 2025 {RESUME_DATA.name}. Built with passion and lots of ☕
        </motion.p>
      </div>
    </footer>
  );
}