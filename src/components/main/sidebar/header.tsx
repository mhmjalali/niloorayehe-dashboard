"use client";

import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Header = () => {
  const t = useTranslations("Sidebar.Header");
  const { collapsed, toggleCollapsed } = useSidebarStore();
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex min-h-13 items-center border-b border-text/10",
        collapsed ? "justify-center" : "justify-between px-2",
      )}
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <div className="shrink-0 bg-primary rounded-md p-0.5">
          <Image
            src="/logo/niloorayehe.svg"
            alt={t("logoAlt")}
            width={40}
            height={40}
            className="h-10 w-10"
          />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <span className="text-primary leading-tight font-bold dark:text-muted">
              {t("title")}
            </span>
            <span className="text-secondary mt-0.5 text-xs leading-tight">
              {t("subtitle")}
            </span>
          </div>
        )}
      </div>
      {!collapsed && isMobile && (
        <Button variant="ghost" size="sm" onClick={toggleCollapsed}>
          <X size={15} />
        </Button>
      )}
    </div>
  );
};

export default Header;
