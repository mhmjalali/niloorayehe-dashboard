"use client";

import Button from "@/components/ui/Button";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "../language-switcher";
import { ThemeToggle } from "../theme-toggle";

const Header = () => {
  const { toggleCollapsed } = useSidebarStore();

  return (
    <div className="flex min-h-13 w-full items-center justify-between border-b border-text/10 bg-background px-2">
      <Button variant="ghost" onClick={toggleCollapsed}>
        <Menu size={15} />
      </Button>
      <div className="flex items-center gap-2 pe-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
