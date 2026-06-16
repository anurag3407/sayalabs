"use client";

import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container" style={{ textAlign: "center" }}>
        <RevealOnScroll>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Saya Labs · Est 2026</div>
        </RevealOnScroll>
      </div>

      <h2 className="footer-wordmark">
        <SplitText as="span" split="chars" stagger={0.04} duration={1.4}>
          SAYA
        </SplitText>
        <br />
        <span className="stroke">
          <SplitText as="span" split="chars" stagger={0.04} duration={1.4}>
            LABS
          </SplitText>
        </span>
      </h2>

      <div style={{ borderTop: "1px solid var(--border-subtle)", padding: "40px 0", margin: "60px 0 0" }}>
        <Marquee
          speed={50}
          items={[
            <span key="m1" className="marquee-text">FORGED IN TOKYO</span>,
            <span key="s1" className="marquee-sep" />,
            <span key="m2" className="marquee-text marquee-text--outline">CRAFTED FOR THE WORLD</span>,
            <span key="s2" className="marquee-sep" />,
            <span key="m3" className="marquee-kanji">鍛造</span>,
            <span key="s3" className="marquee-sep" />,
            <span key="m4" className="marquee-text marquee-text--accent">SAYA LABS</span>,
            <span key="s4" className="marquee-sep" />,
            <span key="m5" className="marquee-kanji">創造</span>,
            <span key="s5" className="marquee-sep" />,
          ]}
        />
      </div>

      <div className="footer-row" style={{ marginTop: 80 }}>
        <div className="footer-col">
          <h4>Studio</h4>
          <ul>
            <li><a href="#home" data-cursor="link">Home</a></li>
            <li><a href="#services" data-cursor="link">Services</a></li>
            <li><a href="#about" data-cursor="link">About</a></li>
            <li><a href="#work" data-cursor="link">Work</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="mailto:hello@sayalabs.com" data-cursor="link">hello@sayalabs.com</a></li>
            <li><a href="tel:+1234567890" data-cursor="link">+1 234 567 890</a></li>
            <li><a href="#contact" data-cursor="link">Start a Project</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Social</h4>
          <ul>
            <li><a href="#" data-cursor="link">Twitter / X</a></li>
            <li><a href="#" data-cursor="link">Dribbble</a></li>
            <li><a href="#" data-cursor="link">LinkedIn</a></li>
            <li><a href="#" data-cursor="link">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Saya Labs · All rights reserved</span>
        <span>Designed &amp; built in Tokyo / Worldwide</span>
      </div>
    </footer>
  );
}
