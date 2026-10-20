export type CategoryId = "photoshoot" | "static" | "video";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "photoshoot",
    label: "Photoshoot",
    blurb:
      "Model, product and lifestyle photography — clean, professional visuals that help customers understand the product and picture themselves owning it.",
  },
  {
    id: "static",
    label: "Static Ads",
    blurb:
      "Feed-ready Meta and Instagram creatives designed to stop the scroll, communicate the offer and encourage clicks.",
  },
  {
    id: "video",
    label: "Video Ads",
    blurb:
      "Short-form product and brand videos with strong hooks, clear visuals and a focused call to action.",
  },
];

export interface PortfolioItem {
  id: string;
  category: CategoryId;
  kind: "image" | "video" | "ad";
  title: string;
  client: string;
  year: string;
  src?: string;
  gallery?: string[];
  poster?: string;
  ad?: "sale" | "drop" | "flash";
}

type Base = Omit<PortfolioItem, "id">;

/**
 * FILE NAMING
 *
 * Photoshoot images: public/images/photoshoot-<card>-<image>.jpg
 * Static ad images:  public/images/ads-<card>-<image>.jpg
 * Video files:       public/videos/video-<card>-<video>.mp4
 * Video thumbnails:  public/images/video-<card>-<video>.jpg (optional)
 *
 * Examples:
 * photoshoot-1-1.jpg, photoshoot-1-2.jpg, photoshoot-1-3.jpg
 * ads-1-1.jpg, ads-1-2.jpg
 * video-1-1.mp4 with optional video-1-1.jpg thumbnail
 *
 * Each card can have its own image count. Set the third argument in
 * shots() to 3, 5, 10, etc. The first image is the card cover.
 */

const EXT = "jpg";
const DEFAULT_IMAGE_COUNT = 5;

function shots(prefix: string, project: number, imageCount = DEFAULT_IMAGE_COUNT) {
  const gallery = Array.from(
    { length: imageCount },
    (_, i) => `/images/${prefix}-${project}-${i + 1}.${EXT}`,
  );
  return { src: gallery[0], gallery };
}

/* PHOTOSHOOT: model + product + lifestyle images share one category.
   Change the count per card: shots("photoshoot", 2, 10) gives 10 images. */

const PHOTOSHOOT_BASE: Base[] = [
  {
    category: "photoshoot",
    kind: "image",
    title: "MODEL IMAGES",
    client: "Male Model Wearing Compression",
    year: "2026",
    ...shots("photoshoot", 1, 5),
  },
  {
    category: "photoshoot",
    kind: "image",
    title: "PRODUCT IMAGES",
    client: "Male Compression",
    year: "2026",
    ...shots("photoshoot", 2, 5),
  },
  {
    category: "photoshoot",
    kind: "image",
    title: "LIFESTYLE IMAGES",
    client: "Male Compression",
    year: "2026",
    ...shots("photoshoot", 3, 5),
  },
  {
    category: "photoshoot",
    kind: "image",
    title: "MODEL IMAGES",
    client: "Kids Pattern T-Shirt",
    year: "2026",
    ...shots("photoshoot", 4, 5),
  },
  {
    category: "photoshoot",
    kind: "image",
    title: "PRODUCT IMAGES",
    client: "Kids Pattern T-Shirt",
    year: "2026",
    ...shots("photoshoot", 5, 9),
  },
  {
    category: "photoshoot",
    kind: "image",
    title: "LIFESTYLE IMAGES",
    client: "Kids Pattern T-Shirt",
    year: "2026",
    ...shots("photoshoot", 6, 5),
  },
  {
    category: "photoshoot",
    kind: "image",
    title: "MODEL IMAGES",
    client: "Male Polo Shirt",
    year: "2026",
    ...shots("photoshoot", 7, 6),
  },
  {
    category: "photoshoot",
    kind: "image",
    title: "PRODUCT IMAGES",
    client: "Male Polo Shirt",
    year: "2026",
    ...shots("photoshoot", 8, 10),
  },
  // Example cards:
  // { category: "photoshoot", kind: "image", title: "Photoshoot Project 2", client: "Client 2", year: "2026", ...shots("photoshoot", 2, 3) },
  // { category: "photoshoot", kind: "image", title: "Photoshoot Project 3", client: "Client 3", year: "2026", ...shots("photoshoot", 3, 10) },
];

/* STATIC ADS: each card can have a different number of images. */

const STATIC_BASE: Base[] = [
  { category: "static", kind: "image", title: "AD-1", client: "Male Model Wearing Compression", year: "2026", ...shots("ads", 1, 3) },
  // { category: "static", kind: "image", title: "Static Ad Project 2", client: "Client 2", year: "2026", ...shots("ads", 2, 3) },
];

/* VIDEO ADS: one video per card by default.
   For card 1, use /videos/video-1-1.mp4 and optional /images/video-1-1.jpg. */

const VIDEO_BASE: Base[] = [
  {
    category: "video",
    kind: "video",
    title: "Video Ad 1",
    client: "Male Model Wearing Compression",
    year: "2026",
    src: "/videos/video-1.mp4",
    poster: "/images/video-1.jpg",
  },
  {
    category: "video",
    kind: "video",
    title: "Video Ad 2",
    client: "Male Model Wearing Polo",
    year: "2026",
    src: "/videos/video-2.mp4",
    poster: "/images/video-2.jpg",
  },
  // { category: "video", kind: "video", title: "Video Ad 2", client: "Client 2", year: "2026", src: "/videos/video-2-1.mp4", poster: "/images/video-2-1.jpg" },
];

function withIds(base: Base[], prefix: string): PortfolioItem[] {
  return base.map((item, i) => ({ ...item, id: `${prefix}-${i}` }));
}

export const ITEMS: PortfolioItem[] = [
  ...withIds(PHOTOSHOOT_BASE, "photoshoot"),
  ...withIds(STATIC_BASE, "static"),
  ...withIds(VIDEO_BASE, "video"),
];
