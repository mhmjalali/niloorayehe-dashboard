import Button from "@/components/ui/Button";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTableStore } from "./stores/useTableStore";

const PAGE_SIZES = [10, 20, 50, 100];

interface PaginationProps<T> {
  table: Table<T>;
  totalRowCount: number;
}

function Pagination<T>({ table, totalRowCount }: PaginationProps<T>) {
  const { pageIndex, pageSize, setPageIndex, setPageSize } = useTableStore();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-sm text-text">
      <div className="flex items-center gap-2">
        <span>ردیف در صفحه:</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            table.setPageSize(Number(e.target.value));
          }}
          className="rounded border border-border bg-transparent px-2 py-1 text-sm"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-text-muted">
          {pageIndex * pageSize + 1} –{" "}
          {Math.min((pageIndex + 1) * pageSize, totalRowCount)} از{" "}
          {totalRowCount}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            table.setPageIndex(0);
            setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsRight size={15} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            table.previousPage();
            setPageIndex(pageIndex - 1);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronRight size={15} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            table.nextPage();
            setPageIndex(pageIndex + 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronLeft size={15} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const last = table.getPageCount() - 1;
            table.setPageIndex(last);
            setPageIndex(last);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsLeft size={15} />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
