import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap w-fit",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "border bg-transparent",
        ghost: "bg-transparent",
      },
      size: {
        sm: "h-6 px-2.5 text-xs",
        md: "h-7 px-3 text-sm",
        lg: "h-9 px-4 text-base",
      },
      color: {
        primary: "",
        muted: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        class: "bg-primary text-background",
      },
      {
        variant: "outlined",
        color: "primary",
        class: "border-primary text-primary",
      },
      {
        variant: "ghost",
        color: "primary",
        class: "bg-primary/10 text-primary",
      },

      { variant: "contained", color: "muted", class: "bg-muted text-text" },
      { variant: "outlined", color: "muted", class: "border-muted text-text" },
      { variant: "ghost", color: "muted", class: "bg-muted/10 text-text" },
    ],
    defaultVariants: {
      variant: "contained",
      size: "md",
      color: "primary",
    },
  },
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof chipVariants> {
  label: string;
}

function Chip({ label, variant, size, color, className, ...props }: ChipProps) {
  return (
    <span
      className={cn(chipVariants({ variant, size, color }), className)}
      {...props}
    >
      {label}
    </span>
  );
}

export default Chip;
