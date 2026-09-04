"use client";

import Button from "@/components/ui/Button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      aria-label="تغییر تم"
      className="relative w-9 rounded-md border border-text/10 bg-background p-0 text-muted transition-colors hover:bg-primary/10 hover:text-primary"
    >
      <Sun
        size={15}
        className="absolute inset-0 m-auto transition-all duration-300 [[data-theme=dark]_&]:rotate-90 [[data-theme=dark]_&]:scale-50 [[data-theme=dark]_&]:opacity-0"
      />
      <Moon
        size={15}
        className="absolute inset-0 m-auto -rotate-90 scale-50 opacity-0 transition-all duration-300 [[data-theme=dark]_&]:rotate-0 [[data-theme=dark]_&]:scale-100 [[data-theme=dark]_&]:opacity-100"
      />
    </Button>
  );
}
