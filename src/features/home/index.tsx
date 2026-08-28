import { LanguageSwitcher } from "@/components/main/language-switcher";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  const t = await getTranslations("Home");

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {t("Header.tagline")}
          </span>
          <span className="h-4 w-px bg-foreground/20" aria-hidden="true" />
          <span className="text-lg font-bold tracking-wide text-accent">
            NILOO RAYEHE
          </span>
        </div>
        <LanguageSwitcher />
      </header>
      <div>
        <div>main title</div>
        <div>sub title</div>
        <div>buttons</div>
        <div>caption</div>
      </div>
      <div>
        <div>languages</div>
        <div>contains</div>
        <div>permissions</div>
        <div>copy rights</div>
      </div>
    </div>
  );
};

export default Home;
