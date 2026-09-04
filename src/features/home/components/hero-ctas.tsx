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
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3.5">
      <MotionLink
        href="/dashboard"
        initial="rest"
        whileHover="hover"
        className="flex items-center justify-center gap-2.5 rounded-md border-2 border-primary bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:brightness-110 sm:px-7 sm:py-3.5"
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
        className="flex items-center justify-center gap-2.5 rounded-md border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 sm:px-7 sm:py-3.5"
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
