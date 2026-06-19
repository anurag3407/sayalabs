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

const featured = {
  image: "/images/portfolio_1.png",
  category: "Featured Project / 2026",
  client: "NEO TOKYO STUDIO",
  title: "A digital identity for the new avant-garde",
  desc: "Complete brand world, art direction, and a custom-built site with WebGL transitions. From identity to launch in eight weeks.",
};

const projects = [
  {
    image: "/images/portfolio_2.png",
    category: "Mobile Commerce",
    name: "ENSŌ COLLECTION",
    desc: "Luxury mobile shopping experience guided by Japanese minimalism.",
    aspect: "tall" as const,
  },
  {
    image: "/images/portfolio_3.png",
    category: "Marketplace",
    name: "WABI-SABI MARKET",
    desc: "Artisan marketplace with immersive product pages and editorial discovery.",
    aspect: "wide" as const,
  },
  {
    image: "/images/portfolio_bg.png",
    category: "Brand Identity",
    name: "ZEN GARDENS",
    desc: "Sustained visual language for a luxury wellness brand.",
    aspect: "square" as const,
  },
  {
    image: "/images/about_bg.png",
    category: "Editorial Site",
    name: "FORGE QUARTERLY",
    desc: "A long-form publication for craftsmen, makers, and contrarians.",
    aspect: "tall" as const,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".portfolio-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(15% 15% 15% 15%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      });

      const featuredEl = sectionRef.current?.querySelector<HTMLElement>(".portfolio-featured-img");
      if (featuredEl) {
        gsap.fromTo(
          featuredEl,
          { scale: 1.3 },
          {
            scale: 1.08,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: { trigger: featuredEl, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section portfolio-section" id="work">
      <div className="container">
        <div className="section-header">
          <RevealOnScroll>
            <div className="eyebrow">Selected Work — 2025 / 2026</div>
          </RevealOnScroll>
          <SplitText as="h2" className="section-title" split="chars" stagger={0.025}>
            PORTFOLIO
          </SplitText>
          <RevealOnScroll y={30} delay={0.2}>
            <p className="section-description">
              A deliberately small roster of work — case studies in restraint,
              motion, and brands that earned a second look. Each one a chapter
              in a shared notebook.
            </p>
          </RevealOnScroll>
        </div>

        <div className="portfolio-divider">— Featured engagement —</div>

        <a className="portfolio-featured" href="#contact" data-cursor="text" data-cursor-label="VIEW CASE">
          <Image
            src={featured.image}
            alt={featured.client}
            fill
            sizes="100vw"
            className="portfolio-featured-img"
            style={{ objectFit: "cover" }}
          />
          <div className="portfolio-featured-overlay">
            <div className="portfolio-featured-meta">
              <span className="gold">{featured.category}</span>
              <span>{featured.client}</span>
            </div>
            <h3 className="portfolio-featured-title">{featured.title}</h3>
            <p className="portfolio-featured-desc">{featured.desc}</p>
          </div>
        </a>

        <div className="portfolio-divider">— More from the archive —</div>

        <div className="portfolio-asym">
          <div className="portfolio-asym__col">
            <a
              className={`portfolio-card portfolio-card--${projects[0].aspect}`}
              href="#contact"
              data-cursor="text"
              data-cursor-label="VIEW"
            >
              <Image
                src={projects[0].image}
                alt={projects[0].name}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
              <div className="portfolio-card-overlay">
                <span className="portfolio-card-category">{projects[0].category}</span>
                <h4 className="portfolio-card-title">{projects[0].name}</h4>
                <p className="portfolio-card-desc">{projects[0].desc}</p>
              </div>
            </a>
            <a
              className={`portfolio-card portfolio-card--${projects[1].aspect}`}
              href="#contact"
              data-cursor="text"
              data-cursor-label="VIEW"
            >
              <Image
                src={projects[1].image}
                alt={projects[1].name}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
              <div className="portfolio-card-overlay">
                <span className="portfolio-card-category">{projects[1].category}</span>
                <h4 className="portfolio-card-title">{projects[1].name}</h4>
                <p className="portfolio-card-desc">{projects[1].desc}</p>
              </div>
            </a>
          </div>
          <div className="portfolio-asym__col">
            <a
              className={`portfolio-card portfolio-card--${projects[2].aspect}`}
              href="#contact"
              data-cursor="text"
              data-cursor-label="VIEW"
            >
              <Image
                src={projects[2].image}
                alt={projects[2].name}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
              <div className="portfolio-card-overlay">
                <span className="portfolio-card-category">{projects[2].category}</span>
                <h4 className="portfolio-card-title">{projects[2].name}</h4>
                <p className="portfolio-card-desc">{projects[2].desc}</p>
              </div>
            </a>
            <a
              className={`portfolio-card portfolio-card--${projects[3].aspect}`}
              href="#contact"
              data-cursor="text"
              data-cursor-label="VIEW"
            >
              <Image
                src={projects[3].image}
                alt={projects[3].name}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
              <div className="portfolio-card-overlay">
                <span className="portfolio-card-category">{projects[3].category}</span>
                <h4 className="portfolio-card-title">{projects[3].name}</h4>
                <p className="portfolio-card-desc">{projects[3].desc}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
