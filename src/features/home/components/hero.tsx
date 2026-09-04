import { getTranslations } from "next-intl/server";
import HeroCtas from "./hero-ctas";

const Hero = async () => {
  const t = await getTranslations("Home.Hero");

  return (
    <div className="flex items-center px-12">
      <div className="max-w-160">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            {t("eyebrow")}
          </span>
        </div>

        <h1 className="mb-5 text-hero font-black text-text">{t("title")}</h1>
        <p className="mb-8.5 max-w-135 text-subtitle text-text/76">
          {t("subtitle")}
        </p>

        <HeroCtas websiteLabel={t("websiteCta")} panelLabel={t("panelCta")} />

        <p className="mt-5 max-w-130 text-[13.5px] leading-[1.55] text-error">
          * {t("caption")}
        </p>
      </div>
    </div>
  );
};

export default Hero;
