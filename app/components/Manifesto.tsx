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

const tenets = [
  {
    num: "01",
    kanji: "誠",
    title: "Honesty in form",
    rule: "If it would not survive a critic, it does not ship.",
    desc: "We design as though every visitor is the harshest art director we've ever met. Sloppy hierarchy, lazy grids, and decorative fluff are quietly cut.",
  },
  {
    num: "02",
    kanji: "速",
    title: "Speed is design",
    rule: "Performance is a feature of the brand, not an engineer's checkbox.",
    desc: "100ms of perceived lag is a hundred-millisecond stain on a reputation. Every project ships with a real performance budget and weekly audits.",
  },
  {
    num: "03",
    kanji: "型",
    title: "Systems beat one-offs",
    rule: "If a pattern repeats twice, it becomes part of the design system.",
    desc: "We hand you a living, documented system — components, tokens, motion guidelines — so your brand stays consistent long after we hand it off.",
  },
  {
    num: "04",
    kanji: "残",
    title: "We sign our work",
    rule: "A katana isn't anonymous. Neither is a Saya Labs build.",
    desc: "Every line of code, every interaction is auditable, attributable, and ours to defend. We stand behind the work years after launch — not just at the demo.",
  },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -6, scale: 1.1 },
        {
          yPercent: 6,
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

      const tenetEls = sectionRef.current?.querySelectorAll<HTMLElement>(".manifesto-tenet");
      tenetEls?.forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          delay: (i % 2) * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="story-section manifesto-section" id="manifesto">
      <div ref={bgRef} className="story-bg">
        <Image src="/images/story_manifesto.jpg" alt="" fill sizes="100vw" />
      </div>
      <div className="story-veil" />
      <div className="story-grain" />

      <div className="story-inner">
        <div className="manifesto-inner">
          <div className="manifesto-header">
            <RevealOnScroll y={30}>
              <span className="story-eyebrow">
                <span className="num">002 / 004</span>
                The Way
              </span>
            </RevealOnScroll>

            <SplitText
              as="h2"
              className="story-title manifesto-title"
              split="chars"
              stagger={0.03}
              duration={1.3}
            >
              FOUR TENETS.
            </SplitText>
            <SplitText
              as="h2"
              className="story-title manifesto-title manifesto-title--gold"
              split="chars"
              stagger={0.03}
              duration={1.3}
              delay={0.15}
            >
              ONE PHILOSOPHY.
            </SplitText>

            <RevealOnScroll>
              <div className="manifesto-divider">道 · WAY · 道</div>
            </RevealOnScroll>

            <RevealOnScroll y={30} delay={0.1}>
              <p className="story-lede" style={{ textAlign: "center", margin: "0 auto" }}>
                Our manifesto isn&apos;t a wall poster. It&apos;s a sharpening stone we
                return to before every decision — a quiet test the work has to
                pass before it leaves the studio.
              </p>
            </RevealOnScroll>
          </div>

          <div className="manifesto-grid">
            {tenets.map((t) => (
              <article key={t.num} className="manifesto-tenet">
                <div className="manifesto-tenet__head">
                  <span className="manifesto-tenet__num">TENET — {t.num}</span>
                  <span className="manifesto-tenet__kanji">{t.kanji}</span>
                </div>
                <h3 className="manifesto-tenet__title">{t.title}</h3>
                <p className="manifesto-tenet__rule">{t.rule}</p>
                <p className="manifesto-tenet__desc">{t.desc}</p>
                <span className="manifesto-tenet__counter">{t.num}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
