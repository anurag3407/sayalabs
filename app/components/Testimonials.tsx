import Image from "next/image";

const testimonials = [
  {
    text: "Saya Labs didn't just build us a website — they forged a digital identity that perfectly captures our brand's soul. The attention to detail is extraordinary.",
    name: "Akira Tanaka",
    role: "CEO, NeoForge Studios",
    initials: "AT",
  },
  {
    text: "Working with their team felt like having a secret weapon. Every deliverable exceeded our expectations. The animations alone doubled our user engagement.",
    name: "Sarah Chen",
    role: "Head of Digital, Apex Ventures",
    initials: "SC",
  },
  {
    text: "They approached our rebrand with the discipline of a master artisan. The result? A visual identity that commands respect in every room it enters.",
    name: "Marcus Wolf",
    role: "Founder, Iron & Oak",
    initials: "MW",
  },
  {
    text: "Our conversion rate jumped 340% after launch. Saya Labs understands that great design isn't just about aesthetics — it's about results that move the needle.",
    name: "Priya Sharma",
    role: "CMO, Celestial Commerce",
    initials: "PS",
  },
];

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="section-bg">
        <Image
          src="/images/testimonials_bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.08 }}
        />
        <div className="section-bg-overlay" />
      </div>

      <div className="section-kanji">信頼</div>

      <div className="container">
        <div className="section-header">
          <div className="section-tag">Client Voices</div>
          <h2 className="section-title">TESTIMONIALS</h2>
          <p className="section-description">
            Words from those who&apos;ve walked the path with us. Their success
            is the truest measure of our craft.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-quote-mark">&ldquo;</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
