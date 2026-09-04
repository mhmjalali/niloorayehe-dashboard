import type { ColumnFilterConfig, FilterMode } from "../../types/types";
import DateRangeField from "./fields/date-range-field";
import SelectField from "./fields/select-field";
import TextField from "./fields/text-field";

interface FilterInputProps {
  config: ColumnFilterConfig;
  value: unknown;
  name: string;
  fieldId: string;
  onChange: (value: unknown) => void;
  mode: FilterMode;
  onModeChange: (mode: FilterMode) => void;
}

const FilterField = ({
  config,
  value,
  name,
  fieldId,
  onChange,
  mode,
  onModeChange,
}: FilterInputProps) => {
  switch (config.type) {
    case "text":
      return config.options ? (
        <SelectField
          value={value as string}
          options={config.options}
          onChange={onChange}
          name={name}
          fieldId={fieldId}
        />
      ) : (
        <TextField
          value={value as string}
          onChange={onChange}
          name={name}
          fieldId={fieldId}
          mode={mode}
          availableModes={config.availableModes}
          onModeChange={onModeChange}
        />
      );

    case "numeric":
      return (
        <SelectField
          value={value as number}
          options={config.options}
          onChange={onChange}
          numeric
          name={name}
          fieldId={fieldId}
        />
      );

    case "date":
      return (
        <DateRangeField
          value={value as [string, string]}
          onChange={onChange}
          fieldId={fieldId}
        />
      );

    default:
      return null;
  }
};

export default FilterField;
