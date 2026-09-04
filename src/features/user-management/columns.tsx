"use client";

import Button from "@/components/ui/Button";
import type { ColumnFilterConfig } from "@/utils/table/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns-jalali";
import { CalendarDays, Clock10, Trash2 } from "lucide-react";

export interface RowData {
  id: number;
  name: string;
  updated_at: string;
  actions: React.ReactNode;
}

export type ColumnDefWithFilter<T> = ColumnDef<T> & {
  filter?: ColumnFilterConfig;
};

interface GetColumnsParams {
  onDelete: (data: RowData) => void;
}

export const getColumns = ({
  onDelete,
}: GetColumnsParams): ColumnDefWithFilter<RowData>[] => [
  {
    accessorKey: "name",
    header: "نام",
    filter: {
      type: "text",
      defaultMode: "contains",
      availableModes: ["equals", "contains"],
    },
  },
  {
    accessorKey: "updated_at",
    header: "تاریخ بروزرسانی",
    meta: { noPadding: true },
    cell: ({ row }) => {
      const { updated_at } = row.original;
      const createdDateObj = new Date(updated_at);
      return (
        <div className="flex items-start text-right mx-2">
          <div className="bg-success/15 text-primary flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium">
            <CalendarDays size={13} />
            <span>{format(createdDateObj, "yyyy/MM/dd")}</span>
            <Clock10 size={13} />
            <span>{format(createdDateObj, "HH:mm")}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    meta: { noPadding: true },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          color="error"
          className="my-1"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    ),
  },
];
