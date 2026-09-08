"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

const shortLabel: Record<(typeof routing.locales)[number], string> = {
  fa: "FA",
  en: "EN",
};

const LanguageSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = routing.locales.find((loc) => loc !== locale);
  if (!otherLocale) return null;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className="rounded-md border border-accent/50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent transition-colors hover:bg-accent/10"
    >
      {shortLabel[otherLocale]}
    </button>
  );
};

export default LanguageSwitch;
