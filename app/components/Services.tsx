"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    number: "01",
    kanji: "意匠",
    title: "Web Design",
    desc: "Visually striking, intentional interfaces. Editorial typography, considered motion, and an aesthetic that captures the soul of your brand.",
    capabilities: ["Art Direction", "UI Systems", "Interaction Design", "Brand Worlds"],
  },
  {
    number: "02",
    kanji: "技術",
    title: "Development",
    desc: "High-performance engineering with modern stacks — Next.js, React, headless CMS, Three.js, custom WebGL. Every byte considered, every interaction crafted.",
    capabilities: ["Next.js / React", "Headless CMS", "WebGL / Three.js", "Performance"],
  },
  {
    number: "03",
    kanji: "戦略",
    title: "SEO & Strategy",
    desc: "Visibility that compounds. Technical SEO foundations, semantic content architectures, and data-driven growth strategies that turn traffic into revenue.",
    capabilities: ["Technical SEO", "Content Strategy", "Schema / Structured Data", "Analytics"],
  },
  {
    number: "04",
    kanji: "動感",
    title: "Motion Design",
    desc: "Animations with intent. Scroll narratives, micro-interactions, cinematic page transitions — motion that earns its place on every frame.",
    capabilities: ["GSAP Choreography", "WebGL Effects", "Scroll Stories", "Cinematic Loaders"],
  },
  {
    number: "05",
    kanji: "象徴",
    title: "Brand Identity",
    desc: "Complete visual systems. Logo, type, color, voice, and a sustained language that ages well across every touchpoint your brand inhabits.",
    capabilities: ["Logo Systems", "Typography", "Visual Language", "Guidelines"],
  },
  {
    number: "06",
    kanji: "完成",
    title: "Launch & Care",
    desc: "From hand-off to lift-off — rigorous QA, performance tuning, accessibility compliance, and ongoing partnership long after the launch champagne.",
    capabilities: ["QA & Testing", "Accessibility", "Performance Audits", "Maintenance"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll<HTMLElement>(".service-row");
      rows?.forEach((row) => {
        const idx = row.querySelector(".service-row__index strong");
        if (idx) {
          gsap.from(idx, {
            yPercent: 30,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
          });
        }
        gsap.from(row.querySelectorAll(".service-row__list li"), {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: row, start: "top 75%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section services-section" id="services">
      <div className="container">
        <div className="section-header">
          <RevealOnScroll>
            <div className="eyebrow">What We Do</div>
          </RevealOnScroll>
          <SplitText
            as="h2"
            className="section-title"
            split="chars"
            stagger={0.025}
            duration={1.1}
          >
            DISCIPLINES
          </SplitText>
          <RevealOnScroll y={30} delay={0.2}>
            <p className="section-description">
              Six disciplines. One philosophy. We approach every project with the precision of a master craftsman — no shortcuts, no compromises.
            </p>
          </RevealOnScroll>
        </div>

        <div className="services-list">
          {services.map((s, i) => (
            <div
              key={s.number}
              className={`service-row ${i % 2 === 1 ? "service-row--reverse" : ""}`}
            >
              <div className="service-row__index">
                <div>
                  <span className="kanji">{s.kanji}</span>
                  <span className="label">Discipline {s.number}</span>
                  <strong>{s.number}</strong>
                </div>
              </div>
              <div className="service-row__body">
                <SplitText
                  as="h3"
                  className="service-row__title"
                  split="words"
                  stagger={0.04}
                  duration={1}
                >
                  {s.title}
                </SplitText>
                <p className="service-row__desc">{s.desc}</p>
                <ul className="service-row__list">
                  {s.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
