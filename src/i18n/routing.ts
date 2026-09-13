import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  localeDetection: false,
});

export const localeConfig = {
  fa: { label: "فارسی", direction: "rtl" },
  en: { label: "English", direction: "ltr" },
} as const;
