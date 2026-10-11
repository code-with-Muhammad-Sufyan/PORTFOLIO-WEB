import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollToTop } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type IconProps = { className?: string };

function BrandIcon({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const InstagramIcon = ({ className }: IconProps) => (
  <BrandIcon className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </BrandIcon>
);

const FacebookIcon = ({ className }: IconProps) => (
  <BrandIcon className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </BrandIcon>
);

const LinkedinIcon = ({ className }: IconProps) => (
  <BrandIcon className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </BrandIcon>
);

const DribbbleIcon = ({ className }: IconProps) => (
  <BrandIcon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </BrandIcon>
);

const SOCIALS = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: LinkedinIcon, label: "LinkedIn" },
  { icon: DribbbleIcon, label: "Dribbble" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10 pt-24 md:pt-32"
    >
      <div className="pointer-events-none absolute right-[-10rem] top-[-6rem] size-[28rem] rounded-full bg-gold/10 blur-[140px]" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_top,black_20%,transparent)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "120%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-gold md:text-[11px]">
              Contact — Let's build your next campaign
            </p>
          </motion.div>
        </div>

        <h2 className="mt-6 font-display uppercase leading-[0.9]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "112%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.08 }}
              className="block text-[clamp(3rem,9.5vw,9rem)]"
            >
              Let's Work
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              initial={{ y: "112%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.18 }}
              className="text-outline block text-[clamp(3rem,9.5vw,9rem)] transition-colors duration-500 hover:text-gold"
            >
              Together
              <span className="text-gold [-webkit-text-stroke:0px]">.</span>
            </motion.span>
          </span>
        </h2>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="max-w-md text-sm font-light leading-relaxed text-white/55"
          >
            Have a product that deserves visuals that sell? Tell me about your
            brand — I reply within 24 hours with ideas, timelines and a quote.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="mailto:hello@sufyanvisuals.com"
                data-hover
                className="group flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_0_50px_rgba(245,197,24,0.3)] transition-shadow duration-500 hover:shadow-[0_0_90px_rgba(245,197,24,0.5)]"
              >
                <Mail className="size-4" />
                hello@sufyanvisuals.com
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="mailto:hello@sufyanvisuals.com?subject=Project%20Inquiry"
                data-hover
                className="group flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Start a Project
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-14 flex items-center gap-3"
        >
          {SOCIALS.map(({ icon: Icon, label }) => (
            <Magnetic key={label} strength={0.45}>
              <a
                href="#contact"
                aria-label={label}
                data-hover
                className="grid size-12 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
              >
                <Icon className="size-4.5" />
              </a>
            </Magnetic>
          ))}
          <span className="ml-3 hidden text-[10px] font-medium uppercase tracking-[0.3em] text-white/35 sm:block">
            Follow the craft
          </span>
        </motion.div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
            © 2026 Muhammad Sufyan — All rights reserved
          </p>
          <p className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 md:block">
            Designed &amp; built with obsession
          </p>
          <button
            onClick={scrollToTop}
            data-hover
            aria-label="Back to top"
            className="group flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-gold"
          >
            Back to top
            <span className="grid size-10 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold">
              <ArrowUp className="size-4" />
            </span>
          </button>
        </div>
      </div>

      {/* giant watermark */}
      <div
        aria-hidden
        className="pointer-events-none relative select-none overflow-hidden"
      >
        <motion.p
          initial={{ y: "35%", opacity: 0 }}
          whileInView={{ y: "18%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="text-outline-faint whitespace-nowrap text-center font-display text-[12.5vw] leading-[0.8]"
        >
          MUHAMMAD SUFYAN
        </motion.p>
      </div>
    </footer>
  );
}
