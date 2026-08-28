"use client";

import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Menu } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const { toggleCollapsed, collapsed } = useSidebarStore();
  const isMobile = useIsMobile();

  const showMenuButton = !isMobile || collapsed;

  return (
    <div className="flex min-h-13 w-full items-center justify-between border-b border-black/8 bg-white ps-2">
      {showMenuButton && (
        <Button variant="ghost" onClick={toggleCollapsed}>
          <Menu size={15} />
        </Button>
      )}
      <div>
        <Image src="/logo/rmto.svg" alt="سامانه جامع راهداری" width={32} height={32} className="me-2 h-8 w-8" />
      </div>
    </div>
  );
};

export default Header;
