"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // ── Critical: keep Lenis, GSAP ScrollTrigger and the rAF clock in lockstep.
    // Without this, scrub-driven animations stutter ("shake") against Lenis's
    // own smoothing. Drive Lenis from GSAP's ticker and refresh ScrollTrigger
    // on every Lenis scroll.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // gsap ticker time is in seconds; Lenis expects ms.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Make sure trigger positions are correct once everything is mounted.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
