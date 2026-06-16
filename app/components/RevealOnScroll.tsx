"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Pixels to translate from */
  y?: number;
  /** Stagger between children (if applicable) */
  stagger?: number;
  /** Delay (s) */
  delay?: number;
  /** Animate children, not the wrapper itself */
  animateChildren?: boolean;
  /** Scroll start position, default "top 85%" */
  start?: string;
  /** Duration (s) */
  duration?: number;
};

/**
 * RevealOnScroll — fades + translates the wrapper (or children) when it enters viewport.
 */
export default function RevealOnScroll({
  children,
  className = "",
  y = 60,
  stagger = 0,
  delay = 0,
  animateChildren = false,
  start = "top 85%",
  duration = 1.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = animateChildren ? Array.from(el.children) : [el];

    gsap.set(targets, { y: reduced ? 0 : y, opacity: 0 });

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: reduced ? 0.4 : duration,
      ease: "expo.out",
      stagger,
      delay,
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [y, stagger, delay, animateChildren, start, duration]);

  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`}>
      {children}
    </div>
  );
}
