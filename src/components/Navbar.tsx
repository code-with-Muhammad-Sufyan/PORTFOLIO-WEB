import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollToId } from "../lib/scroll";

const LINKS = [
  { id: "intro", label: "Intro" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.5 }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <button
            onClick={() => go("intro")}
            data-hover
            className="group flex items-baseline gap-2"
          >
            <span className="font-display text-2xl leading-none tracking-wide md:text-3xl">
              MS<span className="text-gold">.</span>
            </span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.35em] text-white/40 transition-colors group-hover:text-gold sm:block">
              Visual Designer
            </span>
          </button>

          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-hover
                className="group relative text-[11px] font-medium uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <button
                onClick={() => go("contact")}
                data-hover
                className="group flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                Let's Talk
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              data-hover
              aria-label="Open menu"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ---------- Fullscreen mobile menu ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[160] flex flex-col bg-black/97 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-2xl tracking-wide">
                MS<span className="text-gold">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <div key={l.id} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.15 + i * 0.08,
                    }}
                    onClick={() => go(l.id)}
                    className="group flex items-baseline gap-4 py-2 text-left"
                  >
                    <span className="text-xs font-medium text-gold">
                      0{i + 1}
                    </span>
                    <span className="font-display text-6xl uppercase leading-none transition-colors group-hover:text-gold">
                      {l.label}
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45 }}
              className="border-t border-white/10 px-6 py-6"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                Get in touch
              </p>
              <a
                href="mailto:hello@sufyanvisuals.com"
                className="mt-2 block text-lg text-gold"
              >
                hello@sufyanvisuals.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
