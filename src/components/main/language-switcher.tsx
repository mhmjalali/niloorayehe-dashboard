"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const localeLabel: Record<string, string> = {
  en: "EN",
  fa: "فا",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const otherLocale = locale === "fa" ? "en" : "fa";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className="rounded-sm border border-accent px-3 py-1.5 text-xs font-semibold tracking-wide text-accent transition-colors hover:bg-accent hover:text-background"
    >
      {localeLabel[otherLocale]}
    </button>
  );
}
