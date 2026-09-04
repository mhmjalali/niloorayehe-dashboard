import { getTranslations } from "next-intl/server";
import HeroCtas from "./hero-ctas";

const Hero = async () => {
  const t = await getTranslations("Home.Hero");

  return (
    <div className="flex flex-1 items-center px-5 py-10 sm:px-8 lg:px-12 lg:py-0">
      <div className="w-full max-w-160">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 sm:mb-6">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            {t("eyebrow")}
          </span>
        </div>

        <h1 className="mb-4 text-3xl leading-[1.2] font-black text-text sm:text-4xl lg:mb-5 lg:text-hero">
          {t("title")}
        </h1>
        <p className="mb-6 max-w-135 text-subtitle text-text/76 sm:mb-8.5">
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
