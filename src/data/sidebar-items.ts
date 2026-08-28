import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  ClipboardPlus,
  FileChartColumn,
  LayoutDashboard,
  Repeat,
  ShieldUser,
  ShieldX,
  UserRoundArrowLeft,
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
    label: "ماموریت ها",
    route: "/dashboard/missions",
    icon: BriefcaseBusiness,
    permissions: ["all"],
    children: [
      {
        key: "missions-requester",
        label: "درخواست دهنده",
        route: "/dashboard/missions/requester",
        icon: UserRoundArrowLeft,
        permissions: ["all"],
      },
      {
        key: "missions-validator",
        label: "تایید کننده",
        route: "/dashboard/missions/validator",
        icon: ShieldUser,
        permissions: ["all"],
      },
      {
        key: "missions-access-control",
        label: "کنترل تردد",
        route: "/dashboard/missions/access-control",
        icon: Repeat,
        permissions: ["all"],
      },
      {
        key: "missions-violations",
        label: "تخلفات",
        route: "/dashboard/missions/violations",
        icon: ShieldX,
        permissions: ["all"],
      },
      {
        key: "missions-reports",
        label: "گزارشات",
        route: "/dashboard/missions/reports",
        icon: ClipboardPlus,
        permissions: ["all"],
        children: [
          {
            key: "missions-reports-access",
            label: "گزارش تردد ها",
            route: "/dashboard/missions/reports/access",
            icon: FileChartColumn,
            permissions: ["all"],
          },
          {
            key: "missions-reports-violations",
            label: "گزارش تخلفات",
            route: "/dashboard/missions/reports/violations",
            icon: FileChartColumn,
            permissions: ["all"],
          },
          {
            key: "missions-reports-machines",
            label: "گزارش ماشین آلات",
            route: "/dashboard/missions/reports/machines",
            icon: FileChartColumn,
            permissions: ["all"],
          },
          {
            key: "missions-reports-machines-type",
            label: "گزارش نوع ماشین آلات",
            route: "/dashboard/missions/reports/machines-type",
            icon: FileChartColumn,
            permissions: ["all"],
          },
        ],
      },
    ],
  },
];
