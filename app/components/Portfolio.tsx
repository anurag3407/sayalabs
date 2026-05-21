import Image from "next/image";

const projects = [
  {
    image: "/images/portfolio_1.png",
    category: "Web Design & Development",
    name: "NEO TOKYO STUDIO",
    desc: "A complete digital presence for an avant-garde design studio",
  },
  {
    image: "/images/portfolio_2.png",
    category: "Mobile App Design",
    name: "ENSŌ COLLECTION",
    desc: "Premium mobile commerce experience with Japanese aesthetics",
  },
  {
    image: "/images/portfolio_3.png",
    category: "E-Commerce Platform",
    name: "WABI-SABI MARKET",
    desc: "High-end artisan marketplace with immersive product pages",
  },
  {
    image: "/images/portfolio_bg.png",
    category: "Brand Identity",
    name: "ZEN GARDENS",
    desc: "Complete visual identity for a luxury wellness brand",
  },
];

export default function Portfolio() {
  return (
    <section className="section" id="work">
      <div className="section-bg">
        <Image
          src="/images/portfolio_bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.08 }}
        />
        <div className="section-bg-overlay" />
      </div>

      <div className="section-kanji">作品</div>

      <div className="container">
        <div className="section-header">
          <div className="section-tag">Selected Work</div>
          <h2 className="section-title">OUR PORTFOLIO</h2>
          <p className="section-description">
            A curated selection of projects where precision meets creativity.
            Each piece represents our commitment to excellence.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <div key={i} className="portfolio-item">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="portfolio-overlay">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-name">{project.name}</h3>
                <p className="portfolio-desc-text">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
