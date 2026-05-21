import Image from "next/image";

const services = [
  {
    number: "01",
    icon: "⛩",
    title: "WEB DESIGN",
    desc: "Crafting visually stunning, immersive interfaces that captivate users from the first pixel. Every detail is intentional, every interaction meaningful.",
    link: "#contact",
  },
  {
    number: "02",
    icon: "刀",
    title: "DEVELOPMENT",
    desc: "Engineering high-performance web applications with modern frameworks. Clean architecture, blazing speed, and bulletproof reliability.",
    link: "#contact",
  },
  {
    number: "03",
    icon: "紋",
    title: "BRANDING",
    desc: "Forging brand identities that resonate deeply. From logo systems to complete visual languages, we build brands that endure.",
    link: "#contact",
  },
  {
    number: "04",
    icon: "動",
    title: "MOTION DESIGN",
    desc: "Bringing interfaces to life with purposeful animation. Micro-interactions, scroll-driven narratives, and cinematic transitions.",
    link: "#contact",
  },
  {
    number: "05",
    icon: "策",
    title: "DIGITAL STRATEGY",
    desc: "Data-driven strategies that amplify your digital presence. SEO, content architecture, and conversion optimization that delivers results.",
    link: "#contact",
  },
  {
    number: "06",
    icon: "守",
    title: "UI/UX DESIGN",
    desc: "Human-centered design that balances beauty with usability. Research-backed interfaces that users love to navigate.",
    link: "#contact",
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      {/* Background */}
      <div className="section-bg">
        <Image
          src="/images/services_bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.12 }}
        />
        <div className="section-bg-overlay" />
      </div>

      {/* Decorative Kanji */}
      <div className="section-kanji">奉仕</div>

      <div className="container">
        <div className="section-header">
          <div className="section-tag">What We Do</div>
          <h2 className="section-title">OUR SERVICES</h2>
          <p className="section-description">
            Six disciplines. One philosophy. We approach every project with the
            precision of a master craftsman — no shortcuts, no compromises.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.number} className="service-card">
              <div className="service-number">{service.number}</div>
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <a href={service.link} className="service-link">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
