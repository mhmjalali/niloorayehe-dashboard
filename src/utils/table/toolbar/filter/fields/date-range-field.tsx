"use client";

import DatePicker, { DateObject } from "react-multi-date-picker";
import { Calendar, X } from "lucide-react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

interface DateRangeFieldProps {
  value: [string, string] | undefined;
  onChange: (value: [string, string]) => void;
  fieldId: string;
}

const DateRangeField = ({ value, onChange, fieldId }: DateRangeFieldProps) => {
  const range: [string, string] = Array.isArray(value) ? value : ["", ""];
  const hasValue = Boolean(range[0] || range[1]);

  const pickerValue = range.filter(Boolean).map((dateStr) =>
    new DateObject({
      date: dateStr,
      calendar: gregorian,
    }).convert(persian, persian_fa),
  );

  return (
    <div className="relative">
      <DatePicker
        id={fieldId}
        calendar={persian}
        locale={persian_fa}
        range
        rangeHover
        value={pickerValue}
        onChange={(dates) => {
          if (!Array.isArray(dates)) return;

          const start = dates[0]
            ? dates[0].convert(gregorian, gregorian_en).format("YYYY-MM-DD")
            : "";
          const end = dates[1]
            ? dates[1].convert(gregorian, gregorian_en).format("YYYY-MM-DD")
            : "";

          onChange([start, end]);
        }}
        inputClass="w-full rounded-lg border border-border bg-text/5 px-3 py-2 pl-8 text-sm text-text outline-none transition-colors hover:border-muted focus:border-secondary focus:bg-background"
        containerStyle={{ width: "100%" }}
        placeholder="انتخاب بازه تاریخ"
      />
      <Calendar
        size={15}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
      />
      {hasValue && (
        <button
          type="button"
          onClick={() => onChange(["", ""])}
          className="absolute left-7.5 top-1/2 -translate-y-1/2 text-muted hover:text-error transition-colors"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default DateRangeField;
