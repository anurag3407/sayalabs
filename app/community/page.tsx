"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LenisProvider from "../components/LenisProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import SplitText from "../components/SplitText";
import RevealOnScroll from "../components/RevealOnScroll";
import MagneticButton from "../components/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Repo = {
  kanji: string;
  name: string;
  tagline: string;
  desc: string;
  tags: string[];
  stars: string;
  lang: string;
  mesh: string;
};

const repos: Repo[] = [
  {
    kanji: "折",
    name: "origami",
    tagline: "Scroll choreography, 4kb.",
    desc: "Declarative scroll-driven animation on top of the Web Animations API. No dependencies, buttery on mobile, framework-agnostic.",
    tags: ["TypeScript", "WAAPI", "Zero-dep"],
    stars: "2.1k",
    lang: "TypeScript",
    mesh: "mesh-gradient--crimson",
  },
  {
    kanji: "鍔",
    name: "tsuba",
    tagline: "Headless, motion-first UI.",
    desc: "A headless React component library forged for motion-first interfaces — accessible primitives, your styles, our springs.",
    tags: ["React", "A11y", "Headless"],
    stars: "1.7k",
    lang: "TypeScript",
    mesh: "mesh-gradient--gold",
  },
  {
    kanji: "墨",
    name: "sumi",
    tagline: "Ink-wash backgrounds.",
    desc: "Generate cinematic mesh-gradient, grain and ink-wash backgrounds as SVG or canvas — the exact look across this very site.",
    tags: ["Canvas", "SVG", "Generative"],
    stars: "940",
    lang: "JavaScript",
    mesh: "mesh-gradient--indigo",
  },
  {
    kanji: "柱",
    name: "hashira",
    tagline: "The luxury Next.js starter.",
    desc: "An opinionated Next.js starter with Lenis smooth scroll, GSAP, a custom cursor and a complete dark luxury design system baked in.",
    tags: ["Next.js", "GSAP", "Lenis"],
    stars: "1.3k",
    lang: "TypeScript",
    mesh: "mesh-gradient--emerald",
  },
  {
    kanji: "刀",
    name: "katana",
    tagline: "Ship fast or don't ship.",
    desc: "A performance-budget guardian for CI — Lighthouse assertions with a blade that fails the build when a page gets slow.",
    tags: ["CI", "Node", "Perf"],
    stars: "1.1k",
    lang: "TypeScript",
    mesh: "mesh-gradient--crimson",
  },
  {
    kanji: "継",
    name: "kintsugi",
    tagline: "Layouts that own the seams.",
    desc: "A tiny layout engine for broken-grid and masonry compositions that celebrate the cracks instead of hiding them.",
    tags: ["CSS", "Vanilla JS"],
    stars: "620",
    lang: "CSS",
    mesh: "mesh-gradient--gold",
  },
];

const values = [
  { kanji: "無", t: "Free, forever", d: "No paywalls, no premium tier, no rug-pull. What we open-source stays open." },
  { kanji: "信", t: "MIT licensed", d: "Fork it, ship it, sell it. Attribution is appreciated, never required." },
  { kanji: "公", t: "Built in public", d: "Roadmaps, RFCs and ugly first drafts — out in the open from commit one." },
];

export default function CommunityPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gridRef.current
        ?.querySelectorAll<HTMLElement>(".repo-card")
        .forEach((card, i) => {
          gsap.from(card, {
            y: 44,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="community-page">
        {/* HERO */}
        <section className="community-hero mesh-gradient mesh-gradient--crimson mesh-gradient--animated">
          <span
            className="bg-dot-grid bg-field-mask"
            style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }}
          />
          <span className="community-hero__glyph">結</span>
          <div className="community-hero__inner">
            <SplitText as="div" className="community-hero__eyebrow" split="words" stagger={0.05} duration={1} triggerOnScroll={false} delay={0.15}>
              Open Source · The Saya Commons
            </SplitText>
            <h1 className="community-hero__title">
              <SplitText as="span" split="chars" stagger={0.04} duration={1.1} triggerOnScroll={false} delay={0.3}>
                Craft,
              </SplitText>{" "}
              <span className="accent">
                <SplitText as="span" split="chars" stagger={0.04} duration={1.1} triggerOnScroll={false} delay={0.42}>
                  shared.
                </SplitText>
              </span>
            </h1>
            <SplitText as="p" className="community-hero__lede" split="words" stagger={0.02} duration={0.9} triggerOnScroll={false} delay={0.78}>
              Beyond client work, we build genuinely useful things — design tools, web frameworks, experiments — and give them to the world, free and open-source. This is the Commons: our workshop with the doors open.
            </SplitText>
            <div className="community-hero__actions">
              <MagneticButton href="https://github.com" className="btn-primary">
                Browse the GitHub
              </MagneticButton>
              <MagneticButton href="#repos" className="btn-secondary">
                See the projects
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="community-values">
          {values.map((v) => (
            <RevealOnScroll key={v.t} y={30}>
              <div className="value-card bg-dot-grid">
                <span className="value-card__kanji">{v.kanji}</span>
                <h3 className="value-card__title">{v.t}</h3>
                <p className="value-card__desc">{v.d}</p>
              </div>
            </RevealOnScroll>
          ))}
        </section>

        {/* REPOS */}
        <section className="community-repos" id="repos">
          <div className="community-repos__head">
            <span className="community-repos__eyebrow">The Projects · 結</span>
            <RevealOnScroll y={22}>
              <h2 className="community-repos__title">
                Open by <span className="accent">default.</span>
              </h2>
            </RevealOnScroll>
          </div>

          <div ref={gridRef} className="repo-grid">
            {repos.map((r) => (
              <a key={r.name} href="https://github.com" className="repo-card" data-cursor="link">
                <div className={`repo-card__cap mesh-gradient mesh-gradient--animated ${r.mesh}`}>
                  <span
                    className="bg-line-grid bg-field-mask"
                    style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.45 }}
                  />
                  <span className="repo-card__kanji">{r.kanji}</span>
                  <span className="repo-card__star">★ {r.stars}</span>
                </div>
                <div className="repo-card__body">
                  <div className="repo-card__namerow">
                    <h3 className="repo-card__name">{r.name}</h3>
                    <span className="repo-card__lang"><i className="dot" /> {r.lang}</span>
                  </div>
                  <p className="repo-card__tagline">{r.tagline}</p>
                  <p className="repo-card__desc">{r.desc}</p>
                  <div className="repo-card__tags">
                    {r.tags.map((t) => (
                      <span key={t} className="repo-tag">{t}</span>
                    ))}
                  </div>
                  <span className="repo-card__go">View on GitHub →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="community-cta mesh-gradient mesh-gradient--indigo mesh-gradient--animated">
          <span
            className="bg-dot-grid bg-field-mask"
            style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }}
          />
          <div className="community-cta__inner">
            <RevealOnScroll y={22}>
              <h2 className="community-cta__title">
                Build it <span className="accent">with us.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll y={18} delay={0.1}>
              <p className="community-cta__text">
                Star a repo, open an issue, send a pull request — or pitch a project you wish existed. The Commons grows by hands, not headcount.
              </p>
            </RevealOnScroll>
            <RevealOnScroll y={16} delay={0.16}>
              <MagneticButton href="https://github.com" className="btn-primary">
                Join on GitHub
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </LenisProvider>
  );
}
