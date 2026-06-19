"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedNumber from "./AnimatedNumber";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SAGA — a 4-beat samurai storytelling scroll that replaces the old
 * Hero + AboutSaya. The fixed SamuraiScene canvas (z5) threads the
 * model through these beats with a cinematic scroll camera; copy here
 * sits at z8 so it stays readable over the model.
 */
export default function HeroStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Per-beat background parallax
      rootRef.current
        ?.querySelectorAll<HTMLElement>(".saga-bg")
        .forEach((bg) => {
          gsap.fromTo(
            bg,
            { yPercent: -8 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: bg.closest(".saga"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });

      // Mega kanji drift
      rootRef.current
        ?.querySelectorAll<HTMLElement>(".saga-kanji-mega")
        .forEach((k) => {
          gsap.fromTo(
            k,
            { yPercent: 12, opacity: 0.5 },
            {
              yPercent: -12,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: k.closest(".saga"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="saga-root">
      {/* ── BEAT 1 — Intro ── */}
      <section className="saga saga--intro" id="home">
        <div className="saga-bg">
          <Image
            src="/images/saga_1.png"
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
        <div className="saga-veil" />
        <div className="saga-grid bg-line-grid bg-field-mask" />
        <div className="saga-grain" />

        <div className="saga-inner">
          <SplitText
            as="div"
            className="saga-eyebrow"
            split="words"
            stagger={0.05}
            duration={1.1}
            triggerOnScroll={false}
            delay={0.2}
          >
            Digital Craft Studio
          </SplitText>

          <h1 className="saga-title">
            <SplitText as="span" split="chars" stagger={0.04} duration={1.2} triggerOnScroll={false} delay={0.4}>
              SAYA
            </SplitText>
            <br />
            <span className="accent">
              <SplitText as="span" split="chars" stagger={0.04} duration={1.2} triggerOnScroll={false} delay={0.6}>
                LABS
              </SplitText>
            </span>
          </h1>

          <SplitText
            as="p"
            className="saga-lede"
            split="words"
            stagger={0.02}
            duration={0.95}
            triggerOnScroll={false}
            delay={1.0}
          >
            We forge extraordinary digital experiences — blending timeless design
            philosophy with cutting-edge technology to build brands that command
            attention and inspire action.
          </SplitText>

          <div className="saga-actions">
            <MagneticButton href="#engage" className="btn-primary">
              Start Your Journey
            </MagneticButton>
            <MagneticButton href="/projects" className="btn-secondary">
              View Our Work
            </MagneticButton>
          </div>
        </div>

        <div className="saga-meta-strip">
          <span><span className="dot" /> Tokyo / Worldwide</span>
          <span>Established 2026</span>
          <span>Design · Development · SEO</span>
        </div>

        <div className="saga-scroll-cue">
          <span>Scroll</span>
          <div className="line" />
        </div>
      </section>

      {/* ── BEAT 2 — The Vow (left) ── */}
      <section className="saga saga--left" id="saga-vow">
        <div className="saga-bg">
          <Image src="/images/saga_2.png" alt="" fill quality={82} sizes="100vw" />
        </div>
        <div className="saga-veil" />
        <div className="saga-grid bg-dot-grid bg-field-mask" />
        <div className="saga-grain" />
        <span className="saga-kanji-mega" style={{ right: "4%", bottom: "2%" }}>鍛</span>

        <div className="saga-inner">
          <div className="saga-block">
            <RevealOnScroll y={28}>
              <span className="saga-eyebrow">Ⅰ — The Vow</span>
            </RevealOnScroll>
            <SplitText as="h2" className="saga-headline" split="words" stagger={0.05} duration={1.2}>
              No templates.
            </SplitText>
            <SplitText as="h2" className="saga-headline saga-headline--gold" split="words" stagger={0.05} duration={1.2} delay={0.12}>
              Only commissions.
            </SplitText>
            <RevealOnScroll y={26} delay={0.1}>
              <p className="saga-lede">
                Every engagement is drawn from raw steel — researched, questioned and
                rebuilt from first principles. We treat a website the way an Edo-period
                smith treated a blade: heated, folded, hammered, sharpened, signed.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── BEAT 3 — The Edge (right) ── */}
      <section className="saga saga--right" id="saga-edge">
        <div className="saga-bg">
          <Image src="/images/saga_3.png" alt="" fill quality={82} sizes="100vw" />
        </div>
        <div className="saga-veil" />
        <div className="saga-grid bg-line-grid bg-field-mask" />
        <div className="saga-grain" />
        <span className="saga-kanji-mega" style={{ left: "3%", bottom: "4%" }}>匠</span>

        <div className="saga-inner">
          <div className="saga-block">
            <RevealOnScroll y={28}>
              <span className="saga-eyebrow">Ⅱ — The Edge</span>
            </RevealOnScroll>
            <SplitText as="h2" className="saga-headline" split="words" stagger={0.05} duration={1.2}>
              Designed sharp.
            </SplitText>
            <SplitText as="h2" className="saga-headline saga-headline--stroke" split="words" stagger={0.05} duration={1.2} delay={0.12}>
              Built to last.
            </SplitText>
            <RevealOnScroll y={26} delay={0.1}>
              <p className="saga-lede">
                Performance is a brand virtue, not an engineer&apos;s checkbox. Motion
                that earns its frame, typography that breathes, and a system you can
                hand to your team — every pixel in service of authority and revenue.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── BEAT 4 — The Signature (center, folds in AboutSaya) ── */}
      <section className="saga saga--center" id="saga-craft">
        <div className="saga-bg">
          <Image src="/images/saga_4.png" alt="" fill quality={82} sizes="100vw" />
        </div>
        <div className="saga-veil" />
        <div className="saga-grid bg-dot-grid bg-field-mask" />
        <div className="saga-grain" />

        <div className="saga-inner">
          <RevealOnScroll y={26}>
            <span className="saga-eyebrow" style={{ justifyContent: "center" }}>
              Ⅲ — The Signature
            </span>
          </RevealOnScroll>

          <h2 className="saga-craft__wordmark">
            SAYALABS
            <br />
            <span className="accent">DIGITAL CRAFT</span>
          </h2>

          <div className="saga-stats">
            <div>
              <div className="saga-stat__num">
                <AnimatedNumber value={250} />
                <span className="suffix">+</span>
              </div>
              <div className="saga-stat__label">Partners Worldwide</div>
            </div>
            <div>
              <div className="saga-stat__num">
                <AnimatedNumber value={20} />
                <span className="suffix">+</span>
              </div>
              <div className="saga-stat__label">Team Members</div>
            </div>
            <div>
              <div className="saga-stat__num">
                <AnimatedNumber value={98} />
                <span className="suffix">%</span>
              </div>
              <div className="saga-stat__label">Repeat Engagement</div>
            </div>
          </div>

          <div className="saga-socials">
            {[
              { l: "GH", h: "https://github.com" },
              { l: "X", h: "#" },
              { l: "IN", h: "#" },
              { l: "YT", h: "#" },
            ].map((s) => (
              <a key={s.l} href={s.h} className="saga-social" data-cursor="link">
                {s.l}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
