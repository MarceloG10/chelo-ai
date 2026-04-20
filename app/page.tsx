import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import CoordsParallax from "@/components/CoordsParallax";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <RevealInit />
      <CoordsParallax />
      <Navbar />
      <Hero />
      <MarqueeSection />
      <Services />
      <Projects />
      <Process />
      <CTASection />
      <Footer />
    </>
  );
}
