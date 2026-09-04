import { create } from "zustand";
import type { SortingState, VisibilityState } from "@tanstack/react-table";

export interface TableFilter {
  id: string;
  fn:
    | "equals"
    | "contains"
    | "notEquals"
    | "lessThan"
    | "greaterThan"
    | "fuzzy"
    | "between";
  datatype: "text" | "number" | "date" | "boolean";
  value: string | number | boolean | [string, string] | [number, number];
}

interface TableState {
  tableKey: string | null;
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  filtering: TableFilter[];
  columnVisibility: VisibilityState;
  setTableKey: (key: string) => void;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  setSorting: (sorting: SortingState) => void;
  setFiltering: (filtering: TableFilter[]) => void;
  setColumnVisibility: (visibility: VisibilityState) => void;
}

export const useTableStore = create<TableState>((set) => ({
  tableKey: null,
  pageIndex: 0,
  pageSize: 10,
  sorting: [],
  filtering: [],
  columnVisibility: {},
  setTableKey: (key) => set({ tableKey: key }),
  setPageIndex: (index) => set({ pageIndex: index }),
  setPageSize: (size) => set({ pageSize: size, pageIndex: 0 }),
  setSorting: (sorting) => set({ sorting }),
  setFiltering: (filtering) => set({ filtering, pageIndex: 0 }),
  setColumnVisibility: (visibility) => set({ columnVisibility: visibility }),
}));
