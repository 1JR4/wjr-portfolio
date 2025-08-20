"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  borderWidth?: number;
  animationType?: "rotate" | "pulse" | "wave";
  duration?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    borderWidth = 1,
    disabled = true,
    animationType = "rotate",
    duration = 4,
  }: GlowingEffectProps) => {

    const getAnimationClass = () => {
      switch (animationType) {
        case "pulse":
          return "animate-glow-pulse";
        case "wave":
          return "animate-glow-wave";
        default:
          return "animate-glow-rotate";
      }
    };

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--border-width": `${borderWidth}px`,
              "--duration": `${duration}s`,
              "--gradient":
                variant === "white"
                  ? "conic-gradient(from 0deg, #ffffff, #ffffff00, #ffffff)"
                  : "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit]",
            blur > 0 && "blur-[var(--blur)]",
            !disabled && getAnimationClass(),
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-[inherit] opacity-60",
              'before:content-[""] before:absolute before:inset-[calc(-1*var(--border-width))] before:rounded-[inherit]',
              "before:[background:var(--gradient)] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
              "before:[mask-composite:xor]",
              !disabled && "opacity-100"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
