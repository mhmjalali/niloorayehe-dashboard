import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("Home.Footer");

  return (
    <footer className="flex items-center justify-center gap-3 border-t-2 border-text/16 px-5 py-4 text-center sm:px-8 sm:py-5 lg:px-12 lg:py-6">
      <span
        className="h-1 w-1 shrink-0 rounded-full bg-accent/60"
        aria-hidden="true"
      />
      <p className="text-xs tracking-wider text-text/45">{t("copyright")}</p>
      <span
        className="h-1 w-1 shrink-0 rounded-full bg-accent/60"
        aria-hidden="true"
      />
    </footer>
  );
};

export default Footer;
