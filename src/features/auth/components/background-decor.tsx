"use client";

import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const BackgroundDecor = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        variants={fadeIn}
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        variants={fadeIn}
        className="absolute -right-16 -bottom-28 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
      />
      <motion.div
        variants={fadeScale}
        className="absolute -end-10 top-16 h-48 w-48 rounded-full border border-dashed border-primary/15"
      />
      <motion.div
        variants={fadeScale}
        className="absolute -start-12 bottom-20 h-28 w-28 rotate-12 rounded-3xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md"
      />
      <motion.div
        variants={fadeScale}
        className="absolute end-16 bottom-40 h-20 w-20 -rotate-6 rounded-2xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md"
      />
    </motion.div>
  );
};

export default BackgroundDecor;
