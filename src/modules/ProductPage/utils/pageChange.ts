import { SetURLSearchParams } from 'react-router-dom';

export const handlePageChange = (
  direction: string,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  currentPage: string,
  pagesPerPage: number[],
) => {
  scrollTo(0, 0);

  const params = new URLSearchParams(searchParams);

  if (direction === 'prev' && +currentPage > 1) {
    params.set('page', (+currentPage - 1).toString());
  } else if (direction === 'next' && +currentPage < pagesPerPage.length) {
    params.set('page', (+currentPage + 1).toString());
  }

  setSearchParams(params);
};
