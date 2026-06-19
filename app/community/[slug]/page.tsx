import { notFound } from "next/navigation";
import { repos } from "../data";
import LenisProvider from "../../components/LenisProvider";
import CustomCursor from "../../components/CustomCursor";
import ScrollProgress from "../../components/ScrollProgress";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SplitText from "../../components/SplitText";
import RevealOnScroll from "../../components/RevealOnScroll";
import MagneticButton from "../../components/MagneticButton";
import CopyableCode from "../../components/CopyableCode";

export function generateStaticParams() {
  return repos.map((r) => ({ slug: r.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const repo = repos.find((r) => r.slug === resolvedParams.slug);

  if (!repo) {
    notFound();
  }

  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      <main className="project-detail-page">
        {/* HERO SECTION */}
        <section className={`project-hero mesh-gradient mesh-gradient--animated ${repo.mesh}`}>
          <span 
            className="bg-dot-grid bg-field-mask" 
            style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }} 
          />
          <div className="project-hero__inner" style={{ position: "relative", zIndex: 2, padding: "var(--section-padding) var(--container-padding)", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
             <span className="project-hero__kanji" style={{ fontFamily: "var(--font-japanese)", fontSize: "6rem", color: "rgba(255, 255, 255, 0.9)", textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>{repo.kanji}</span>
             <SplitText as="h1" className="project-hero__title" split="words" stagger={0.05} duration={1} triggerOnScroll={false} delay={0.1}>
               {repo.name}
             </SplitText>
             <p className="project-hero__tagline" style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--gold)", fontStyle: "italic", marginTop: "1rem" }}>{repo.tagline}</p>
          </div>
        </section>
        
        {/* CONTENT SECTION */}
        <section className="project-content" style={{ padding: "var(--section-padding) var(--container-padding)", maxWidth: "1200px", margin: "0 auto" }}>
           <div className="project-content__inner" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "60px", alignItems: "start" }}>
             {/* Left Column: Description & Tags */}
             <div className="project-content__main">
               <RevealOnScroll y={20}>
                 <h2 className="section-title" style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--ivory)", marginBottom: "24px" }}>About the project</h2>
                 <div className="project-docs" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                   {repo.content.map((block, idx) => {
                     if (block.type === "heading") {
                       return <h3 key={idx} style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--ivory)", marginTop: "24px", marginBottom: "8px" }}>{block.value}</h3>;
                     }
                     if (block.type === "code") {
                       return <CopyableCode key={idx} code={block.value} />;
                     }
                     return <p key={idx} className="project-desc" style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}>{block.value}</p>;
                   })}
                 </div>
                 <div className="repo-card__tags" style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {repo.tags.map((t) => (
                      <span key={t} className="repo-tag" style={{ border: "1px solid var(--border-subtle)", padding: "6px 14px", borderRadius: "4px", fontSize: "0.8rem", color: "var(--ivory-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>{t}</span>
                    ))}
                 </div>
               </RevealOnScroll>
             </div>
             
             {/* Right Column: Installation & Links */}
             <div className="project-content__sidebar" style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: "40px" }}>
               <RevealOnScroll y={20} delay={0.1}>
                 <h3 className="sidebar-title" style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>Installation</h3>
                 <div className="install-blocks" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                   {repo.installation.map((cmd, i) => (
                     <CopyableCode key={i} code={cmd} />
                   ))}
                 </div>
               </RevealOnScroll>
               
               <RevealOnScroll y={20} delay={0.2}>
                 <h3 className="sidebar-title" style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px", marginTop: "40px" }}>Links</h3>
                 <div className="project-links" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                   {repo.links.map((link, i) => (
                     <a 
                       key={i} 
                       href={link.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="sidebar-link-card"
                       style={{ 
                         display: "flex", 
                         alignItems: "center", 
                         gap: "12px", 
                         padding: "16px", 
                         background: "rgba(255,255,255,0.03)", 
                         border: "1px solid var(--border-subtle)", 
                         borderRadius: "8px",
                         textDecoration: "none",
                         color: "var(--ivory)",
                         fontFamily: "var(--font-mono)",
                         fontSize: "0.9rem",
                         transition: "all 0.2s ease"
                       }}
                     >
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                       </svg>
                       {link.label}
                       <svg style={{ marginLeft: "auto", opacity: 0.5 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                         <polyline points="15 3 21 3 21 9"></polyline>
                         <line x1="10" y1="14" x2="21" y2="3"></line>
                       </svg>
                     </a>
                   ))}
                 </div>
               </RevealOnScroll>
             </div>
           </div>
        </section>
      </main>

      <Footer />
    </LenisProvider>
  );
}
