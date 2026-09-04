import type { SortingState, VisibilityState } from "@tanstack/react-table";
import type { TableFilter } from "../stores/useTableStore";

const STORAGE_KEY = "table-cache";

export interface TableCacheEntry {
  filtering: TableFilter[];
  sorting: SortingState;
  columnVisibility: VisibilityState;
}

type TableCacheStore = Record<string, TableCacheEntry>;

function readStore(): TableCacheStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TableCacheStore;
  } catch {
    return {};
  }
}

function writeStore(store: TableCacheStore): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage unavailable (quota, private mode, etc) — fail silently
  }
}

export function getTableCache(tableKey: string): TableCacheEntry | null {
  const store = readStore();
  return store[tableKey] ?? null;
}

export function setTableCache(tableKey: string, entry: TableCacheEntry): void {
  const store = readStore();
  store[tableKey] = entry;
  writeStore(store);
}

export function removeTableCache(tableKey: string): void {
  const store = readStore();
  delete store[tableKey];
  writeStore(store);
}
