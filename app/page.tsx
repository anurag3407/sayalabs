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
import MarqueeStrip from "./components/MarqueeStrip";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";

export default function Home() {
  return (
    <LenisProvider>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <SamuraiScene />
      <Navbar />
      <Hero />
      <AboutSaya />

      <MarqueeStrip variant="primary" speed={45} />

      <Services />

      <MarqueeStrip variant="services" speed={50} direction="right" />

      <About />

      <MarqueeStrip variant="kanji" speed={55} />

      <Portfolio />

      <MarqueeStrip variant="outline" speed={45} direction="right" />

      <Process />

      <Testimonials />

      <Contact />

      <Footer />
    </LenisProvider>
  );
}
