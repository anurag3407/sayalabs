import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background Image */}
      <div className="hero-bg">
        <Image
          src="/images/hero2.svg"
          alt="Japanese shrine at night with cherry blossoms"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Overlays */}
      <div className="hero-overlay" />
      <div className="hero-grid-overlay" />

      {/* Side decorative text */}
      <span className="hero-side-text left">武士道精神</span>
      <span className="hero-side-text right">創造と革新</span>

      {/* Main Content */}
      <div className="hero-content">
        <div className="hero-tag">Digital Craft Studio</div>

        <h1 className="hero-title">
          SAYA<br />
          <span className="accent">LABS</span>
        </h1>

        <p className="hero-subtitle">
          We forge extraordinary digital experiences — blending timeless design
          philosophy with cutting-edge technology to build brands that command
          attention and inspire action.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Start Your Journey
          </a>
          <a href="#work" className="btn-secondary">
            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
