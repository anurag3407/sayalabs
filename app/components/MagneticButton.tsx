"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  as?: "button" | "a";
};

/**
 * MagneticButton
 * Wrapper that gently pulls its content toward the cursor on hover.
 * Best for headline CTAs. Disabled on touch devices.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  href,
  onClick,
  as,
}: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const moveX = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" });
    const moveY = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      moveX(dx);
      moveY(dy);
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const Tag = (as ?? (href ? "a" : "button")) as "a" | "button";
  const props: Record<string, unknown> = {
    ref: wrapRef,
    className: `magnetic-btn ${className}`,
    "data-cursor": "magnetic",
    onClick,
  };
  if (Tag === "a" && href) props.href = href;

  return (
    <Tag {...(props as React.ComponentPropsWithoutRef<"a"> & React.ComponentPropsWithoutRef<"button">)}>
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </Tag>
  );
}
