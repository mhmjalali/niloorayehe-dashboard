"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { X } from "lucide-react";
import Button from "./Button";

export type DrawerSide = "left" | "right" | "bottom" | "top";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: DrawerSide;
  size?: string;
}

const variants: Record<DrawerSide, Variants> = {
  right: { hidden: { x: "100%" }, visible: { x: 0 } },
  left: { hidden: { x: "-100%" }, visible: { x: 0 } },
  bottom: { hidden: { y: "100%" }, visible: { y: 0 } },
  top: { hidden: { y: "-100%" }, visible: { y: 0 } },
};

const position: Record<DrawerSide, string> = {
  right: "right-0 top-0 h-full",
  left: "left-0 top-0 h-full",
  bottom: "bottom-0 left-0 w-full",
  top: "top-0 left-0 w-full",
};

const defaultSize: Record<DrawerSide, string> = {
  right: "w-full sm:max-w-xs",
  left: "w-full sm:max-w-xs",
  bottom: "min-h-[50vh]",
  top: "min-h-[50vh]",
};

export default function Drawer({
  open,
  onClose,
  children,
  side = "right",
  size,
}: DrawerProps) {
  const resolvedSize = size ?? defaultSize[side];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-90 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            className={[
              "fixed z-90 flex flex-col bg-background shadow-2xl",
              position[side],
              resolvedSize,
            ].join(" ")}
            variants={variants[side]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
              mass: 0.9,
            }}
          >
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-3 inset-e-3 z-10"
              aria-label="Close"
            >
              <X size={18} />
            </Button>

            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
