import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollToId } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const D = 2.15; // base delay — waits for preloader

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.4,
      ease: EASE,
      delay: 0.3,
      onUpdate: (v) => setN(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref}>
      <p className="font-display text-4xl leading-none md:text-5xl">
        {n}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="intro"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28 md:pb-0 md:pt-24"
    >
      {/* ambient background */}
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      <div className="pointer-events-none absolute -right-40 top-1/4 size-[34rem] rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-52 bottom-0 size-[26rem] rounded-full bg-gold/5 blur-[120px]" />
      <p className="text-outline-faint pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display text-[18vw] leading-none">
        ARTIST
      </p>

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        {/* ---------------- LEFT — intro ---------------- */}
        <motion.div
          style={{ y: yText, opacity: fade }}
          className="lg:col-span-7"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: D }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gold" />
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-gold md:text-[11px]">
                E-Commerce Visual Designer
              </p>
            </motion.div>
          </div>

          <h1 className="mt-6 font-display uppercase leading-[0.9]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: D + 0.1 }}
                className="block text-[clamp(3.4rem,10.5vw,9.5rem)]"
              >
                Muhammad
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: D + 0.22 }}
                className="text-outline block text-[clamp(3.4rem,10.5vw,9.5rem)] transition-colors duration-500 hover:text-gold"
              >
                Sufyan<span className="text-gold [-webkit-text-stroke:0px]">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: D + 0.4 }}
            className="mt-6 max-w-xl text-sm font-light leading-relaxed text-white/60 md:text-base"
          >
            I craft scroll-stopping visuals for e-commerce brands from model,
            product and lifestyle imagery to high-converting static &amp; video
            ads. Every pixel engineered to make shoppers stop, feel and buy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: D + 0.52 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => scrollToId("portfolio")}
                data-hover
                className="group flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_0_50px_rgba(245,197,24,0.3)] transition-shadow duration-500 hover:shadow-[0_0_80px_rgba(245,197,24,0.5)]"
              >
                View Portfolio
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: D + 0.66 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            <Stat value={250} suffix="+" label="Projects Delivered" />
            <Stat value={90} suffix="+" label="Brands Elevated" />
            <Stat value={6} suffix="+" label="Years Crafting" />
          </motion.div>
        </motion.div>

        {/* ---------------- RIGHT — portrait ---------------- */}
        <motion.div
          style={{ y: yImg }}
          className="relative lg:col-span-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: D + 0.35 }}
            className="group relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* offset gold frame */}
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[28px] border border-gold/50 transition-transform duration-700 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
            <div className="card-sheen relative overflow-hidden rounded-[28px] border border-white/10">
              <img
                src="/images/portrait.jpg"
                alt="Muhammad Sufyan — E-commerce visual designer"
                className="aspect-[4/5] w-full object-cover [filter:grayscale(0.35)_contrast(1.06)] transition-all duration-700 group-hover:scale-[1.03] group-hover:[filter:grayscale(0)_contrast(1.02)]"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />
              {/* status chip */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-gold" />
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/90">
                  Open for projects
                </span>
              </div>
            </div>

            {/* rotating badge */}
            <div className="absolute -bottom-9 -left-6 flex size-28 items-center justify-center rounded-full border border-white/10 bg-black/85 backdrop-blur-md md:-left-12 md:size-36">
              <svg
                viewBox="0 0 100 100"
                className="animate-spin-slow absolute inset-0 size-full"
              >
                <defs>
                  <path
                    id="badge-circle"
                    d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                  />
                </defs>
                <text
                  textAnchor="middle"
                  className="fill-white/80 font-body text-[8px] font-medium uppercase [letter-spacing:3.5px]"
                >
                  <textPath href="#badge-circle" startOffset="50%">
                    Available for projects
                  </textPath>
                </text>
              </svg>
              <Sparkles className="size-5 text-gold md:size-6" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      
    </section>
  );
}
