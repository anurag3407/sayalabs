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

export default function Blade() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const kanjiRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background slow zoom + parallax
      gsap.fromTo(
        bgRef.current,
        { scale: 1.18 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      // Pin the headline section while user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.8}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
            if (labelRef.current) {
              const stage = self.progress < 0.5 ? "DRAW" : "STRIKE";
              if (labelRef.current.textContent !== stage) {
                labelRef.current.textContent = stage;
              }
            }
          },
        },
      });

      // Initial state
      gsap.set([leftRef.current, rightRef.current], { y: 80, opacity: 0 });
      gsap.set(kanjiRef.current, { scale: 0.7, opacity: 0 });

      tl.to(kanjiRef.current, { opacity: 0.6, scale: 1, duration: 1, ease: "expo.out" }, 0)
        .to(leftRef.current, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, 0.15)
        .to(rightRef.current, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, 0.25)
        .to(kanjiRef.current, { letterSpacing: "0.08em", duration: 1.5, ease: "none" }, 0.5)
        .to(
          leftRef.current,
          { x: -40, opacity: 0.4, duration: 1, ease: "power2.in" },
          1.4
        )
        .to(
          rightRef.current,
          { x: 40, opacity: 0.4, duration: 1, ease: "power2.in" },
          1.4
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="blade-section" id="blade">
      <div ref={pinRef} className="blade-pin">
        <div ref={bgRef} className="blade-bg">
          <Image src="/images/story_blade.jpg" alt="" fill sizes="100vw" priority={false} />
        </div>
        <div className="blade-veil" />
        <div className="story-grain" />

        <div className="blade-content">
          <div ref={leftRef} className="blade-content__left">
            <RevealOnScroll>
              <span className="blade-meta">003 / 004 — The Blade</span>
            </RevealOnScroll>

            <SplitText
              as="h2"
              className="blade-headline"
              split="words"
              stagger={0.05}
              duration={1.2}
            >
              Every project
            </SplitText>
            <SplitText
              as="h2"
              className="blade-headline"
              split="words"
              stagger={0.05}
              duration={1.2}
              delay={0.1}
            >
              is a one-of-one.
            </SplitText>

            <p className="blade-text">
              A katana isn&apos;t templated. It&apos;s drawn, ground, polished, sharpened
              and signed by a single hand. We carry that ritual into the web —
              one studio, one signature, one blade per client.
            </p>

            <div className="blade-stat">
              <div className="blade-stat__num">~ 8 weeks</div>
              <div className="blade-stat__label">From spark to launch</div>
            </div>
          </div>

          <div className="blade-center">
            <span ref={kanjiRef} className="blade-center__kanji">刀</span>
          </div>

          <div ref={rightRef} className="blade-content__right">
            <RevealOnScroll>
              <span className="blade-meta">A signature, not a service</span>
            </RevealOnScroll>

            <SplitText
              as="h2"
              className="blade-headline blade-headline--gold"
              split="words"
              stagger={0.05}
              duration={1.2}
              delay={0.05}
            >
              Signed.
            </SplitText>
            <SplitText
              as="h2"
              className="blade-headline blade-headline--stroke"
              split="words"
              stagger={0.05}
              duration={1.2}
              delay={0.12}
            >
              Sharpened.
            </SplitText>
            <SplitText
              as="h2"
              className="blade-headline"
              split="words"
              stagger={0.05}
              duration={1.2}
              delay={0.2}
            >
              Shipped.
            </SplitText>

            <p className="blade-text">
              No outsourced teams. No interns prototyping your brand. The same
              hands that scope your engagement are the ones that name a CSS
              variable at 1 AM the night before launch.
            </p>

            <div className="blade-stat">
              <div className="blade-stat__num">12 / yr</div>
              <div className="blade-stat__label">Clients we accept</div>
            </div>
          </div>
        </div>

        <div className="blade-progress">
          <span ref={labelRef}>DRAW</span>
          <div className="blade-progress__track">
            <div ref={progressRef} className="blade-progress__fill" />
          </div>
          <span>STRIKE</span>
        </div>
      </div>
    </section>
  );
}
