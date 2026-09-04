import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

interface FakeUser {
  id: number;
  name: string;
  updated_at: string;
}

interface TableFilter {
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

interface SortingItem {
  id: string;
  desc: boolean;
}

const TOTAL_USERS = 137;
// Simulated network latency so loading states are visible during development.
const FAKE_DELAY_MS = 400;

function generateUsers(): FakeUser[] {
  faker.seed(42);
  return Array.from({ length: TOTAL_USERS }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    updated_at: faker.date.recent({ days: 120 }).toISOString(),
  }));
}

// Generated once per server instance so pagination/sorting stay stable
// between requests, the same way a real backend's data would.
const users = generateUsers();

function applyFiltering(rows: FakeUser[], filters: TableFilter[]) {
  return filters.reduce((result, filter) => {
    if (
      filter.id !== "name" ||
      typeof filter.value !== "string" ||
      !filter.value
    ) {
      return result;
    }

    const search = filter.value.toLowerCase();
    return result.filter((row) => {
      const value = row.name.toLowerCase();
      return filter.fn === "equals" ? value === search : value.includes(search);
    });
  }, rows);
}

function applySorting(rows: FakeUser[], sorting: SortingItem[]) {
  const sort = sorting[0];
  if (!sort) return rows;

  return [...rows].sort((a, b) => {
    const aValue = a[sort.id as keyof FakeUser];
    const bValue = b[sort.id as keyof FakeUser];

    if (aValue < bValue) return sort.desc ? 1 : -1;
    if (aValue > bValue) return sort.desc ? -1 : 1;
    return 0;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const start = Number(searchParams.get("start") ?? 0);
  const size = Number(searchParams.get("size") ?? 10);
  const sorting: SortingItem[] = JSON.parse(
    searchParams.get("sorting") ?? "[]",
  );
  const filters: TableFilter[] = JSON.parse(
    searchParams.get("filters") ?? "[]",
  );

  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));

  const filtered = applyFiltering(users, filters);
  const sorted = applySorting(filtered, sorting);
  const paged = sorted.slice(start, start + size);

  return NextResponse.json({
    data: paged,
    meta: { totalRowCount: filtered.length },
  });
}
