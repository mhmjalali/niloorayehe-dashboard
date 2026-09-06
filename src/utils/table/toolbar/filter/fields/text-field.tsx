"use client";

import { useEffect, useRef, useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import type { FilterMode } from "../../../types/types";

interface TextFieldProps {
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
  fieldId: string;
  mode?: FilterMode;
  availableModes?: FilterMode[];
  onModeChange?: (mode: FilterMode) => void;
}

const MODE_LABELS: Record<string, string> = {
  equals: "برابر با",
  contains: "شامل",
};

const TextField = ({
  value,
  onChange,
  name,
  fieldId,
  mode,
  availableModes,
  onModeChange,
}: TextFieldProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const showModeSelector = availableModes && availableModes.length > 1;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        id={fieldId}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${name} را وارد کنید`}
        className={`w-full rounded-lg border border-border bg-text/5 px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-muted hover:border-muted focus:border-secondary focus:bg-background ${
          showModeSelector ? "pl-9" : ""
        }`}
      />

      {showModeSelector && (
        <>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="absolute left-1.5 cursor-pointer top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted transition-colors hover:bg-border/50 hover:text-text"
            title="تغییر حالت فیلتر"
          >
            <SlidersHorizontal size={14} />
          </button>

          <div
            className={`absolute left-0 top-full z-10 mt-1 w-36 origin-top-left rounded-lg border border-border bg-background p-1 shadow-lg transition-all duration-150 ${
              open
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            {availableModes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  onModeChange?.(m);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs text-text transition-colors hover:bg-text/5"
              >
                {MODE_LABELS[m] ?? m}
                {mode === m && <Check size={13} className="text-secondary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TextField;
