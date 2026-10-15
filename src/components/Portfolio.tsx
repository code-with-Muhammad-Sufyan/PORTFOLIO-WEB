import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Images,
  Play,
  X,
} from "lucide-react";
import {
  CATEGORIES,
  ITEMS,
  type CategoryId,
  type PortfolioItem,
} from "../data/portfolio";
import AdCreative from "./AdCreative";
import { lockScroll, unlockScroll } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
function Card({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: (item: PortfolioItem) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Info overlay (title/client) sirf image & video cards par; ad ka apna design hai
  const showInfo = item.kind !== "ad";
  const galleryCount = item.gallery?.length ?? 0;

  const play = () => videoRef.current?.play().catch(() => undefined);
  const stop = () => videoRef.current?.pause();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: EASE, delay: index * 0.05 },
      }}
      exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.28 } }}
      onClick={() => onOpen(item)}
      onMouseEnter={item.kind === "video" ? play : undefined}
      onMouseLeave={item.kind === "video" ? stop : undefined}
      data-hover
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-coal transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-[0_0_60px_rgba(245,197,24,0.12)] ${
        item.kind === "video" ? "aspect-[9/16]" : "aspect-[3/4]"
      }`}
    >
      {item.kind === "image" && (
        <motion.figure
          layoutId={`media-${item.id}`}
          className="absolute inset-0"
        >
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        </motion.figure>
      )}

      {item.kind === "video" && (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
            <Clapperboard className="size-3 text-gold" />
            Video ad
          </span>
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-black md:size-16">
              <Play className="ml-0.5 size-5 fill-current md:size-6" />
            </span>
          </div>
        </>
      )}

      {item.kind === "ad" && (
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
          <AdCreative item={item} />
        </div>
      )}

      {/* gallery badge (sirf jab 2+ images hon) */}
      {item.kind !== "video" && galleryCount > 1 && (
        <span className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
          <Images className="size-3 text-gold" />
          {galleryCount}
        </span>
      )}

      {showInfo && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg uppercase leading-tight md:text-xl">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
                {item.client} — {item.year}
              </p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-black/45 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </>
      )}
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox (gallery + arrows)                                        */
/* ------------------------------------------------------------------ */
function Lightbox({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  const isVideo = item.kind === "video";
  const shared = item.kind === "image"; // sirf image cards ka layoutId hota hai

  const gallery =
    item.gallery && item.gallery.length > 0
      ? item.gallery
      : item.src
        ? [item.src]
        : [];
  const total = gallery.length;
  const hasGallery = !isVideo && total > 1;

  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );

  // scroll lock + Esc
  useEffect(() => {
    lockScroll();
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", key);
    };
  }, [onClose]);

  // left / right arrow keys
  useEffect(() => {
    if (!hasGallery) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [hasGallery, next, prev]);

  // mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || !hasGallery) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const arrowBtn =
    "absolute top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-gold hover:bg-gold hover:text-black md:size-12";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[170] flex items-center justify-center p-4 md:p-10"
    >
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-xl"
        onClick={onClose}
      />
      <motion.figure
        {...(shared
          ? { layoutId: `media-${item.id}` }
          : {
              initial: { opacity: 0, scale: 0.92, y: 30 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.94 },
              transition: { duration: 0.5, ease: EASE },
            })}
        className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-coal shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
      >
        {isVideo ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[72vh] w-full bg-black"
          />
        ) : (
          <div
            className="relative h-[58vh] w-full bg-black md:h-[68vh]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={index}
                src={gallery[index]}
                alt={`${item.title} — ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                draggable={false}
                className="h-full w-full select-none object-contain"
              />
            </AnimatePresence>

            {hasGallery && (
              <>
                <span className="absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-white/85 backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
                <button
                  onClick={prev}
                  data-hover
                  aria-label="Previous image"
                  className={`${arrowBtn} left-3 md:left-4`}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={next}
                  data-hover
                  aria-label="Next image"
                  className={`${arrowBtn} right-3 md:right-4`}
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
        )}

        {/* thumbnails */}
        {hasGallery && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-white/10 p-3">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                data-hover
                aria-label={`Show image ${i + 1}`}
                className={`size-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all md:size-16 ${
                  i === index
                    ? "border-gold opacity-100"
                    : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
          <div>
            <h3 className="font-display text-lg uppercase leading-tight md:text-xl">
              {item.title}
            </h3>
            <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
              {item.client} — {item.year}
            </p>
          </div>
          <span className="rounded-full border border-gold/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
            {CATEGORIES.find((c) => c.id === item.category)?.label}
          </span>
        </figcaption>
      </motion.figure>
      <button
        onClick={onClose}
        data-hover
        aria-label="Close"
        className="absolute right-5 top-5 z-20 grid size-12 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:rotate-90 hover:border-gold hover:text-gold"
      >
        <X className="size-5" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function Portfolio() {
  const [tab, setTab] = useState<CategoryId>("photoshoot");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const items = ITEMS.filter((i) => i.category === tab);
  const catIndex = CATEGORIES.findIndex((c) => c.id === tab);
  const cat = CATEGORIES[catIndex];

  return (
    <section id="portfolio" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-1/3 size-[30rem] rounded-full bg-gold/5 blur-[140px]" />

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* ---------- section header ---------- */}
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-gold md:text-[11px]">
              The Work — 0{catIndex + 1}/03 disciplines
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.12 }}
            className="mt-6 font-display text-[clamp(2.9rem,8vw,7.5rem)] uppercase leading-[0.9]"
          >
            Creative{" "}
            <span className="text-outline">
              Portfolio
              <span className="text-gold [-webkit-text-stroke:0px]">.</span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
            className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-white/55 md:text-base"
          >
            A curated selection of conversion-focused visuals built for
            e-commerce brands — professional model, product and lifestyle
            photoshoots, plus static and video ads engineered to turn attention
            into revenue.
          </motion.p>
        </div>

        {/* ---------- tabs ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-14"
        >
          <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 md:w-fit md:rounded-full">
            {CATEGORIES.map((c) => {
              const isActive = c.id === tab;
              return (
                <button
                  key={c.id}
                  onClick={() => setTab(c.id)}
                  data-hover
                  className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 md:px-6 md:text-[11px] ${
                    isActive ? "text-black" : "text-white/55 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 36,
                      }}
                      className="absolute inset-0 rounded-full bg-gold"
                    />
                  )}
                  <span className="relative z-10">{c.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/50"
            >
              <span className="mr-3 font-display text-gold">
                0{catIndex + 1}
              </span>
              {cat.blurb}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* ---------- gallery ---------- */}
        <motion.div
          layout
          className={
            tab === "video"
              ? "mt-10 grid w-full grid-cols-2 gap-4 md:mx-auto md:max-w-4xl md:gap-6"
              : "mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5"
          }
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <Card key={item.id} item={item} index={i} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------- lightbox ---------- */}
      <AnimatePresence>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
