import "@tanstack/react-table";

export type TextFilterMode = "equals" | "notEquals" | "contains" | "fuzzy";
export type NumericFilterMode =
  | "equals"
  | "notEquals"
  | "contains"
  | "lessThan"
  | "greaterThan";
export type DateFilterMode = "between";
export type ArrayFilterMode = "equals";

export type FilterMode =
  | TextFilterMode
  | NumericFilterMode
  | DateFilterMode
  | ArrayFilterMode;

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterableColumn {
  id: string;
  label: string;
  filter: ColumnFilterConfig;
}

export type ColumnFilterConfig =
  | {
      type: "text";
      defaultMode: TextFilterMode;
      availableModes: TextFilterMode[];
      options?: FilterOption[];
    }
  | {
      type: "numeric";
      defaultMode: NumericFilterMode;
      availableModes: NumericFilterMode[];
      options: FilterOption[];
    }
  | {
      type: "date";
      defaultMode: DateFilterMode;
      availableModes: DateFilterMode[];
    }
  | {
      type: "array";
      defaultMode: ArrayFilterMode;
      availableModes: ArrayFilterMode[];
      options: FilterOption[];
    };

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    filter?: ColumnFilterConfig;
    noPadding?: boolean;
  }
}
