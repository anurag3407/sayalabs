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

const pillars = [
  {
    kanji: "速",
    n: 96,
    suffix: "",
    label: "Lighthouse Median",
    desc: "Every build ships with a performance budget. We treat speed as a brand virtue.",
  },
  {
    kanji: "精",
    n: 12,
    suffix: "/yr",
    label: "Client Capacity",
    desc: "We refuse work. The result is a deliberate roster of brands we are proud to sign.",
  },
  {
    kanji: "週",
    n: 8,
    suffix: "wk",
    label: "Average Forge Time",
    desc: "From kickoff to launch. Faster when the brief is sharp, never longer than craft demands.",
  },
  {
    kanji: "信",
    n: 98,
    suffix: "%",
    label: "Repeat Engagement",
    desc: "We don't optimize for the deal. We optimize for the relationship that follows it.",
  },
];

export default function Path() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -10, scale: 1.18 },
        {
          yPercent: 10,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      const cells = sectionRef.current?.querySelectorAll<HTMLElement>(".path-cell");
      cells?.forEach((cell, i) => {
        gsap.from(cell, {
          y: 70,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: cell, start: "top 85%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="story-section path-section" id="path">
      <div ref={bgRef} className="story-bg">
        <Image src="/images/story_path.jpg" alt="" fill sizes="100vw" />
      </div>
      <div className="story-veil" />
      <div className="story-grain" />

      <div className="story-inner">
        <div className="path-header">
          <div>
            <RevealOnScroll y={30}>
              <span className="story-eyebrow">
                <span className="num">004 / 004</span>
                The Path
              </span>
            </RevealOnScroll>
            <SplitText
              as="h2"
              className="story-title path-title"
              split="chars"
              stagger={0.025}
              duration={1.2}
            >
              MASTERY,
            </SplitText>
            <SplitText
              as="h2"
              className="story-title path-title path-title--stroke"
              split="chars"
              stagger={0.025}
              duration={1.2}
              delay={0.15}
            >
              MEASURED.
            </SplitText>
          </div>

          <RevealOnScroll y={30} delay={0.2}>
            <p className="story-lede">
              We don&apos;t hide behind &quot;creative excellence&quot; — we publish the
              numbers. Four signals that tell you the practice behind the
              philosophy, and the discipline behind the brand.
            </p>
          </RevealOnScroll>
        </div>

        <div className="path-grid">
          {pillars.map((p) => (
            <div key={p.kanji} className="path-cell">
              <span className="path-cell__kanji">{p.kanji}</span>
              <div className="path-cell__num">
                <AnimatedNumber value={p.n} />
                {p.suffix && <span className="suffix">{p.suffix}</span>}
              </div>
              <span className="path-cell__label">{p.label}</span>
              <p className="path-cell__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="path-footer">
          <span>The way is in training</span>
          <span className="torii">⛩ 道</span>
          <span>— Miyamoto Musashi, paraphrased</span>
        </div>
      </div>
    </section>
  );
}
