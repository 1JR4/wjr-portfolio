"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingNavProps {
  className?: string;
}

export function FloatingNav({ className }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { id: "about", label: "About" },
    { id: "articles", label: "Articles" },
    { id: "products", label: "Products" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark', isDark);

    // Set up intersection observer for active section detection
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-3 md:top-6 left-1/2 transform -translate-x-1/2 z-50 px-2 md:px-0",
        className
      )}
    >
      <div className="relative">
        <div className="bg-gray-600/40 dark:bg-white/10 backdrop-blur-xl border border-gray-400/50 dark:border-white/20 rounded-full px-3 md:px-6 py-2 md:py-3 shadow-lg max-w-[calc(100vw-1rem)] overflow-hidden">
          
          <div className="flex items-center gap-2 md:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative px-2 md:px-4 py-1 md:py-2 rounded-full font-medium text-xs md:text-sm transition-all duration-300 z-10 whitespace-nowrap",
                  activeSection === item.id
                    ? "text-white dark:text-white bg-white/20 dark:bg-white/20 backdrop-blur-xl border border-white/30 dark:border-white/30"
                    : "text-white/80 dark:text-white/70 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/20 dark:hover:border-white/20"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-white/20 dark:bg-white/20 backdrop-blur-xl border border-white/30 dark:border-white/30 rounded-full -z-10"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </button>
            ))}
            
            <div className="w-px h-6 bg-white/30 dark:bg-white/20" />
            
            <button
              onClick={toggleTheme}
              className="p-1 md:p-2 text-white/80 dark:text-white/70 hover:text-white dark:hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10 dark:hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/20 dark:hover:border-white/20"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun size={16} className="md:w-[18px] md:h-[18px]" /> : <Moon size={16} className="md:w-[18px] md:h-[18px]" />}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}