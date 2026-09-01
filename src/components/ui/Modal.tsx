"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  closeOnBackdrop?: boolean;
  size?: ModalSize;
  className?: string;
}

const Modal = ({
  children,
  open,
  onClose,
  closeOnBackdrop = false,
  size = "lg",
  className = "",
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-black/50 backdrop-blur-xs"
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              // inset + m-auto centers the panel while keeping it inside the
              // viewport at every width; max-h uses dvh so mobile browser
              // chrome can't push the panel off-screen.
              "fixed inset-3 sm:inset-6 z-100 m-auto flex h-fit flex-col overflow-hidden rounded-md bg-white p-2",
              "max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]",
              sizeClasses[size],
              className,
            )}
          >
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              aria-label="بستن"
              className="absolute top-2 left-2 z-10"
            >
              <X size={16} />
            </Button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
