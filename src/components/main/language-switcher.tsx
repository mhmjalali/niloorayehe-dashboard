"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { localeConfig, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectLocale(nextLocale: (typeof routing.locales)[number]) {
    setOpen(false);
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center cursor-pointer gap-1.5 rounded-full border border-text/10 bg-background px-3.5 py-2 text-xs font-semibold text-text shadow-sm transition-shadow duration-200 hover:shadow-xl"
      >
        {localeConfig[locale as keyof typeof localeConfig].label}
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute inset-e-0 top-full z-20 mt-2 min-w-32 overflow-hidden rounded-md border border-text/10 bg-background py-1 shadow-lg"
          >
            {routing.locales.map((loc) => (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={loc === locale}
                  onClick={() => selectLocale(loc)}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-start text-sm transition-colors hover:bg-text/5",
                    loc === locale ? "font-semibold text-accent" : "text-text",
                  )}
                >
                  {localeConfig[loc].label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
