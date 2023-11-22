import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import { getNumbers } from '../../helpers/getNumbers';
import { Icon } from '../Icon/Icon';

import './Pagination.scss';

type Props = {
  currentPage: string,
  totalPages: number,
};

export const Pagination: FC<Props> = ({ currentPage, totalPages }) => {
  const [searchParams] = useSearchParams();
  const isFirstPage = +currentPage === 1;
  const isLastPage = +currentPage === totalPages;

  let startPage = Math.max(1, +currentPage - 1);
  const endPage = Math.min(startPage + 2, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 2);
  }

  const pageNumbers = getNumbers(startPage, endPage);

  return (
    <div data-cy="pagination" className="pagination">
      <Link
        data-cy="paginationLeft"
        className={classNames('pagination__button', {
          'pagination__button--disabled': isFirstPage,
        })}
        to={{
          search: getSearchWith(searchParams, { page: `${+currentPage - 1}` }),
        }}
        aria-disabled={isFirstPage ? 'true' : 'false'}
      >
        <Icon type={isFirstPage ? 'arrow-left-disabled' : 'arrow-left'} />
      </Link>

      <ul className="pagination__list">
        {startPage > 1 && (
          <li className="pagination__item">
            <Link
              className="pagination__link"
              to={{
                search: getSearchWith(searchParams, { page: '1' }),
              }}
            >
              1
            </Link>
          </li>
        )}

        {startPage > 2 && (
          <li className="pagination__item">
            <span className="pagination__gap">...</span>
          </li>
        )}

        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className="pagination__item"
          >
            <Link
              className={classNames('pagination__link', {
                'pagination__link--active': pageNumber === currentPage,
              })}
              to={{
                search: getSearchWith(searchParams, { page: pageNumber }),
              }}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        {endPage < totalPages - 1 && (
          <li className="pagination__item">
            <span className="pagination__gap">...</span>
          </li>
        )}

        {endPage < totalPages && (
          <li className="pagination__item">
            <Link
              className="pagination__link"
              to={{
                search: getSearchWith(
                  searchParams,
                  { page: totalPages.toString() },
                ),
              }}
            >
              {totalPages}
            </Link>
          </li>
        )}
      </ul>

      <Link
        data-cy="paginationRight"
        className={classNames('pagination__button', {
          'pagination__button--disabled': isLastPage,
        })}
        to={{
          search: getSearchWith(searchParams, { page: `${+currentPage + 1}` }),
        }}
        aria-disabled={isLastPage ? 'true' : 'false'}
      >
        <Icon type={isLastPage ? 'arrow-right-disabled' : 'arrow-right'} />
      </Link>
    </div>
  );
};
