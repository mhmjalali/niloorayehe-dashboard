"use client";

import { TrendingUp } from "lucide-react";
import { motion, type Variants } from "motion/react";

const bars = [38, 62, 48, 78, 58, 92, 68];
const ACTIVE_BAR = 5;

const tasks = ["سفارش جدید", "کاربر جدید", "پیام جدید"];
const avatarColors = ["bg-primary", "bg-secondary", "bg-accent", "bg-muted"];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const DashboardPreviewCard = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 flex w-full max-w-xs flex-col gap-3"
    >
      <motion.div
        variants={item}
        className="absolute -top-5 -inset-s-5 z-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl"
      >
        <span className="h-2 w-2 rounded-full bg-success" />
        <div className="flex flex-col">
          <span className="text-[10px] text-muted">کاربران آنلاین</span>
          <span className="text-sm font-bold text-text">•••</span>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 shadow-xl"
      >
        <span className="h-2 w-2 rounded-full bg-error/50" />
        <span className="h-2 w-2 rounded-full bg-warning/50" />
        <span className="h-2 w-2 rounded-full bg-success/50" />
        <div className="ms-2 h-2 flex-1 rounded-full bg-text/10" />
      </motion.div>

      <motion.div variants={item} className="rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">روند فروش</span>
          <TrendingUp size={14} className="text-success" />
        </div>
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full ${i === ACTIVE_BAR ? "bg-primary" : "bg-primary/15"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-2xl"
      >
        <span className="text-xs font-medium text-muted">اعضای تیم</span>
        <div className="flex -space-x-2 space-x-reverse">
          {avatarColors.map((color, i) => (
            <span
              key={i}
              className={`h-7 w-7 rounded-full border-2 border-white ${color}`}
            />
          ))}
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-text/10 text-xs font-bold text-text">
            +
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="w-[85%] self-end rounded-2xl bg-white p-4 shadow-2xl"
      >
        <span className="text-xs font-medium text-muted">کارتابل</span>
        <div className="mt-2.5 flex flex-col gap-2">
          {tasks.map((label) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-xs text-text">{label}</span>
              </div>
              <span className="text-xs text-muted">•••</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreviewCard;
