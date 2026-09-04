"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectFieldProps<T extends string | number> {
  value: T | undefined;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  numeric?: boolean;
  name: string;
  fieldId: string;
}

function SelectField<T extends string | number>({
  value,
  options,
  onChange,
  numeric = false,
  name,
  fieldId,
}: SelectFieldProps<T>) {
  return (
    <div className="relative">
      <select
        id={fieldId}
        value={value ?? ""}
        onChange={(e) =>
          onChange((numeric ? Number(e.target.value) : e.target.value) as T)
        }
        className={cn(
          "w-full appearance-none rounded-lg border border-border bg-surface-secondary px-3 py-2 pl-8 text-sm outline-none transition-colors hover:border-text-secondary focus:border-secondary focus:bg-white",
          value === undefined || value === ""
            ? "text-text-secondary"
            : "text-text-primary",
        )}
      >
        <option value="" className="text-text-primary">
          {name} را انتخاب کنید
        </option>
        {options.map((opt) => (
          <option
            className="text-text-primary"
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary"
      />
    </div>
  );
}

export default SelectField;
