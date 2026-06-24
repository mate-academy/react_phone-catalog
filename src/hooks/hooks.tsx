import { useSearchParams } from "react-router-dom";
import { Sort } from "../types/types";

interface Pagination {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const usePagination = (
  totalElements: number,
  perPage: number,
): Pagination => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(totalElements / perPage);

  const setPage = (newPage: number): void => {
    setSearchParams(prev => {
      if (newPage === 1 || newPage === 0) {
        prev.delete("page");
      } else {
        prev.set("page", String(newPage));
      }

      return prev;
    });
  };

  return {
    totalPages,
    currentPage: page,
    setPage,
  };
};

export const usePerPage = (productLength: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get("perPage") || "all";
  const perPageNum = perPage === "all" ? productLength : Number(perPage);

  const setPerPage = (value: string): void => {
    setSearchParams(prev => {
      if (value === "all") {
        prev.delete("perPage");
      } else {
        prev.set("perPage", value);
      }

      return prev;
    });
  };

  return { perPage: perPageNum, setPerPage };
};

export const useSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get("sort") || Sort.Newest;

  const setSort = (value: string) => {
    setSearchParams(prev => {
      if (value === "sort") {
        prev.delete("sort");
      } else {
        prev.set("sort", value);
      }

      return prev;
    });
  };

  return { setSort, sortValue };
};
