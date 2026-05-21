import Image from "next/image";

export default function About() {
  return (
    <section className="section" id="about">
      {/* Background */}
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
          {/* Image Side */}
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

          {/* Text Side */}
          <div className="about-text">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <div className="section-tag">Who We Are</div>
              <h2 className="section-title">BORN FROM<br />OBSESSION</h2>
            </div>

            <p>
              Saya Labs was founded on a singular belief: digital experiences
              should be forged with the same discipline and artistry as a
              master blade-smith shaping steel. We don&apos;t do templates. We
              don&apos;t do &quot;good enough.&quot;
            </p>

            <p>
              Every project begins with deep understanding — of your brand, your
              audience, your ambitions. From there, we craft bespoke digital
              experiences that don&apos;t just meet expectations — they shatter them.
              Our team brings together world-class designers, engineers, and
              strategists united by an uncompromising pursuit of excellence.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5Y</div>
                <div className="stat-label">Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
