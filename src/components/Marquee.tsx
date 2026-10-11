import { Asterisk } from "lucide-react";

const PHRASES = [
  "Model Images",
  "Product Photography",
  "Lifestyle Shoots",
  "Static Ads",
  "Video Ads",
  "Brand Visuals",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {PHRASES.map((p) => (
        <span key={p} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl uppercase tracking-wide md:px-10 md:text-4xl">
            {p}
          </span>
          <Asterisk className="size-6 shrink-0 md:size-8" strokeWidth={2.5} />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-hidden className="relative z-10 -my-4 overflow-hidden py-14 md:py-16">
      {/* back ghost strip */}
      <div className="absolute inset-x-[-2rem] top-1/2 -translate-y-1/2 rotate-[1.6deg] border-y border-white/10 bg-coal py-3 opacity-60">
        <div className="marquee-track reverse">
          <Row />
          <Row />
        </div>
      </div>
      {/* main gold strip */}
      <div className="marquee-paused relative -mx-8 -rotate-[1.2deg] bg-gold py-3 text-black shadow-[0_0_80px_rgba(245,197,24,0.25)] md:py-4">
        <div className="marquee-track">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
