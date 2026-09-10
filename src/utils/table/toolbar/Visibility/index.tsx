"use client";

import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import { Check } from "lucide-react";
import { useTableStore } from "../../stores/useTableStore";

interface VisibilityProps<T> {
  open: boolean;
  onClose: () => void;
  table: Table<T>;
}

function Visibility<T>({ open, onClose, table }: VisibilityProps<T>) {
  const { columnVisibility } = useTableStore();
  const columns = table.getAllLeafColumns();
  const visibleCount = columns.filter(
    (c) => columnVisibility[c.id] ?? true,
  ).length;

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col items-start">
          <h2 className="text-base font-semibold text-text">
            مخفی/نمایش ستون‌ها
          </h2>
          <span className="text-xs text-text-muted">
            {visibleCount} از {columns.length} نمایش داده می‌شود
          </span>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto h-full space-y-1 -mx-1 px-1">
            {columns.map((column) => {
              const label =
                typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : column.id;

              const isVisible = columnVisibility[column.id] ?? true;
              const canHide = column.getCanHide();

              return (
                <label
                  key={column.id}
                  htmlFor={`visibility_${column.id}`}
                  className={cn(
                    "flex items-center justify-between gap-2 py-2.5 px-2.5 rounded-md text-sm transition-colors",
                    canHide
                      ? "cursor-pointer hover:bg-primary/5"
                      : "cursor-not-allowed opacity-50",
                  )}
                >
                  <span className="text-text">{label}</span>
                  <span className="relative inline-flex shrink-0">
                    <input
                      id={`visibility_${column.id}`}
                      type="checkbox"
                      checked={isVisible}
                      disabled={!canHide}
                      onChange={(e) => {
                        column.toggleVisibility(e.target.checked);
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                        isVisible
                          ? "bg-primary border-primary"
                          : "bg-transparent border-text/20",
                        canHide &&
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30",
                      )}
                    >
                      {isVisible && (
                        <Check
                          size={13}
                          strokeWidth={3}
                          className="text-white"
                        />
                      )}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-2">
          <Button
            type="button"
            variant="ghost"
            color="error"
            onClick={() => {
              table.toggleAllColumnsVisible(false);
            }}
          >
            مخفی کردن همه
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={() => {
              table.toggleAllColumnsVisible(true);
            }}
          >
            نمایش همه
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default Visibility;
