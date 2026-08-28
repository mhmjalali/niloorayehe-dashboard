"use client";

import { usePathname } from "next/navigation";
import { getBreadcrumbTrail } from "@/lib/breadcrumb";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HOME_ROUTE = "/dashboard";
const HOME_LABEL = "داشبورد";

const Breadcrumb = () => {
  const pathname = usePathname();
  const trail = getBreadcrumbTrail(pathname);
  const isHome = pathname === HOME_ROUTE;
  const items = isHome ? [] : trail;

  return (
    <nav
      aria-label="breadcrumb"
      className="from-text-secondary/8 m-2 flex items-center rounded-xs bg-linear-to-l to-transparent px-3 py-2"
    >
      <ol className="flex items-center gap-1.5 text-sm">
        <li className="flex items-center gap-1.5">
          <Link
            href={HOME_ROUTE}
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              isHome
                ? "text-text-primary pointer-events-none font-medium"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            <LayoutDashboard size={15} />
            <span>{HOME_LABEL}</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;
          return (
            <li key={item.key} className="flex items-center gap-1.5">
              <ChevronLeft
                size={14}
                className="text-text-secondary/50 shrink-0"
              />
              {isLast ? (
                <>
                  <Icon size={15} />
                  <span className="text-text-primary font-medium">
                    {item.label}
                  </span>
                </>
              ) : (
                <>
                  <Icon size={15} className="text-text-secondary" />
                  <span className="text-text-secondary font-medium">
                    {item.label}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
