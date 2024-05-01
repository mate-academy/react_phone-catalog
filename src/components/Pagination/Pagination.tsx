import cn from 'classnames';
import React from 'react';
import './Pagination.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);
  const currentPageIsFirst = currentPage === 1;
  const currentPageIsLast = currentPage === lastPage;
  const [searchParams] = useSearchParams();

  return (
    <div className="pagination" data-cy="pagination">
      <div className="pagination__item">
        <Link
          data-cy="paginationLeft"
          className={cn('pagination__link pagination__link--prev', {
            'pagination__link--disabled': currentPageIsFirst,
          })}
          to={{
            search: getSearchWith(
              { page: `${currentPage - 1 || 1}` },
              searchParams,
            ),
          }}
          aria-disabled={currentPageIsFirst}
        />
      </div>

      <ul className="pagination__list">
        {pages.map(page => (
          <li key={page} className="pagination__item">
            <Link
              className={cn('pagination__link', {
                'pagination__link--active': page === currentPage,
              })}
              to={{
                search: getSearchWith({ page }, searchParams),
              }}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination__item">
        <Link
          data-cy="paginationRight"
          className={cn('pagination__link pagination__link--next', {
            'pagination__link--disabled': currentPageIsLast,
          })}
          to={{
            search: getSearchWith(
              {
                page: `${currentPage + 1 <= lastPage ? currentPage + 1 : lastPage}`,
              },
              searchParams,
            ),
          }}
          aria-disabled={currentPageIsLast}
        />
      </div>
    </div>
  );
};
