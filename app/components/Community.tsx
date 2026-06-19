"use client";

import RevealOnScroll from "./RevealOnScroll";
import MagneticButton from "./MagneticButton";

export default function Community() {
  return (
    <section className="community" id="community">
      <div className="community__card">
        <div className="community__body">
          <RevealOnScroll y={24}>
            <span className="community__kicker">Open Source · The Saya Commons</span>
          </RevealOnScroll>

          <RevealOnScroll y={20}>
            <h2 className="community__title">
              Built in the open. <span className="accent">Given to everyone.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll y={24} delay={0.08}>
            <p className="community__text">
              Beyond client work, Saya Labs runs a community where we build genuinely
              cool projects — design tools, web experiments, open frameworks — and
              release them to the world, free and open-source. No paywalls, no catch.
              Craft, shared.
            </p>
          </RevealOnScroll>

          <RevealOnScroll y={20} delay={0.12}>
            <div className="community__meta">
              <div>
                <span className="n">100%</span>
                <span className="l">Free &amp; open</span>
              </div>
              <div>
                <span className="n">MIT</span>
                <span className="l">Licensed</span>
              </div>
              <div>
                <span className="n">∞</span>
                <span className="l">Forever</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll y={20} delay={0.16}>
            <MagneticButton href="/community" className="btn-primary">
              Explore the Commons
            </MagneticButton>
          </RevealOnScroll>
        </div>

        <div className="community__art mesh-gradient mesh-gradient--animated mesh-gradient--indigo">
          <span className="bg-dot-grid bg-field-mask" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }} />
          <span className="glyph">結</span>
        </div>
      </div>
    </section>
  );
}
