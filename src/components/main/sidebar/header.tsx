"use client";

import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { X } from "lucide-react";
import Image from "next/image";

const Header = () => {
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
        <div className="shrink-0">
          <Image
            src="/logo/niloorayehe.svg"
            alt="فعال در صنعت عطر و رایحه"
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <span className="text-primary leading-tight font-bold">
              نیلو رایحه ایرانیان
            </span>
            <span className="text-secondary mt-0.5 text-xs leading-tight">
              پلتفرم جامع مدیریت امور نیلو رایحه
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
