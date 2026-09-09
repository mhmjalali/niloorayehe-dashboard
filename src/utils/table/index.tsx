"use client";

import { cn } from "@/lib/utils";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { useTableStore } from "./stores/useTableStore";
import Toolbar from "./toolbar";
import { useTableData } from "./hooks/useTableData";
import { TableLoadingBar, TableSkeleton } from "./table-loading";
import Pagination from "./pagination";
import { promptCacheSave } from "./utils/cache-toast";
import { useEffect, useLayoutEffect, useState } from "react";
import { getTableCache, setTableCache } from "./utils/cache-storage";

// Reading the cache from localStorage has to happen before the browser
// paints, or the default (uncached) state flashes for a frame first.
// useLayoutEffect does that; it's a no-op on the server, so fall back to
// useEffect there to avoid React's SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface DataTableProps<T> {
  TableUrl: string;
  TableKey: string;
  columns: ColumnDef<T>[];
  onFilter?: () => void;
  onReload?: () => void;
  onReset?: () => void;
  TableActions?: React.ReactNode;
  defaultSorting?: SortingState;
}

function DataTable<T>({
  TableUrl,
  TableKey,
  columns,
  TableActions,
  defaultSorting,
}: DataTableProps<T>) {
  const {
    pageIndex,
    pageSize,
    sorting,
    columnVisibility,
    setTableKey,
    setPageIndex,
    setPageSize,
    setSorting,
    setFiltering,
    setColumnVisibility,
  } = useTableStore();

  // Stays false on the server and on the very first client render, so the
  // skeleton (not the default/uncached columns) is what shows until the
  // cached state below has actually been applied.
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setTableKey(TableKey);

    const cached = getTableCache(TableKey);
    if (cached) {
      setFiltering(cached.filtering);
      setSorting(cached.sorting);
      setColumnVisibility(cached.columnVisibility);
    } else {
      setFiltering([]);
      setSorting(defaultSorting ?? []);
      setColumnVisibility({});
    }
    setPageIndex(0);
    setMounted(true);
  }, [
    TableKey,
    setTableKey,
    setFiltering,
    setSorting,
    setColumnVisibility,
    setPageIndex,
    defaultSorting,
  ]);

  const { data, total, refetch, isLoading, isFetching } = useTableData<T>({
    endpoint: TableUrl,
    queryKey: TableKey,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: total,
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
      columnVisibility,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      promptCacheSave({
        onConfirm: () => {
          const state = useTableStore.getState();
          if (!state.tableKey) return;
          setTableCache(state.tableKey, {
            filtering: state.filtering,
            sorting: state.sorting,
            columnVisibility: state.columnVisibility,
          });
        },
      });
    },
    onColumnVisibilityChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(columnVisibility) : updater;
      setColumnVisibility(next);
    },
  });

  const visibleColumnCount = table
    .getAllLeafColumns()
    .filter((col) => columnVisibility[col.id] ?? true).length;

  return (
    <div className="flex flex-col gap-2">
      <Toolbar TableActions={TableActions} table={table} onRefresh={refetch} />
      <div className="w-full overflow-x-auto rounded-md shadow-xl bg-accent/10">
        <div className="relative w-full overflow-x-auto rounded-md">
          <table className="w-full text-xs">
            <thead className="rounded-md bg-primary">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sorted = header.column.getIsSorted();
                    const canSort = header.column.getCanSort();

                    const SortIcon =
                      sorted === "asc"
                        ? ChevronUp
                        : sorted === "desc"
                          ? ChevronDown
                          : ChevronsUpDown;

                    return (
                      <th
                        key={header.id}
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        className={cn(
                          "px-4 py-2.5 text-right font-medium whitespace-nowrap cursor-pointer border-l last:border-l-0 border-muted text-white",
                        )}
                      >
                        <div className="flex items-center justify-start gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {canSort && (
                            <SortIcon
                              size={15}
                              className={cn(
                                sorted ? "text-white" : "text-white/50",
                              )}
                            />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {!mounted || isLoading ? (
                <TableSkeleton columnCount={visibleColumnCount} />
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-text-muted/10 border-b border-border last:border-b-0"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const noPadding = cell.column.columnDef.meta?.noPadding;

                      return (
                        <td
                          key={cell.id}
                          className={cn(
                            "text-right text-text whitespace-nowrap border-l border-border last:border-l-0",
                            !noPadding && "px-4 py-2.5",
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!isLoading && isFetching && (
            <div className="absolute left-0 right-0 top-11">
              <TableLoadingBar isFetching={isFetching} />
            </div>
          )}
        </div>
      </div>
      <Pagination table={table} totalRowCount={total} />
    </div>
  );
}

export default DataTable;
