"use client";

import {
  createElement,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SplitTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  /** "chars" | "words" | "lines-soft" */
  split?: "chars" | "words" | "lines-soft";
  /** Delay before stagger starts (seconds) */
  delay?: number;
  /** Stagger between elements (seconds) */
  stagger?: number;
  /** Total duration per element (seconds) */
  duration?: number;
  /** Wait until in viewport to fire (default true) */
  triggerOnScroll?: boolean;
};

/**
 * SplitText — lightweight no-plugin splitter.
 * Wraps each character or word in an inline-block span inside an overflow-hidden mask,
 * then animates them up with GSAP. Whitespace preserved.
 */
export default function SplitText({
  children,
  as = "span",
  className,
  split = "chars",
  delay = 0,
  stagger = 0.025,
  duration = 1,
  triggerOnScroll = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".split-inner");
    if (targets.length === 0) return;

    gsap.set(targets, { yPercent: 110 });

    const tween = gsap.to(targets, {
      yPercent: 0,
      duration,
      ease: "expo.out",
      stagger,
      delay,
      paused: triggerOnScroll,
    });

    if (triggerOnScroll) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => tween.play(),
      });
      return () => {
        trigger.kill();
        tween.kill();
      };
    } else {
      tween.play();
      return () => {
        tween.kill();
      };
    }
  }, [children, delay, stagger, duration, triggerOnScroll]);

  const text = children;

  let nodes: ReactNode;
  if (split === "words" || split === "lines-soft") {
    const words = text.split(/(\s+)/);
    nodes = words.map((token, i) => {
      if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
      return (
        <span key={i} className="split-mask">
          <span className="split-inner">{token}</span>
        </span>
      );
    });
  } else {
    nodes = Array.from(text).map((ch, i) => {
      if (ch === " ") return <span key={i} className="split-space">&nbsp;</span>;
      return (
        <span key={i} className="split-mask">
          <span className="split-inner">{ch}</span>
        </span>
      );
    });
  }

  return createElement(
    as,
    {
      ref,
      className: `split-text ${className ?? ""}`,
      "aria-label": text,
    },
    nodes
  );
}
