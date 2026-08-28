import type { LucideIcon } from "lucide-react";
import type { SidebarItem } from "@/data/sidebar-items";
import { sidebarItems } from "@/data/sidebar-items";

export interface BreadcrumbTrailItem {
  key: string;
  label: string;
  route: string;
  icon: LucideIcon;
}

function findTrail(
  items: SidebarItem[],
  pathname: string,
): BreadcrumbTrailItem[] | null {
  for (const item of items) {
    if (item.route === pathname) {
      return [
        {
          key: item.key,
          label: item.label,
          route: item.route,
          icon: item.icon,
        },
      ];
    }

    if (item.children?.length) {
      const childTrail = findTrail(item.children, pathname);
      if (childTrail) {
        return [
          {
            key: item.key,
            label: item.label,
            route: item.route,
            icon: item.icon,
          },
          ...childTrail,
        ];
      }
    }
  }

  return null;
}

export function getBreadcrumbTrail(pathname: string): BreadcrumbTrailItem[] {
  return findTrail(sidebarItems, pathname) ?? [];
}
