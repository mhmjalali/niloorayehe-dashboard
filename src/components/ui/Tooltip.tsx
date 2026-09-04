"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
} from "motion/react";
import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  text: string;
  position?: TooltipPosition;
  children: React.ReactNode;
  className?: string;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-text border-x-transparent border-b-transparent border-x-4 border-t-4 border-b-0",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-b-text border-x-transparent border-t-transparent border-x-4 border-b-4 border-t-0",
  left: "left-full top-1/2 -translate-y-1/2 border-l-text border-y-transparent border-r-transparent border-y-4 border-l-4 border-r-0",
  right:
    "right-full top-1/2 -translate-y-1/2 border-r-text border-y-transparent border-l-transparent border-y-4 border-r-4 border-l-0",
};

interface MotionVariant {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
}

const motionVariants: Record<TooltipPosition, MotionVariant> = {
  top: { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 } },
  bottom: { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 4 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -4 }, animate: { opacity: 1, x: 0 } },
};

const Tooltip = ({
  text,
  position = "top",
  children,
  className,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            initial={motionVariants[position].initial}
            animate={motionVariants[position].animate}
            exit={motionVariants[position].initial}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "absolute z-50 whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-text text-xs font-medium text-background pointer-events-none",
              positionStyles[position],
            )}
          >
            {text}
            <span
              className={cn(
                "absolute w-0 h-0 border-solid",
                arrowStyles[position],
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip;
