import type { LucideIcon } from "lucide-react";
import {
  ContactRound,
  LayoutDashboard,
  LibraryBig,
  School,
  ShieldUser,
} from "lucide-react";

export interface SidebarItem {
  key: string;
  label: string;
  route: string;
  icon: LucideIcon;
  permissions: string[];
  children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    key: "dashboard",
    label: "داشبورد",
    route: "/dashboard",
    icon: LayoutDashboard,
    permissions: ["all"],
  },
  {
    key: "user-management",
    label: "مدیریت کاربران",
    route: "/dashboard/user-management",
    icon: ShieldUser,
    permissions: ["all"],
  },
  {
    key: "missions",
    label: "آکادمی",
    route: "/dashboard/academy",
    icon: School,
    permissions: ["all"],
    children: [
      {
        key: "academy-professors",
        label: "مدیریت اساتید",
        route: "/dashboard/academy/professors",
        icon: ContactRound,
        permissions: ["all"],
      },
      {
        key: "academy-courses",
        label: "مدیریت دوره ها",
        route: "/dashboard/academy/courses",
        icon: LibraryBig,
        permissions: ["all"],
      },
    ],
  },
];
