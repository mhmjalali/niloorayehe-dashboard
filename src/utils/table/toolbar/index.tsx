import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import type { Table } from "@tanstack/react-table";
import {
  Columns2,
  EllipsisVertical,
  ListFilter,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTableStore } from "../stores/useTableStore";
import type { ColumnFilterConfig, FilterableColumn } from "../types/types";
import Filter from "./filter";
import Visibility from "./Visibility";
import { removeTableCache } from "../utils/cache-storage";
import BlinkDot from "@/components/ui/BlinkDot";
import { useTranslations } from "next-intl";

interface ToolbarProps<T> {
  TableActions: React.ReactNode;
  table: Table<T>;
  onRefresh: () => void;
}

type ColumnDefWithFilter = {
  filter?: ColumnFilterConfig;
};

function Toolbar<T>({ TableActions, table, onRefresh }: ToolbarProps<T>) {
  const t = useTranslations("Table");
  const [actionsOpen, setActionsOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [visibilityDrawerOpen, setVisibilityDrawerOpen] = useState(false);
  const {
    tableKey,
    filtering,
    sorting,
    columnVisibility,
    setFiltering,
    setSorting,
    setPageIndex,
    setColumnVisibility,
  } = useTableStore();

  const hasActiveState =
    filtering.length > 0 ||
    sorting.length > 0 ||
    Object.keys(columnVisibility).length > 0;

  const filterableColumns: FilterableColumn[] = table
    .getAllColumns()
    .filter((col) => (col.columnDef as ColumnDefWithFilter).filter)
    .map((col) => ({
      id: col.id,
      label:
        typeof col.columnDef.header === "string"
          ? col.columnDef.header
          : col.id,
      filter: (col.columnDef as ColumnDefWithFilter)
        .filter as ColumnFilterConfig,
    }));

  const handleResetAll = () => {
    setFiltering([]);
    setColumnVisibility({});
    setSorting([]);
    setPageIndex(0);

    if (tableKey) {
      removeTableCache(tableKey);
    }
  };

  const actions = [
    {
      icon: <ListFilter size={15} />,
      label: t("Actions.filter"),
      onClick: () => setFilterDrawerOpen(true),
    },
    {
      icon: <Columns2 size={15} />,
      label: t("Actions.visibility"),
      onClick: () => setVisibilityDrawerOpen(true),
    },
    {
      icon: <RefreshCw size={15} />,
      label: t("Actions.refresh"),
      onClick: onRefresh,
    },
    {
      icon: <RotateCcw size={15} />,
      label: t("Actions.reset"),
      onClick: handleResetAll,
      showDot: hasActiveState,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div>{TableActions}</div>
        <div className="flex items-center justify-end">
          <AnimatePresence>
            {actionsOpen &&
              actions.map((action, i) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15, delay: i * 0.04 }}
                >
                  <Tooltip text={action.label} position="top">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={action.onClick}
                      title={action.label}
                    >
                      {action.icon}
                      {action.showDot && <BlinkDot />}
                    </Button>
                  </Tooltip>
                </motion.div>
              ))}
          </AnimatePresence>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setActionsOpen((prev) => !prev)}
          >
            <EllipsisVertical size={15} />
            {hasActiveState && !actionsOpen && <BlinkDot />}
          </Button>
        </div>
      </div>
      <Filter
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        columns={filterableColumns}
      />
      <Visibility
        open={visibilityDrawerOpen}
        onClose={() => setVisibilityDrawerOpen(false)}
        table={table}
      />
    </>
  );
}

export default Toolbar;
