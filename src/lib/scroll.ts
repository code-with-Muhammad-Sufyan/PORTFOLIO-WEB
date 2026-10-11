import Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

const EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.5, easing: EASE });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.5, easing: EASE });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function lockScroll() {
  lenis?.stop();
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  lenis?.start();
  document.body.style.overflow = "";
}
