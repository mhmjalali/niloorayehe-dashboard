import { LanguageSwitcher } from "@/components/main/language-switcher";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Header = async () => {
  const t = await getTranslations("Home");

  return (
    <header className="flex items-center justify-between gap-6 border-b-2 border-text/16 px-12 py-5.5">
      <div className="flex items-center gap-3.5">
        <Image
          src="/logo/niloorayehe.svg"
          alt="Niloo Rayehe"
          width={780}
          height={522}
          className="h-8 w-auto"
        />
        <span className="h-3.5 w-0.5 bg-accent" aria-hidden="true" />
        <span className="text-sm text-text/62">{t("Header.tagline")}</span>
      </div>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
