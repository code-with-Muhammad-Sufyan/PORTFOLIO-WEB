export type CategoryId = "model" | "product" | "lifestyle" | "static" | "video";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "model",
    label: "Model Images",
    blurb:
      "Studio-perfect model photography direction that gives fashion brands a face — posing, lighting and retouch built for conversion.",
  },
  {
    id: "product",
    label: "Product Images",
    blurb:
      "Hero shots, macros and explosive campaign visuals that make products impossible to scroll past.",
  },
  {
    id: "lifestyle",
    label: "Lifestyle Images",
    blurb:
      "Products staged in real moments — context-driven scenes that let customers picture ownership.",
  },
  {
    id: "static",
    label: "Static Ads",
    blurb:
      "Feed-ready Meta & Instagram creatives engineered around one job: stopping the thumb and driving the click.",
  },
  {
    id: "video",
    label: "Video Ads",
    blurb:
      "Short-form performance edits — hooks in the first second, brand in every frame, CTA that converts.",
  },
];

export interface PortfolioItem {
  id: string;
  category: CategoryId;
  kind: "image" | "video" | "ad";
  title: string;
  client: string;
  year: string;
  src?: string; // cover image (card par dikhti hai)
  gallery?: string[]; // click karne par khulne wali images (arrows se change hongi)
  poster?: string;
  ad?: "sale" | "drop" | "flash";
}

type Base = Omit<PortfolioItem, "id">;

/* =====================================================================
   NAMING RULE (images public/images/ mein rakho):

     <prefix>-<project number>-<image number>.jpg

   Misaal:  model-1-1.jpg, model-1-2.jpg ... model-1-5.jpg   (Model project 1)
            model-2-1.jpg ... model-2-5.jpg                  (Model project 2)

   Prefix:  model | product | life | static
   Project: 1 se 9
   Image:   1 se 5   (image 1 hi card ka cover banegi)

   Agar tumhari images .png ya .webp hain to neeche EXT badal do.
   ===================================================================== */

const EXT = "jpg";
const PER_PROJECT = 5;

/** Ek project ke liye cover (src) + 5 gallery paths automatically banata hai */
function shots(prefix: string, project: number) {
  const gallery = Array.from(
    { length: PER_PROJECT },
    (_, i) => `/images/${prefix}-${project}-${i + 1}.${EXT}`,
  );
  return { src: gallery[0], gallery };
}

/* ---------------- MODEL IMAGES (9 projects x 5 images) ---------------- */

const MODEL_BASE: Base[] = [
  { category: "model", kind: "image", title: "Model Project 1", client: "Male Model Wearing Compression", year: "2026", ...shots("model", 1) },
  { category: "model", kind: "image", title: "Model Project 2", client: "Client 2", year: "2026", ...shots("model", 2) },
  { category: "model", kind: "image", title: "Model Project 3", client: "Client 3", year: "2026", ...shots("model", 3) },
  { category: "model", kind: "image", title: "Model Project 4", client: "Client 4", year: "2025", ...shots("model", 4) },
  { category: "model", kind: "image", title: "Model Project 5", client: "Client 5", year: "2025", ...shots("model", 5) },
  { category: "model", kind: "image", title: "Model Project 6", client: "Client 6", year: "2025", ...shots("model", 6) },
  { category: "model", kind: "image", title: "Model Project 7", client: "Client 7", year: "2025", ...shots("model", 7) },
  { category: "model", kind: "image", title: "Model Project 8", client: "Client 8", year: "2025", ...shots("model", 8) },
  { category: "model", kind: "image", title: "Model Project 9", client: "Client 9", year: "2025", ...shots("model", 9) },
];

/* ---------------- PRODUCT IMAGES (9 projects x 5 images) ---------------- */

const PRODUCT_BASE: Base[] = [
  { category: "product", kind: "image", title: "Product Project 1", client: "Client 1", year: "2026", ...shots("product", 1) },
  { category: "product", kind: "image", title: "Product Project 2", client: "Client 2", year: "2026", ...shots("product", 2) },
  { category: "product", kind: "image", title: "Product Project 3", client: "Client 3", year: "2026", ...shots("product", 3) },
  { category: "product", kind: "image", title: "Product Project 4", client: "Client 4", year: "2025", ...shots("product", 4) },
  { category: "product", kind: "image", title: "Product Project 5", client: "Client 5", year: "2025", ...shots("product", 5) },
  { category: "product", kind: "image", title: "Product Project 6", client: "Client 6", year: "2025", ...shots("product", 6) },
  { category: "product", kind: "image", title: "Product Project 7", client: "Client 7", year: "2025", ...shots("product", 7) },
  { category: "product", kind: "image", title: "Product Project 8", client: "Client 8", year: "2025", ...shots("product", 8) },
  { category: "product", kind: "image", title: "Product Project 9", client: "Client 9", year: "2025", ...shots("product", 9) },
];

/* ---------------- LIFESTYLE IMAGES (9 projects x 5 images) ---------------- */

const LIFESTYLE_BASE: Base[] = [
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 1", client: "Client 1", year: "2026", ...shots("life", 1) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 2", client: "Client 2", year: "2026", ...shots("life", 2) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 3", client: "Client 3", year: "2026", ...shots("life", 3) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 4", client: "Client 4", year: "2025", ...shots("life", 4) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 5", client: "Client 5", year: "2025", ...shots("life", 5) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 6", client: "Client 6", year: "2025", ...shots("life", 6) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 7", client: "Client 7", year: "2025", ...shots("life", 7) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 8", client: "Client 8", year: "2025", ...shots("life", 8) },
  { category: "lifestyle", kind: "image", title: "Lifestyle Project 9", client: "Client 9", year: "2025", ...shots("life", 9) },
];

/* ---------------- STATIC ADS (9 projects x 5 images) ----------------
   ad: "sale" | "drop" | "flash"  -> ad ka design/style decide karta hai */

const STATIC_BASE: Base[] = [
  { category: "static", kind: "ad", ad: "sale",  title: "Static Ad 1", client: "Client 1", year: "2026", ...shots("static", 1) },
  { category: "static", kind: "ad", ad: "drop",  title: "Static Ad 2", client: "Client 2", year: "2026", ...shots("static", 2) },
  { category: "static", kind: "ad", ad: "flash", title: "Static Ad 3", client: "Client 3", year: "2026", ...shots("static", 3) },
  { category: "static", kind: "ad", ad: "sale",  title: "Static Ad 4", client: "Client 4", year: "2025", ...shots("static", 4) },
  { category: "static", kind: "ad", ad: "drop",  title: "Static Ad 5", client: "Client 5", year: "2025", ...shots("static", 5) },
  { category: "static", kind: "ad", ad: "flash", title: "Static Ad 6", client: "Client 6", year: "2025", ...shots("static", 6) },
  { category: "static", kind: "ad", ad: "sale",  title: "Static Ad 7", client: "Client 7", year: "2025", ...shots("static", 7) },
  { category: "static", kind: "ad", ad: "drop",  title: "Static Ad 8", client: "Client 8", year: "2025", ...shots("static", 8) },
  { category: "static", kind: "ad", ad: "flash", title: "Static Ad 9", client: "Client 9", year: "2025", ...shots("static", 9) },
];

/* ---------------- VIDEO ADS (10) — gallery nahi, pehle jaisa ----------------
   src    = video file (public/videos/ mein)
   poster = thumbnail jo play se pehle dikhta hai (public/images/ mein) */

const VIDEO_BASE: Base[] = [
  { category: "video", kind: "video", title: "Video Ad 1",  client: "Client 1",  year: "2026", src: "/videos/video-1.mp4",  poster: "/images/video-1.jpg" },
  { category: "video", kind: "video", title: "Video Ad 2",  client: "Client 2",  year: "2026", src: "/videos/video-2.mp4",  poster: "/images/video-2.jpg" },
  { category: "video", kind: "video", title: "Video Ad 3",  client: "Client 3",  year: "2026", src: "/videos/video-3.mp4",  poster: "/images/video-3.jpg" },
  { category: "video", kind: "video", title: "Video Ad 4",  client: "Client 4",  year: "2025", src: "/videos/video-4.mp4",  poster: "/images/video-4.jpg" },
  { category: "video", kind: "video", title: "Video Ad 5",  client: "Client 5",  year: "2025", src: "/videos/video-5.mp4",  poster: "/images/video-5.jpg" },
  { category: "video", kind: "video", title: "Video Ad 6",  client: "Client 6",  year: "2025", src: "/videos/video-6.mp4",  poster: "/images/video-6.jpg" },
  { category: "video", kind: "video", title: "Video Ad 7",  client: "Client 7",  year: "2025", src: "/videos/video-7.mp4",  poster: "/images/video-7.jpg" },
  { category: "video", kind: "video", title: "Video Ad 8",  client: "Client 8",  year: "2025", src: "/videos/video-8.mp4",  poster: "/images/video-8.jpg" },
  { category: "video", kind: "video", title: "Video Ad 9",  client: "Client 9",  year: "2025", src: "/videos/video-9.mp4",  poster: "/images/video-9.jpg" },
  { category: "video", kind: "video", title: "Video Ad 10", client: "Client 10", year: "2025", src: "/videos/video-10.mp4", poster: "/images/video-10.jpg" },
];

/* ---------------- Ids lagane wala helper ---------------- */

function withIds(base: Base[], prefix: string): PortfolioItem[] {
  return base.map((item, i) => ({ ...item, id: `${prefix}-${i}` }));
}

export const ITEMS: PortfolioItem[] = [
  ...withIds(MODEL_BASE, "model"),
  ...withIds(PRODUCT_BASE, "product"),
  ...withIds(LIFESTYLE_BASE, "lifestyle"),
  ...withIds(STATIC_BASE, "static"),
  ...withIds(VIDEO_BASE, "video"),
];
