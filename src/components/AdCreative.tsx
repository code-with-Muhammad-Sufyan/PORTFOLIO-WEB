import { ArrowUpRight, BadgePercent, Megaphone, Timer } from "lucide-react";
import type { PortfolioItem } from "../data/portfolio";

/**
 * Static ad creatives composed in pure code — exactly the kind of
 * feed-ready deliverables produced for e-commerce clients.
 */
export default function AdCreative({ item }: { item: PortfolioItem }) {
  if (item.ad === "sale") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-black">
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="absolute inset-y-0 right-0 h-full w-[82%] object-cover opacity-90 [mask-image:linear-gradient(to_left,black_55%,transparent)]"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/70">
            Noir·26
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-black">
            <BadgePercent className="size-3" />
            Shop now
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-4">
          <p className="text-[8px] font-medium uppercase tracking-[0.35em] text-gold">
            Limited time
          </p>
          <h4 className="mt-1 font-display text-3xl uppercase leading-[0.92] md:text-4xl">
            Mega
            <br />
            Sale
          </h4>
          <p className="text-outline-gold font-display text-4xl uppercase leading-none md:text-5xl">
            50% Off
          </p>
          <p className="mt-2.5 inline-block border border-white/25 px-2.5 py-1 text-[8px] font-medium tracking-[0.25em] text-white/75">
            CODE: GOLD50
          </p>
        </div>
      </div>
    );
  }

  if (item.ad === "drop") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-black">
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/50" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/80">
            AW/26 Streetwear
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/80">
            <Megaphone className="size-3 text-gold" />
            Ad
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.35em] text-gold">
              Just landed
            </p>
            <h4 className="font-display text-4xl uppercase leading-[0.92] md:text-5xl">
              New
              <br />
              Drop
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/50">
                From
              </p>
              <p className="font-display text-xl text-gold">$129</p>
            </div>
            <span className="grid size-10 place-items-center rounded-full bg-gold text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // flash sale
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <img
        src="/images/ad-bg.jpg"
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-black">
          <Timer className="size-3" />
          24h only
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/80">
          Meridian
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h4 className="font-display text-[2.6rem] uppercase leading-[0.9] md:text-5xl">
          Flash
          <br />
          Sale
        </h4>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-sm text-white/45 line-through">$450</span>
          <span className="font-display text-2xl text-gold">$299</span>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 border-t border-gold/50 pt-2.5 text-center">
        <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/80">
          Ends midnight — free shipping
        </p>
      </div>
    </div>
  );
}
