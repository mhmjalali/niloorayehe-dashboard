import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeConfig, routing } from "@/i18n/routing";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

const morabba = localFont({
  src: [
    {
      path: "../fonts/morabba/woff2/Morabba-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/morabba/woff2/Morabba-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/morabba/woff2/Morabba-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/morabba/woff2/Morabba-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/morabba/woff2/Morabba-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-morabba",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: LayoutProps<"/[locale]">["params"];
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const { direction } = localeConfig[locale as keyof typeof localeConfig];

  return (
    <html
      lang={locale}
      dir={direction}
      className={`h-full ${morabba.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <NextTopLoader color="var(--color-accent)" height={3} />
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
