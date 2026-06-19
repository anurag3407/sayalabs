"use client";

import Image from "next/image";
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

type Project = {
  image: string;
  cat: string;
  year: string;
  name: string;
  desc: string;
  span: "wide" | "half" | "third";
};

const projects: Project[] = [
  {
    image: "/images/proj_2.png",
    cat: "Web App · Fintech",
    year: "2026",
    name: "MERIDIAN",
    desc: "A real-time trading & portfolio dashboard — dense data made calm, fast and legible.",
    span: "wide",
  },
  {
    image: "/images/proj_1.png",
    cat: "E-Commerce · Fashion",
    year: "2026",
    name: "ATELIER NOIR",
    desc: "A luxury fashion house online — editorial product storytelling with WebGL transitions.",
    span: "half",
  },
  {
    image: "/images/proj_3.png",
    cat: "Hospitality · Restaurant",
    year: "2025",
    name: "KAISEKI",
    desc: "A fine-dining reservation experience steeped in stillness, season and ceremony.",
    span: "half",
  },
  {
    image: "/images/portfolio_1.png",
    cat: "Brand Identity",
    year: "2026",
    name: "NEO TOKYO STUDIO",
    desc: "A complete identity for the new avant-garde — from logotype to a custom-built site.",
    span: "third",
  },
  {
    image: "/images/portfolio_2.png",
    cat: "Mobile Commerce",
    year: "2025",
    name: "ENSŌ",
    desc: "Luxury mobile shopping guided by Japanese minimalism and a single, perfect circle.",
    span: "third",
  },
  {
    image: "/images/portfolio_3.png",
    cat: "Marketplace",
    year: "2025",
    name: "WABI-SABI MARKET",
    desc: "An artisan marketplace with immersive product pages and editorial discovery.",
    span: "third",
  },
  {
    image: "/images/proj_4.png",
    cat: "Web3 · Brand",
    year: "2026",
    name: "PRISM PROTOCOL",
    desc: "A bold on-chain brand — kinetic 3D identity and a landing built to convert believers.",
    span: "half",
  },
  {
    image: "/images/about_bg.png",
    cat: "Editorial · Publication",
    year: "2025",
    name: "FORGE QUARTERLY",
    desc: "A long-form publication for craftsmen, makers and contrarians. Words given room.",
    span: "half",
  },
];

export default function ProjectsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gridRef.current
        ?.querySelectorAll<HTMLElement>(".project-card")
        .forEach((card) => {
          gsap.fromTo(
            card,
            { clipPath: "inset(12% 12% 12% 12%)", opacity: 0, y: 30 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              y: 0,
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }
          );
        });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="projects-page">
        <section className="projects-hero mesh-gradient mesh-gradient--crimson mesh-gradient--animated">
          <span
            className="bg-dot-grid bg-field-mask"
            style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }}
          />
          <div className="projects-hero__inner">
            <SplitText as="div" className="projects-hero__eyebrow" split="words" stagger={0.05} duration={1} triggerOnScroll={false} delay={0.15}>
              Selected Work · 2025 — 2026
            </SplitText>
            <h1 className="projects-hero__title">
              <SplitText as="span" split="chars" stagger={0.04} duration={1.1} triggerOnScroll={false} delay={0.3}>
                The
              </SplitText>{" "}
              <span className="accent">
                <SplitText as="span" split="chars" stagger={0.04} duration={1.1} triggerOnScroll={false} delay={0.42}>
                  archive.
                </SplitText>
              </span>
            </h1>
            <SplitText as="p" className="projects-hero__lede" split="words" stagger={0.02} duration={0.9} triggerOnScroll={false} delay={0.75}>
              A deliberately small roster — case studies in restraint, motion and brands that earned a second look. Every one a blade with a signature.
            </SplitText>
          </div>
        </section>

        <div ref={gridRef} className="projects-grid">
          {projects.map((p, i) => (
            <a
              key={p.name}
              href="/#contact"
              className={`project-card project-card--${p.span}`}
              data-cursor="text"
              data-cursor-label="VIEW"
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes={p.span === "wide" ? "100vw" : p.span === "half" ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 33vw"}
                className="project-card__img"
                style={{ objectFit: "cover" }}
              />
              <div className="project-card__overlay">
                <div className="project-card__top">
                  <span className="project-card__cat">{p.cat}</span>
                  <span className="project-card__idx">№ {String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="project-card__bottom">
                  <span className="project-card__year">{p.year}</span>
                  <h3 className="project-card__name">{p.name}</h3>
                  <p className="project-card__desc">{p.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <section className="projects-cta">
          <RevealOnScroll y={24}>
            <h2 className="projects-cta__title">
              Your project, <span className="accent">next in the archive.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll y={18} delay={0.1}>
            <MagneticButton href="/#contact" className="btn-primary">
              Start a Project
            </MagneticButton>
          </RevealOnScroll>
        </section>
      </main>

      <Footer />
    </LenisProvider>
  );
}
