import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AboutSaya from "./components/AboutSaya";
import LenisProvider from "./components/LenisProvider";
import SamuraiScene from "./components/SamuraiScene";

export default function Home() {
  return (
    <LenisProvider>
      <SamuraiScene />
      <Navbar />
      <Hero />
      <AboutSaya />

      <div className="section-divider" />
      <Services />

      <div className="section-divider" />
      <About />

      <div className="section-divider" />
      <Portfolio />

      <div className="section-divider" />
      <Process />

      <div className="section-divider" />
      <Testimonials />

      <div className="section-divider" />
      <Contact />

      <Footer />
    </LenisProvider>
  );
}
