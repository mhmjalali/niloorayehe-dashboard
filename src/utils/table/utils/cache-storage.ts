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

// A column missing from the map is already treated as visible (see the
// `?? true` reads elsewhere), so a `true` entry carries no information —
// drop it before storing or comparing.
function normalizeVisibility(visibility: VisibilityState): VisibilityState {
  return Object.fromEntries(
    Object.entries(visibility).filter(([, visible]) => !visible),
  );
}

export function setTableCache(tableKey: string, entry: TableCacheEntry): void {
  const store = readStore();
  store[tableKey] = {
    ...entry,
    columnVisibility: normalizeVisibility(entry.columnVisibility),
  };
  writeStore(store);
}

// Whether `current` differs from what's cached (or, with nothing cached
// yet, from `fallback`) — the single check that decides if the "save
// changes?" toast should be open.
export function isTableCacheDirty(
  tableKey: string,
  current: TableCacheEntry,
  fallback: TableCacheEntry,
): boolean {
  const baseline = getTableCache(tableKey) ?? fallback;
  return (
    JSON.stringify(current.filtering) !== JSON.stringify(baseline.filtering) ||
    JSON.stringify(current.sorting) !== JSON.stringify(baseline.sorting) ||
    JSON.stringify(normalizeVisibility(current.columnVisibility)) !==
      JSON.stringify(normalizeVisibility(baseline.columnVisibility))
  );
}

export function removeTableCache(tableKey: string): void {
  const store = readStore();
  delete store[tableKey];
  writeStore(store);
}
