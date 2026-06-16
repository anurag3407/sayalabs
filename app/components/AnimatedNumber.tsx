"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Round to integers (true) or one decimal (false) */
  integer?: boolean;
};

/**
 * AnimatedNumber — counts from 0 to target when scrolled into view.
 */
export default function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className = "",
  integer = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(integer ? "0" : "0.0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration,
      ease: "expo.out",
      paused: true,
      onUpdate: () => {
        setDisplay(integer ? Math.floor(obj.v).toString() : obj.v.toFixed(1));
      },
    });

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
  }, [value, duration, integer]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
