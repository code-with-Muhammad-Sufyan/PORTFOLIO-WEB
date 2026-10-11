import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
    >
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[clamp(4rem,14vw,8rem)] leading-none tracking-wide"
        >
          MS<span className="text-gold">.</span>
        </motion.p>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
        className="mt-6 h-px w-44 origin-left bg-gold"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-5 text-[10px] font-medium uppercase tracking-[0.5em] text-white/50"
      >
        Portfolio — 2026
      </motion.p>
    </motion.div>
  );
}
