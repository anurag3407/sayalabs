"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    text: "Saya Labs didn't just build us a website — they forged a digital identity that perfectly captures our brand's soul. Every detail is intentional.",
    name: "Akira Tanaka",
    role: "CEO, NeoForge Studios",
    initials: "AT",
  },
  {
    text: "Working with their team felt like having a secret weapon. Every deliverable exceeded expectations. The motion design alone doubled our engagement.",
    name: "Sarah Chen",
    role: "Head of Digital, Apex Ventures",
    initials: "SC",
  },
  {
    text: "They approached our rebrand with the discipline of a master artisan. The result? A visual identity that commands respect in every room it enters.",
    name: "Marcus Wolf",
    role: "Founder, Iron & Oak",
    initials: "MW",
  },
  {
    text: "Our conversion rate jumped 340% after launch. Saya Labs understands that great design isn't just aesthetics — it's results that move the needle.",
    name: "Priya Sharma",
    role: "CMO, Celestial Commerce",
    initials: "PS",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0 || !pinRef.current) return;

      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 30,
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 0.94,
          zIndex: cards.length - i,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${cards.length * 80}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.min(
              cards.length - 1,
              Math.floor(self.progress * cards.length)
            );
            setActiveIdx(i);
          },
        },
      });

      for (let i = 1; i < cards.length; i++) {
        tl.to(
          cards[i - 1],
          { yPercent: -20, opacity: 0, scale: 0.92, duration: 1, ease: "power2.inOut" },
          i
        );
        tl.fromTo(
          cards[i],
          { yPercent: 30, opacity: 0, scale: 0.94 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          i
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", margin: "0 auto clamp(60px,8vw,120px)" }}>
          <RevealOnScroll>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Client Voices</div>
          </RevealOnScroll>
          <SplitText as="h2" className="section-title" split="chars" stagger={0.025}>
            TESTIMONIALS
          </SplitText>
          <RevealOnScroll y={30} delay={0.2}>
            <p className="section-description" style={{ margin: "0 auto" }}>
              Words from those who&apos;ve walked the path with us.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div ref={pinRef} className="testimonials-pin">
        <div className="testimonials-stack">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="testimonial-stack-card"
            >
              <span className="testimonial-stack-card__quote">&ldquo;</span>
              <p className="testimonial-stack-card__text">{t.text}</p>
              <div className="testimonial-stack-card__author">
                <div className="testimonial-stack-card__avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-stack-card__name">{t.name}</div>
                  <div className="testimonial-stack-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-counter">
          <span>{String(activeIdx + 1).padStart(2, "0")}</span>
          <div style={{ display: "flex", gap: 8 }}>
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`testimonials-counter__dot ${
                  i === activeIdx ? "testimonials-counter__dot--active" : ""
                }`}
              />
            ))}
          </div>
          <span>{String(testimonials.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
