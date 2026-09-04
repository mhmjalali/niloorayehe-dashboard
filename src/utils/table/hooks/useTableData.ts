import { api } from "@/lib/axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useTableStore } from "../stores/useTableStore";

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalRowCount: number;
  };
}

interface UseTableDataOptions {
  endpoint: string;
  queryKey: string;
}

export function useTableData<T>({ endpoint, queryKey }: UseTableDataOptions) {
  const { pageIndex, pageSize, sorting, filtering } = useTableStore();

  const query = useQuery({
    queryKey: [queryKey, pageIndex, pageSize, sorting, filtering],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<T>>(endpoint, {
        params: {
          start: pageIndex * pageSize,
          size: pageSize,
          filters: JSON.stringify(filtering),
          sorting: JSON.stringify(sorting),
        },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const total = query.data?.meta.totalRowCount ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  return {
    data: query.data?.data ?? [],
    total,
    pageCount,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
