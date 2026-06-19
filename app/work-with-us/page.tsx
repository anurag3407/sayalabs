"use client";

import Image from "next/image";
import LenisProvider from "../components/LenisProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import SplitText from "../components/SplitText";
import RevealOnScroll from "../components/RevealOnScroll";
import MagneticButton from "../components/MagneticButton";

type Tier = {
  num: string;
  kanji: string;
  kicker: string;
  name: string;
  desc: string;
  list: string[];
  price: string;
  mesh: string;
  field: string;
  feature?: boolean;
};

const tiers: Tier[] = [
  {
    num: "I",
    kanji: "城",
    kicker: "Enterprise · Full Agency",
    name: "The Citadel",
    desc: "End-to-end product engineering for funded startups and established businesses. We own the entire build — architecture, MERN / Next.js development, design system, SEO and launch.",
    list: [
      "Full-stack MERN / Next.js",
      "Design systems & UI/UX",
      "Technical SEO & performance",
      "Dedicated team & roadmap",
      "Scalable cloud architecture",
      "Ongoing strategic partnership",
    ],
    price: "Engagement-based · scoped per project",
    mesh: "mesh-gradient--crimson",
    field: "bg-line-grid",
  },
  {
    num: "II",
    kanji: "刃",
    kicker: "Freelance · Sprint",
    name: "The Blade",
    desc: "A specific fix, a UI/UX overhaul, or a single feature shipped fast. Bring us in for a focused sprint, billed strictly by the hour or by milestone — no long engagement required.",
    list: [
      "Single-feature integrations",
      "UI/UX overhauls",
      "Bug fixes & rescues",
      "Performance tuning",
      "Billed hourly / per milestone",
      "Days-to-weeks turnaround",
    ],
    price: "Hourly · or fixed per milestone",
    mesh: "mesh-gradient--gold",
    field: "bg-dot-grid",
  },
  {
    num: "III",
    kanji: "種",
    kicker: "Catalyst · Partnership",
    name: "The Seed",
    desc: "A world-changing idea but no capital? The Catalyst tier is our incubator wing — we build your early-stage tech for partnership and shared upside, not cash. We back founders, not invoices.",
    list: [
      "Early-stage MVP builds",
      "Tech for equity / partnership",
      "No upfront cash required",
      "Hands-on founder support",
      "Mission-driven selection",
      "Long-term alignment",
    ],
    price: "Partnership · shared upside",
    mesh: "mesh-gradient--emerald",
    field: "bg-dot-grid",
    feature: true,
  },
  {
    num: "IV",
    kanji: "守",
    kicker: "Subscription · Maintain",
    name: "The Sheath",
    desc: "Already shipped? Keep your tech sharp. A monthly retainer covering maintenance, monitoring, security and continuous iteration — your product cared for like a blade kept oiled.",
    list: [
      "Maintenance & monitoring",
      "Security & dependency updates",
      "Continuous iteration",
      "Priority response SLA",
      "Monthly performance audits",
      "Cancel anytime",
    ],
    price: "From a fixed monthly retainer",
    mesh: "mesh-gradient--indigo",
    field: "bg-line-grid",
  },
];

export default function WorkWithUs() {
  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="funnel-page">
        {/* HERO */}
        <section className="funnel-hero">
          <div className="funnel-hero__bg">
            <Image src="/images/funnel_hero.png" alt="" fill priority quality={85} sizes="100vw" />
          </div>
          <div className="funnel-hero__veil" />
          <div className="saga-grid bg-line-grid bg-field-mask" style={{ opacity: 0.5 }} />

          <div className="funnel-hero__inner">
            <SplitText as="div" className="funnel-hero__eyebrow" split="words" stagger={0.05} duration={1} triggerOnScroll={false} delay={0.15}>
              Ways To Work With Us
            </SplitText>
            <h1 className="funnel-hero__title">
              <SplitText as="span" split="chars" stagger={0.04} duration={1.1} triggerOnScroll={false} delay={0.3}>
                Choose
              </SplitText>
              <br />
              <span className="accent">
                <SplitText as="span" split="chars" stagger={0.04} duration={1.1} triggerOnScroll={false} delay={0.45}>
                  your path.
                </SplitText>
              </span>
            </h1>
            <SplitText as="p" className="funnel-hero__lede" split="words" stagger={0.02} duration={0.9} triggerOnScroll={false} delay={0.8}>
              Not every brand needs the same blade. Four distinct ways to forge with Saya Labs — from full-agency engagements to a mission-driven partnership tier for founders with a world-changing idea and no capital.
            </SplitText>

            <div className="funnel-hero__paths">
              {tiers.map((t) => (
                <span key={t.num} className="funnel-hero__path">
                  <span className="i">{t.num}</span> {t.kicker.split(" · ")[0]}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="funnel-section" id="tiers">
          <div className="funnel-section__head">
            <span className="funnel-section__eyebrow">The Three-Tier Funnel · + Care</span>
            <RevealOnScroll y={22}>
              <h2 className="funnel-section__title">
                Four paths, <span className="accent">one standard of craft.</span>
              </h2>
            </RevealOnScroll>
          </div>

          {tiers.map((t) => (
            <RevealOnScroll key={t.num} y={40}>
              <article className={`tier-row${t.feature ? " tier-row--feature" : ""}`}>
                <div className={`tier-row__visual mesh-gradient mesh-gradient--animated ${t.mesh}`}>
                  <span className={`${t.field} bg-field-mask`} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.55 }} />
                  <span className="tier-row__num">№ {t.num}</span>
                  <span className="kanji">{t.kanji}</span>
                </div>

                <div className="tier-row__body">
                  <span className="tier-row__kicker">{t.kicker}</span>
                  <h3 className="tier-row__name">{t.name}</h3>
                  <p className="tier-row__desc">{t.desc}</p>
                  <ul className="tier-row__list">
                    {t.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                  <div className="tier-row__foot">
                    <span className="tier-row__price">
                      <b>{t.name}</b> — {t.price}
                    </span>
                    <MagneticButton href="/#contact" className="btn-secondary">
                      Start here
                    </MagneticButton>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </section>

        {/* CTA */}
        <section className="funnel-cta mesh-gradient mesh-gradient--crimson mesh-gradient--animated">
          <span className="bg-dot-grid bg-field-mask" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }} />
          <div className="funnel-cta__inner">
            <RevealOnScroll y={22}>
              <h2 className="funnel-cta__title">
                Tell us which <span className="accent">path fits.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll y={26}>
              <p className="funnel-cta__text">
                One short note about where you are and where you want to go. We&apos;ll tell you honestly which tier makes sense — even if it isn&apos;t the biggest one.
              </p>
            </RevealOnScroll>
            <RevealOnScroll y={20} delay={0.1}>
              <MagneticButton href="/#contact" className="btn-primary">
                Begin the conversation
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </LenisProvider>
  );
}
