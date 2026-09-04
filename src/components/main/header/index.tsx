"use client";

import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Menu } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "../theme-toggle";
import { LanguageSwitcher } from "../language-switcher";

const Header = () => {
  const { toggleCollapsed, collapsed } = useSidebarStore();
  const isMobile = useIsMobile();

  const showMenuButton = !isMobile || collapsed;

  return (
    <div className="flex min-h-13 w-full items-center justify-between border-b border-text/10 bg-background px-2">
      {showMenuButton && (
        <Button variant="ghost" onClick={toggleCollapsed}>
          <Menu size={15} />
        </Button>
      )}
      <div className="flex items-center gap-2 pe-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
