"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const MotionLink = motion.create(Link);

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: -4 },
};

const arrowTransition = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const };

const HeroCtas = ({
  websiteLabel,
  panelLabel,
}: {
  websiteLabel: string;
  panelLabel: string;
}) => {
  return (
    <div className="flex items-center gap-3.5">
      <MotionLink
        href="/dashboard"
        initial="rest"
        whileHover="hover"
        className="flex items-center gap-2.5 rounded-full border-2 border-accent bg-accent px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:brightness-110"
      >
        {panelLabel}
        <motion.span variants={arrowVariants} transition={arrowTransition}>
          <ArrowLeft size={16} className="ltr:rotate-180" aria-hidden="true" />
        </motion.span>
      </MotionLink>

      <motion.a
        href="https://niloorayehe.com"
        target="_blank"
        rel="noopener noreferrer"
        initial="rest"
        whileHover="hover"
        className="flex items-center gap-2.5 rounded-full border-2 border-text/40 px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-text/70"
      >
        {websiteLabel}
        <motion.span variants={arrowVariants} transition={arrowTransition}>
          <ArrowLeft size={16} className="ltr:rotate-180" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </div>
  );
};

export default HeroCtas;
