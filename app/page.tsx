import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import Services from "@/components/Services";
import Builder from "@/components/Builder";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import CoordsParallax from "@/components/CoordsParallax";

export default function Home() {
  return (
    <>
      <RevealInit />
      <CoordsParallax />
      <Navbar />
      <Hero />
      <MarqueeSection />
      <Services />
      <Builder />
      <Projects />
      <Process />
      <CTASection />
      <Footer />
    </>
  );
}
