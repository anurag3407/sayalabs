import Navbar from "./components/Navbar";
import HeroStory from "./components/HeroStory";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LenisProvider from "./components/LenisProvider";
import SamuraiScene from "./components/SamuraiScene";
import KatanaScene from "./components/KatanaScene";
import MarqueeStrip from "./components/MarqueeStrip";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import Forge from "./components/Forge";
import Manifesto from "./components/Manifesto";
import Blade from "./components/Blade";
import Path from "./components/Path";
import Engage from "./components/Engage";
import Community from "./components/Community";

export default function Home() {
  return (
    <LenisProvider>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <SamuraiScene />
      <KatanaScene />
      <Navbar />

      <HeroStory />

      <Forge />

      <MarqueeStrip variant="primary" speed={45} />

      <Manifesto />

      <Blade />

      <MarqueeStrip variant="kanji" speed={55} />

      <Services />

      <MarqueeStrip variant="services" speed={50} direction="right" />

      <Path />

      <About />

      <Engage />

      <MarqueeStrip variant="outline" speed={45} direction="right" />

      <Process />

      <Community />

      <Testimonials />

      <Contact />

      <Footer />
    </LenisProvider>
  );
}
