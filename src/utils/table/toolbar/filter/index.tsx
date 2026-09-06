"use client";

import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo } from "react";
import FilterField from "./filter-field";
import { useTableStore } from "../../stores/useTableStore";
import type { TableFilter } from "../../stores/useTableStore";
import type { FilterableColumn } from "../../types/types";
import { promptCacheSave } from "../../utils/cache-toast";
import { setTableCache } from "../../utils/cache-storage";

type FilterMode = TableFilter["fn"];

interface FilterDraftItem {
  mode: FilterMode;
  value: unknown;
}

type FilterDraft = Record<string, FilterDraftItem>;

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  columns: FilterableColumn[];
}

const isEmptyValue = (val: unknown): boolean => {
  if (val === undefined || val === "") return true;
  if (Array.isArray(val)) return val.every((v) => v === "" || v === undefined);
  return false;
};

function Filter({ open, onClose, columns }: FilterDrawerProps) {
  const filtering = useTableStore((state) => state.filtering);
  const setFiltering = useTableStore((state) => state.setFiltering);

  const buildEmptyValues = useCallback((): FilterDraft => {
    const result: FilterDraft = {};
    for (const column of columns) {
      result[column.id] = {
        mode: column.filter.defaultMode as FilterMode,
        value: column.filter.type === "date" ? ["", ""] : "",
      };
    }
    return result;
  }, [columns]);

  const buildValuesFromStore = useCallback((): FilterDraft => {
    const result = buildEmptyValues();
    for (const filter of filtering) {
      if (result[filter.id]) {
        result[filter.id] = { mode: filter.fn, value: filter.value };
      }
    }
    return result;
  }, [buildEmptyValues, filtering]);

  const defaultValues = useMemo(() => buildEmptyValues(), [buildEmptyValues]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<FilterDraft>({
    defaultValues,
  });

  useEffect(() => {
    reset(buildValuesFromStore());
  }, [buildValuesFromStore, reset]);

  const values = watch();
  const isEmpty = Object.values(values).every((item) =>
    isEmptyValue(item?.value),
  );

  const saveCurrentToCache = () => {
    const state = useTableStore.getState();
    if (!state.tableKey) return;
    setTableCache(state.tableKey, {
      filtering: state.filtering,
      sorting: state.sorting,
      columnVisibility: state.columnVisibility,
    });
  };

  const onSubmit = (draft: FilterDraft) => {
    const result: TableFilter[] = Object.entries(draft)
      .filter(([, item]) => !isEmptyValue(item.value))
      .map(([columnId, item]) => {
        const column = columns.find((c) => c.id === columnId);

        const datatype: TableFilter["datatype"] =
          column?.filter.type === "numeric"
            ? "number"
            : column?.filter.type === "date"
              ? "date"
              : "text";

        return {
          id: columnId,
          fn: item.mode,
          datatype,
          value: item.value as TableFilter["value"],
        };
      });

    setFiltering(result);
    onClose();

    promptCacheSave({ onConfirm: saveCurrentToCache });
  };

  const handleReset = () => {
    setFiltering([]);
    promptCacheSave({ onConfirm: saveCurrentToCache });
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-full"
      >
        <h2 className="text-base font-semibold text-text">فیلترها</h2>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto h-full space-y-4">
            {columns.map((column) => {
              return (
                <div key={column.id} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`filter_${column.id}`}
                    className="text-xs text-muted"
                  >
                    {column.label}
                  </label>
                  <Controller
                    name={`${column.id}.mode` as const}
                    control={control}
                    render={({ field: modeField }) => (
                      <Controller
                        name={`${column.id}.value` as const}
                        control={control}
                        render={({ field: valueField }) => (
                          <FilterField
                            config={column.filter}
                            value={valueField.value}
                            name={column.label}
                            fieldId={`filter_${column.id}`}
                            onChange={(value) => valueField.onChange(value)}
                            mode={modeField.value}
                            onModeChange={(mode) => modeField.onChange(mode)}
                          />
                        )}
                      />
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <Button
            type="button"
            variant="outlined"
            onClick={handleReset}
            color="error"
            disabled={isEmpty}
          >
            بازنشانی
          </Button>
          <Button type="submit" className="flex-1" disabled={!isDirty}>
            اعمال فیلتر
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

export default Filter;
