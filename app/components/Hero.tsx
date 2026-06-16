"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sideLeftRef = useRef<HTMLSpanElement>(null);
  const sideRightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background slow parallax
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      // Overlay deepens on scroll
      gsap.to(overlayRef.current, {
        opacity: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      // Side kanji floats up
      gsap.to([sideLeftRef.current, sideRightRef.current], {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">
      <div ref={bgRef} className="hero-bg">
        <Image
          src="/images/hero2.svg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div ref={overlayRef} className="hero-overlay" />
      <div className="hero-grid-overlay" />

      <span ref={sideLeftRef} className="hero-side-text left">武士道精神</span>
      <span ref={sideRightRef} className="hero-side-text right">創造と革新</span>

      <div className="container hero-content">
        <SplitText
          as="div"
          className="hero-tag"
          split="words"
          stagger={0.05}
          duration={1.1}
          triggerOnScroll={false}
          delay={0.2}
        >
          Digital Craft Studio
        </SplitText>

        <h1 className="hero-title">
          <SplitText
            as="span"
            split="chars"
            stagger={0.04}
            duration={1.2}
            triggerOnScroll={false}
            delay={0.4}
          >
            SAYA
          </SplitText>
          <br />
          <span className="accent">
            <SplitText
              as="span"
              split="chars"
              stagger={0.04}
              duration={1.2}
              triggerOnScroll={false}
              delay={0.6}
            >
              LABS
            </SplitText>
          </span>
        </h1>

        <SplitText
          as="p"
          className="hero-subtitle"
          split="words"
          stagger={0.025}
          duration={0.95}
          triggerOnScroll={false}
          delay={1.05}
        >
          We forge extraordinary digital experiences — blending timeless design philosophy with cutting-edge technology to build brands that command attention and inspire action.
        </SplitText>

        <div className="hero-actions">
          <MagneticButton href="#contact" className="btn-primary">
            Start Your Journey
          </MagneticButton>
          <MagneticButton href="#work" className="btn-secondary">
            View Our Work
          </MagneticButton>
        </div>
      </div>

      <div className="hero-meta-strip">
        <span><span className="dot" /> Tokyo / Worldwide</span>
        <span>Established 2026</span>
        <span>Design · Development · SEO</span>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
