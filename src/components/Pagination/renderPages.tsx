import { Link } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';

export const renderPages = (
  pages: number[],
  currentPage: number,
  searchParams: URLSearchParams,
) => {
  const maxPagesToShow = 3;
  const startIndex
    = currentPage <= maxPagesToShow - 1
      ? 1
      : currentPage - (maxPagesToShow - 1);

  const endIndex = Math.min(startIndex + maxPagesToShow, pages.length - 1);

  return pages.slice(startIndex, endIndex).map((pageNumber) => (
    <Link
      key={pageNumber}
      to={{
        search: getSearchWith(searchParams, {
          currentPage: `${pageNumber}`,
        }),
      }}
      className={cn('Pagination__button', 'Pagination__button--page', {
        active: currentPage === pageNumber,
      })}
    >
      {pageNumber}
    </Link>
  ));
};
