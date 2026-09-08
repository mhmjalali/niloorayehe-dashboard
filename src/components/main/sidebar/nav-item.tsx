"use client";

import type { SidebarItem } from "@/data/sidebar-items";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

interface NavItemProps {
  item: SidebarItem;
  collapsed: boolean;
  depth?: number;
}

function isRouteActive(item: SidebarItem, pathname: string): boolean {
  if (pathname === item.route) return true;
  if (!item.children) return false;
  return item.children.some((child) => isRouteActive(child, pathname));
}

const NavItem = ({ item, collapsed, depth = 0 }: NavItemProps) => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const isActive = pathname === item.route;
  const isDescendantActive = hasChildren && isRouteActive(item, pathname);

  const [manuallyExpanded, setManuallyExpanded] = useState<boolean | null>(
    null,
  );
  const expanded = manuallyExpanded ?? isDescendantActive;

  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [flyoutPos, setFlyoutPos] = useState({ top: 0, right: 0 });
  const itemRef = useRef<HTMLLIElement>(null);

  const openFlyout = () => {
    if (!collapsed) return;
    const rect = itemRef.current?.getBoundingClientRect();
    if (rect) {
      setFlyoutPos({
        top: rect.top,
        right: window.innerWidth - rect.left + 8,
      });
    }
    setFlyoutOpen(true);
  };
  const closeFlyout = () => setFlyoutOpen(false);

  const Icon = item.icon;

  const baseClasses = cn(
    "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group w-full",
    collapsed && "justify-center",
    isActive || isDescendantActive
      ? "bg-text-muted/15 text-primary"
      : "text-muted hover:bg-text-muted/15 hover:text-text",
  );

  const content = (
    <>
      {(isActive || (isDescendantActive && !hasChildren)) && (
        <motion.div
          layoutId="active-indicator"
          className="bg-primary dark:bg-muted absolute top-1.5 inset-s-0 bottom-1.5 w-0.5 rounded-r-full"
        />
      )}

      <Icon
        size={18}
        className={cn(
          "shrink-0 transition-colors",
          isActive || isDescendantActive
            ? "text-primary dark:text-muted"
            : "text-text-muted group-hover:text-text",
        )}
      />

      {!collapsed && (
        <span
          className={cn(
            "flex-1 overflow-hidden text-start text-sm font-medium whitespace-nowrap",
            isActive || isDescendantActive
              ? "text-primary dark:text-muted"
              : "text-text-muted group-hover:text-text",
          )}
        >
          {t(item.label)}
        </span>
      )}

      {!collapsed && hasChildren && (
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={14} />
        </motion.div>
      )}

      {collapsed && !hasChildren && (
        <div className="pointer-events-none absolute right-full z-50 mr-2 rounded-md bg-text px-2.5 py-1.5 text-xs whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
          {t(item.label)}
        </div>
      )}
    </>
  );

  if (!hasChildren) {
    return (
      <li style={{ paddingRight: collapsed ? 0 : depth * 6 }}>
        <Link href={item.route} className={baseClasses}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={itemRef}
      className="relative"
      style={{ paddingRight: collapsed ? 0 : depth * 6 }}
      onMouseEnter={openFlyout}
      onMouseLeave={closeFlyout}
    >
      <button
        type="button"
        onClick={() => !collapsed && setManuallyExpanded(!expanded)}
        className={baseClasses}
      >
        {content}
      </button>

      {!collapsed && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-0.5 flex flex-col gap-0.5">
                {item.children?.map((child) => (
                  <NavItem
                    key={child.key}
                    item={child}
                    collapsed={collapsed}
                    depth={depth + 1}
                  />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {collapsed &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {flyoutOpen && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={openFlyout}
                onMouseLeave={closeFlyout}
                style={{
                  position: "fixed",
                  top: flyoutPos.top,
                  right: flyoutPos.right,
                }}
                className="z-100 min-w-50 rounded-lg border border-text/10 bg-background p-1.5 shadow-lg"
              >
                <ul className="flex flex-col gap-0.5">
                  {item.children?.map((child) => (
                    <NavItem
                      key={child.key}
                      item={child}
                      collapsed={false}
                      depth={0}
                    />
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </li>
  );
};

export default NavItem;
