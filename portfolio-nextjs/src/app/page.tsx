"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { FloatingNav } from "@/components/floating-nav";
import { AboutSection } from "@/components/about-section";
import { ArticlesSection } from "@/components/articles-section";
import { ProductsSection } from "@/components/products-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { BeamsBackgroundLayer } from "@/components/ui/beams-background-layer";

export default function Home() {
  useEffect(() => {
    // Initialize theme on mount - only run on client
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      
      // Set smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 relative m-0 p-0">
      {/* Unified Background Beams Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <BeamsBackgroundLayer intensity="subtle" />
      </div>
      
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Articles Section */}
      <ArticlesSection />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}