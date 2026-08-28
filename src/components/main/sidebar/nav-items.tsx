"use client";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { sidebarItems } from "@/data/sidebar-items";
import NavItem from "./nav-item";

const NavItems = () => {
  const { collapsed } = useSidebarStore();

  return (
    <nav className="flex-1 overflow-x-hidden overflow-y-auto px-2 py-2.5">
      <ul className="flex flex-col gap-0.5">
        {sidebarItems.map((item) => (
          <NavItem key={item.key} item={item} collapsed={collapsed} />
        ))}
      </ul>
    </nav>
  );
};

export default NavItems;
