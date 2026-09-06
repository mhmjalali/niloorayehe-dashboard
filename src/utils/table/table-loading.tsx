"use client";

import { AnimatePresence, motion } from "motion/react";

interface TableLoadingBarProps {
  isFetching: boolean;
}

export const TableSkeleton = ({
  columnCount,
  rowCount = 5,
}: {
  columnCount: number;
  rowCount?: number;
}) => {
  return (
    <>
      {Array.from({ length: rowCount }, (_, i) => (
        <tr
          key={`skeleton-row-${Date.now()}-${i}`}
          className="border-b border-border"
        >
          {Array.from({ length: columnCount }, (_, j) => (
            <td
              key={`skeleton-cell-${Date.now()}-${i}-${j}`}
              className="px-4 py-3"
            >
              <div
                className="h-4 rounded-md bg-text/15 animate-pulse"
                style={{ width: `${60 + ((i * 7 + j * 13) % 35)}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export function TableLoadingBar({ isFetching }: TableLoadingBarProps) {
  return (
    <div className="relative h-0.5 w-full overflow-hidden bg-border">
      <AnimatePresence>
        {isFetching && (
          <motion.div
            key="bar"
            className="absolute inset-y-0 right-0 w-full rounded-full bg-secondary/40"
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "300%"] }}
            exit={{ opacity: 0 }}
            transition={{
              x: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.15 },
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
