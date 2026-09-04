import { LanguageSwitcher } from "@/components/main/language-switcher";
import { ThemeToggle } from "@/components/main/theme-toggle";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Header = async () => {
  const t = await getTranslations("Home");

  return (
    <header className="flex items-center justify-between gap-4 border-b-2 border-text/16 px-5 py-4 sm:gap-6 sm:px-8 sm:py-5 lg:px-12 lg:py-5.5">
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <Image
          src="/logo/niloorayehe.svg"
          alt="Niloo Rayehe"
          width={780}
          height={522}
          className="h-7 w-auto sm:h-8"
        />
        <span
          className="hidden h-3.5 w-0.5 bg-accent sm:block"
          aria-hidden="true"
        />
        <span className="hidden text-sm text-text/62 sm:inline">
          {t("Header.tagline")}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
