"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    num: "I",
    title: "Discipline over impulse",
    desc: "Templates are admissions of laziness. Every brief is treated as a one-of-one commission — researched, questioned, and rebuilt from first principles.",
  },
  {
    num: "II",
    title: "Craft you can feel",
    desc: "The brief is only the surface. We obsess over typography that breathes, motion that earns its frame, and micro-details that reward the second look.",
  },
  {
    num: "III",
    title: "Forged for impact",
    desc: "Beauty without business outcomes is decoration. Every pixel we ship is in service of brand authority, engagement, and revenue.",
  },
];

export default function Forge() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const kanjiRef = useRef<HTMLSpanElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax + slight scale settle
      gsap.fromTo(
        bgRef.current,
        { yPercent: -8, scale: 1.15 },
        {
          yPercent: 8,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      // Mega kanji drifts upward
      gsap.fromTo(
        kanjiRef.current,
        { yPercent: 14, opacity: 0.5 },
        {
          yPercent: -14,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      // Seal stamp rotates lightly as you scroll
      gsap.to(sealRef.current, {
        rotate: 28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Pillars sweep in
      const pillarEls = sectionRef.current?.querySelectorAll<HTMLElement>(".forge-pillar");
      pillarEls?.forEach((el, i) => {
        gsap.from(el, {
          x: -40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="story-section forge-section" id="forge">
      <div ref={bgRef} className="story-bg">
        <Image src="/images/story_forge.jpg" alt="" fill sizes="100vw" priority={false} />
      </div>
      <div className="story-veil" />
      <div className="story-grid" />
      <div className="story-grain" />

      <span ref={kanjiRef} className="story-kanji-mega">鍛</span>

      <div className="story-inner">
        <div className="forge-layout">
          <div className="forge-layout__left">
            <RevealOnScroll y={30}>
              <span className="story-eyebrow">
                <span className="num">001 / 004</span>
                The Origin
              </span>
            </RevealOnScroll>

            <SplitText
              as="h2"
              className="story-title forge-title"
              split="chars"
              stagger={0.025}
              duration={1.2}
            >
              FORGED IN
            </SplitText>
            <SplitText
              as="h2"
              className="story-title forge-title"
              split="chars"
              stagger={0.025}
              duration={1.2}
              delay={0.15}
            >
              FIRE & INK.
            </SplitText>

            <RevealOnScroll y={30}>
              <p className="story-lede">
                Saya Labs began with a quiet rebellion: against the templated, the
                interchangeable, the &quot;good enough.&quot; We wanted a studio that
                shaped websites the way Edo-period swordsmiths shaped steel —
                heated, folded, hammered, sharpened, signed.
              </p>
            </RevealOnScroll>

            <div className="forge-pillars">
              {pillars.map((p) => (
                <div key={p.num} className="forge-pillar">
                  <div className="forge-pillar__num">{p.num}</div>
                  <div className="forge-pillar__title">{p.title}</div>
                  <div className="forge-pillar__desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <RevealOnScroll y={40} delay={0.15}>
            <div className="forge-stamp" id="forge-stamp">
              <div className="forge-stamp__corner">
                <span>EST · 2026</span>
                <span>Tokyo / Worldwide</span>
              </div>
              <div>
                <div className="forge-stamp__kanji">鞘</div>
                <div className="forge-stamp__title">SAYA</div>
                <div className="forge-stamp__meta">— The Sheath —</div>
              </div>
              <div className="forge-stamp__corner">
                <span>Digital Craft Studio</span>
                <span>№ I</span>
              </div>
              <div ref={sealRef} className="forge-stamp__seal">印</div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
