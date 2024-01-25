import { useSearchParams } from 'react-router-dom';
import { SearchParams, PER_PAGE, PerPage } from '../enums';
import { getNumbers } from '../helpers';

type PaginationType<T> = {
  isShowPagination: boolean,
  showedItems: T[],
  pages: number[],
  currentPage: number,
};

type UsePaginationType = <T>(items: T[]) => PaginationType<T>;

export const usePagination: UsePaginationType = (items) => {
  const [searchParams] = useSearchParams();
  const count = items.length;

  const DEFAULT_PAGINATION = {
    isShowPagination: true,
    showedItems: items,
    pages: [],
    currentPage: 1,
  };

  let perPage = searchParams.get(SearchParams.PER_PAGE) || PER_PAGE;

  if (perPage === PerPage.All || !count || count <= +perPage) {
    return { ...DEFAULT_PAGINATION, isShowPagination: false };
  }

  perPage = +perPage;

  if (Number.isNaN(perPage) || perPage <= 0) {
    perPage = PER_PAGE;
  }

  const pageCount = Math.ceil(count / perPage);
  const pages = getNumbers(pageCount);
  let currentPage = +(searchParams.get(SearchParams.PAGE) || 1);

  if (!pages.includes(currentPage)) {
    currentPage = 1;
  }

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const showedItems = items.slice(start, end);

  return {
    ...DEFAULT_PAGINATION,
    showedItems,
    currentPage,
    pages,
  };
};
