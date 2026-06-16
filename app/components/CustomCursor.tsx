"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * CustomCursor
 * - Hidden on touch devices.
 * - Two layers: a small filled dot (tight tracking) and a larger ring (lagged with quickTo).
 * - Targets:
 *   data-cursor="link"       → ring scales up, dot fades
 *   data-cursor="magnetic"   → ring magnetises (pulled toward target center)
 *   data-cursor="hide"       → both hidden
 *   data-cursor="text"       → ring shows label from data-cursor-label
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    let mouseX = 0;
    let mouseY = 0;
    let magneticTarget: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Pull cursor 35% toward target center
        ringX(cx + (mouseX - cx) * 0.5);
        ringY(cy + (mouseY - cy) * 0.5);
      } else {
        ringX(mouseX);
        ringY(mouseY);
      }
      dotX(mouseX);
      dotY(mouseY);
    };

    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    const setRingState = (mode: "default" | "link" | "magnetic" | "text" | "hide", text?: string) => {
      if (mode === "hide") {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        return;
      }
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      if (mode === "link") {
        gsap.to(ring, { scale: 2.4, borderColor: "rgba(196,30,58,0.85)", duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.3 });
        label.textContent = "";
      } else if (mode === "magnetic") {
        gsap.to(ring, { scale: 3.0, borderColor: "rgba(212,165,116,0.85)", duration: 0.45, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.3 });
        label.textContent = "";
      } else if (mode === "text") {
        gsap.to(ring, { scale: 4.5, borderColor: "rgba(229,225,216,0.9)", backgroundColor: "rgba(196,30,58,0.9)", duration: 0.45, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.3 });
        label.textContent = text ?? "VIEW";
      } else {
        gsap.to(ring, { scale: 1, borderColor: "rgba(229,225,216,0.6)", backgroundColor: "transparent", duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.3 });
        label.textContent = "";
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (!target) {
        magneticTarget = null;
        setRingState("default");
        return;
      }
      const mode = (target.dataset.cursor || "default") as "default" | "link" | "magnetic" | "text" | "hide";
      magneticTarget = mode === "magnetic" ? target : null;
      setRingState(mode, target.dataset.cursorLabel);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="custom-cursor-label" />
      </div>
    </>
  );
}
