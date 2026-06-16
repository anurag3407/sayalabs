"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  /** Array of strings or nodes that will be repeated to make the infinite loop */
  items: ReactNode[];
  /** Seconds per full loop. Smaller = faster. */
  speed?: number;
  /** "left" or "right" */
  direction?: "left" | "right";
  /** Extra class on the outer strip */
  className?: string;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Optional separator node placed between items */
  separator?: ReactNode;
};

/**
 * Marquee — infinite horizontal scrolling strip.
 * Renders the items twice; the track is exactly 2x wide; we animate -50% so the
 * second copy lines up with the first when the loop restarts → seamless.
 */
export default function Marquee({
  items,
  speed = 40,
  direction = "left",
  className = "",
  pauseOnHover = false,
  separator,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const initial = direction === "left" ? 0 : -50;
    const target = direction === "left" ? -50 : 0;
    gsap.set(track, { xPercent: initial });

    const tween = gsap.to(track, {
      xPercent: target,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    if (pauseOnHover) {
      const onEnter = () => tween.timeScale(0.2);
      const onLeave = () => tween.timeScale(1);
      track.addEventListener("mouseenter", onEnter);
      track.addEventListener("mouseleave", onLeave);
      return () => {
        track.removeEventListener("mouseenter", onEnter);
        track.removeEventListener("mouseleave", onLeave);
        tween.kill();
      };
    }
    return () => {
      tween.kill();
    };
  }, [direction, speed, pauseOnHover]);

  const groupNodes = (
    <div className="marquee-group">
      {items.map((item, i) => (
        <span key={i} className="marquee-item">
          {item}
          {separator && <span className="marquee-sep">{separator}</span>}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        {groupNodes}
        {groupNodes}
      </div>
    </div>
  );
}
