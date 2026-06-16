"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedNumber from "./AnimatedNumber";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-bg">
        <Image
          src="/images/about_bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.1 }}
        />
        <div className="section-bg-overlay" />
      </div>

      <div className="section-kanji">我々</div>

      <div className="container">
        <div className="about-layout">
          <RevealOnScroll y={50}>
            <div className="about-image">
              <Image
                src="/images/about_bg.png"
                alt="Dark bamboo forest — the path of mastery"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="about-image-overlay" />
              <span className="about-image-label">道</span>
            </div>
          </RevealOnScroll>

          <div className="about-text">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <RevealOnScroll>
                <div className="eyebrow">Who We Are</div>
              </RevealOnScroll>
              <SplitText
                as="h2"
                className="section-title"
                split="words"
                stagger={0.06}
                duration={1.2}
              >
                Born From Obsession.
              </SplitText>
            </div>

            <RevealOnScroll y={30}>
              <p>
                Saya Labs was founded on a singular belief: digital experiences
                should be forged with the same discipline and artistry as a
                master blade-smith shaping steel. We don&apos;t do templates. We
                don&apos;t do &quot;good enough.&quot;
              </p>
            </RevealOnScroll>

            <RevealOnScroll y={30} delay={0.1}>
              <p>
                Every project begins with deep understanding — of your brand, your
                audience, your ambitions. From there, we craft bespoke digital
                experiences that don&apos;t just meet expectations — they shatter them.
                Our team brings together world-class designers, engineers, and
                strategists united by an uncompromising pursuit of excellence.
              </p>
            </RevealOnScroll>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedNumber value={50} suffix="+" />
                </div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedNumber value={98} suffix="%" />
                </div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedNumber value={5} suffix="Y" />
                </div>
                <div className="stat-label">Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
