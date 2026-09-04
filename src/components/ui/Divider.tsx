import { cn } from "@/lib/utils";
import Chip, { type ChipProps } from "@/components/ui/Chip";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  chip?: ChipProps;
  chipPosition?: "start" | "center" | "end";
  className?: string;
}

function Divider({
  orientation = "horizontal",
  chip,
  chipPosition = "center",
  className,
}: DividerProps) {
  const isVertical = orientation === "vertical";

  if (!chip) {
    return (
      <div
        className={cn(
          isVertical ? "w-px h-full bg-text/10" : "h-px w-full bg-text/10",
          className,
        )}
      />
    );
  }

  const justifyClass = {
    start: isVertical ? "justify-start" : "justify-start",
    center: "justify-center",
    end: isVertical ? "justify-end" : "justify-end",
  }[chipPosition];

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        isVertical ? "flex-col h-full" : "flex-row w-full",
        justifyClass,
        className,
      )}
    >
      <div
        className={cn(
          isVertical ? "w-px bg-text/10" : "h-px bg-text/10",
          isVertical
            ? chipPosition === "start"
              ? "h-0"
              : "flex-1"
            : chipPosition === "start"
              ? "w-0"
              : "flex-1",
        )}
      />

      <Chip {...chip} />

      <div
        className={cn(
          isVertical ? "w-px bg-text/10" : "h-px bg-text/10",
          isVertical
            ? chipPosition === "end"
              ? "h-0"
              : "flex-1"
            : chipPosition === "end"
              ? "w-0"
              : "flex-1",
        )}
      />
    </div>
  );
}

export default Divider;
