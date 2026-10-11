import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import { setLenis } from "./lib/scroll";

export default function App() {
  const [loading, setLoading] = useState(true);

  // buttery smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // preloader
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink font-body text-white">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <Cursor />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
