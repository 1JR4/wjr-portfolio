"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Coffee, Linkedin, Github, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BeamsBackgroundLayer } from "@/components/ui/beams-background-layer";
import { RESUME_DATA } from "@/lib/content";

interface ContactSectionProps {
  className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  
  const openCalendly = () => {
    setShowCalendlyModal(true);
  };
  
  const closeCalendly = () => {
    setShowCalendlyModal(false);
  };
  
  const copyEmailToClipboard = async () => {
    const email = 'rawonjae94@gmail.com'; // Hardcoded to avoid parsing errors
    
    try {
      // Check if clipboard API is available
      if (navigator?.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setIsEmailCopied(true);
      } else {
        // Fallback for mobile or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setIsEmailCopied(true);
        } catch (e) {
          console.error('Copy failed:', e);
          // Open email client as last resort
          window.location.href = `mailto:${email}`;
        }
        
        textArea.remove();
      }
      
      // Reset the button state after 2 seconds
      if (isEmailCopied) {
        setTimeout(() => {
          setIsEmailCopied(false);
        }, 2000);
      }
    } catch (err) {
      // Final fallback - open email client
      console.error('Failed to copy email:', err);
      window.location.href = `mailto:${email}`;
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/wonjaera",
      label: "LinkedIn"
    },
    {
      icon: Github,
      href: "https://github.com/1JR4",
      label: "GitHub"
    }
  ];

  return (
    <section id="contact" className={cn("relative py-20 px-4", className)}>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Let&apos;s Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            I&apos;m always interested in discussing product strategy, sharing insights, or exploring new opportunities.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <button
            onClick={copyEmailToClipboard}
            className={cn(
              "inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-64 justify-center",
              isEmailCopied
                ? "bg-green-500/20 border border-green-400/30 text-green-400"
                : "bg-black/5 dark:bg-white/20 backdrop-blur-xl border border-gray-200 dark:border-white/30 text-gray-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/30"
            )}
          >
            {isEmailCopied ? (
              <>
                <Check className="w-5 h-5" />
                Email Copied!
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Reach Out
              </>
            )}
          </button>
          
          <button
            onClick={openCalendly}
            className="bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 inline-flex items-center gap-3 px-8 py-4 text-gray-900 dark:text-white font-semibold rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-105 min-w-64 justify-center"
          >
            <Coffee className="w-5 h-5" />
            Schedule a Coffee Chat
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="w-16 h-16 bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center text-gray-700 dark:text-white transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-110 hover:translate-y-[-4px]">
                  <Icon className="w-6 h-6" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Calendly Modal */}
      {showCalendlyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeCalendly}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full h-[80vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCalendly}
              className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
            >
              ✕
            </button>
            <iframe
              src="https://calendly.com/lumambo/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-2xl"
            ></iframe>
          </motion.div>
        </div>
      )}

    </section>
  );
}