"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedNumber from "./AnimatedNumber";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const kanjiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slow zoom in
      gsap.fromTo(
        imageRef.current?.querySelector("img") ?? null,
        { scale: 1.18 },
        {
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      // Background mega-kanji drifts
      gsap.fromTo(
        kanjiRef.current,
        { yPercent: 14 },
        {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="about">
      <div className="section-bg">
        <Image
          src="/images/about_bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.08 }}
        />
        <div className="section-bg-overlay" />
      </div>

      <div ref={kanjiRef} className="section-mega-kanji" style={{ top: "8%", right: "-4%" }}>
        我
      </div>

      <div className="container">
        <div className="about-layout">
          <div ref={imageRef}>
            <RevealOnScroll y={50}>
              <div className="about-image">
                <Image
                  src="/images/about_bg.png"
                  alt="The path of mastery"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="about-image-overlay" />
                <span className="about-image-label">道</span>
              </div>
            </RevealOnScroll>
          </div>

          <div className="about-text">
            <RevealOnScroll>
              <div className="about-meta-line">Who We Are — Est. 2026</div>
            </RevealOnScroll>

            <div className="section-header" style={{ marginBottom: 0 }}>
              <SplitText
                as="h2"
                className="section-title"
                split="words"
                stagger={0.06}
                duration={1.2}
              >
                A small studio,
              </SplitText>
              <SplitText
                as="h2"
                className="section-title section-title--gold"
                split="words"
                stagger={0.06}
                duration={1.2}
                delay={0.15}
              >
                built like a guild.
              </SplitText>
            </div>

            <RevealOnScroll y={30}>
              <p>
                Saya Labs is six craftspeople — designers, engineers, a
                strategist, a producer — operating under one roof in Tokyo with
                clients across three continents. No layers, no agencies-within-
                agencies. The person you pitch is the person who ships.
              </p>
            </RevealOnScroll>

            <RevealOnScroll y={30} delay={0.1}>
              <div className="about-quote">
                &ldquo;We were tired of websites that look the same on launch day and
                feel disposable by week three. So we built a studio that
                refuses to make them.&rdquo;
                <span className="who">— Akira Mori, Founder & Creative Director</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll y={30} delay={0.15}>
              <p>
                Every engagement is led by a senior partner, scoped against your
                actual goals, and built against a public performance budget.
                We&apos;ll happily say no to a project that doesn&apos;t fit — and we
                always say yes to one that does.
              </p>
            </RevealOnScroll>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedNumber value={50} suffix="+" />
                </div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedNumber value={98} suffix="%" />
                </div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedNumber value={5} suffix="Y" />
                </div>
                <div className="stat-label">Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
