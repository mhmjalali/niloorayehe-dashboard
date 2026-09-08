"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const Auth = () => {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[#020c0a]">
      <Image
        src="/images/bg-dashboard.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <motion.div
        className="relative z-10 flex flex-1 flex-col"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Header />
        </motion.div>
        <motion.div variants={item} className="flex flex-1 flex-col">
          <Main />
        </motion.div>
        <motion.div variants={item}>
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
