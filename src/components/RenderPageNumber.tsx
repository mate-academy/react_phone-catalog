import { Link } from 'react-router-dom';
import cn from 'classnames';
import './Pagination.scss';
// eslint-disable-next-line import/no-cycle
import { getSearchWith } from '../pages/PhonesPage';

export const PageNumber = (
  page: number[],
  currentPage: number,
  searchParams: URLSearchParams,
) => {
  const maxPage = 3;
  const startInd = currentPage <= maxPage
    ? 2
    : currentPage - (maxPage - 2);

  const lastIndex = Math.min(startInd + maxPage, page.length - 1);

  return page.slice(startInd, lastIndex).map((pageNumber) => (
    <Link
      key={pageNumber}
      to={{
        search: getSearchWith(searchParams, {
          currentPage: `${pageNumber}`,
        }),
      }}
      className={cn('pagination__button', 'pagination__button--page', {
        active: currentPage === pageNumber,
      })}
    >
      {pageNumber}
    </Link>
  ));
};
