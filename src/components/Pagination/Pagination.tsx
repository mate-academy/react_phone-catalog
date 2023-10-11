import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { getNumbers } from '../../helpers/getNumbers';
import { getSearchWith } from '../../helpers/searchHelper';

import './Pagination.scss';
import { handleBackToTop } from '../../helpers/handleToUp';

type Props = {
  totalItems: number,
  currentPage: number,
  perPageLength: number,
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  currentPage,
  perPageLength,
}) => {
  const [searchParams] = useSearchParams();

  const totalPages = Math.ceil(totalItems / perPageLength);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  let startPage = Math.max(1, currentPage - 2);

  const endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pageLength = getNumbers(startPage, endPage);

  return (
    <div className="pagination">
      <Link
        aria-disabled={isFirstPage}
        className={classNames('pagination--button', 'pagination--button-left', {
          'pagination--button-disabled': isFirstPage,
        })}
        to={{
          search: getSearchWith(
            searchParams,
            { page: (currentPage - 1).toString() },
          ),
        }}
        onClick={handleBackToTop}
      />

      <ul className="pagination__list">
        {startPage > 1 && (
          <li className="pagination--item">
            <Link
              className="pagination--link"
              onClick={handleBackToTop}
              to={{
                search: getSearchWith(
                  searchParams,
                  { page: '1' },
                ),
              }}
            >
              1
            </Link>
          </li>
        )}

        {startPage > 2 && (
          <li className="pagination--item">
            <span className="pagination--break">...</span>
          </li>
        )}

        {pageLength.map(pageNumber => (
          <li
            className={classNames('pagination--item', {
              'pagination--item-active': currentPage === pageNumber,
            })}
            key={pageNumber}
          >
            <Link
              onClick={handleBackToTop}
              className={classNames('pagination--link', {
                'pagination--link-active': currentPage === pageNumber,
              })}
              to={{
                search: getSearchWith(
                  searchParams,
                  { page: pageNumber.toString() },
                ),
              }}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        {endPage < totalPages - 1 && (
          <li className="pagination--item">
            <span className="pagination__break">...</span>
          </li>
        )}

        {endPage < totalPages && (
          <li className="pagination--item">
            <Link
              onClick={handleBackToTop}
              className="pagination--link"
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
        onClick={handleBackToTop}
        aria-disabled={isLastPage}
        className={classNames('pagination--button',
          'pagination--button-right', {
            'pagination--button-disabled': isLastPage,
          })}
        to={{
          search: getSearchWith(
            searchParams,
            { page: (currentPage + 1).toString() },
          ),
        }}
      />
    </div>
  );
};
