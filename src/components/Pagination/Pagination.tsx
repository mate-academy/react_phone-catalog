import './Pagination.scss';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers } from './getNumbers';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  totalItems: number,
  perPage: number,
  currentPage: number
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();

  const totalPages = Math.ceil(totalItems / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pageNumbers = getNumbers(startPage, endPage);

  return (
    <div className="pagination">
      <Link
        className={classNames('pagination__button', 'pagination__button-left', {
          'pagination__button-left--disabled': isFirstPage,
        })}
        data-cy="paginationLeft"
        to={{
          search: getSearchWith(
            searchParams,
            { page: (currentPage - 1).toString() },
          ),
        }}
        aria-disabled={isFirstPage}
      />

      <ul className="pagination__list">
        {startPage > 1 && (
          <li className="pagination__item">
            <Link
              className="pagination__link"
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
          <li className="pagination__item">
            <span className="pagination__break">...</span>
          </li>
        )}

        {pageNumbers.map(pageNumber => (
          <li
            className={classNames('pagination__item', {
              'pagination__item--active': currentPage === pageNumber,
            })}
            key={pageNumber}
          >
            <Link
              className="pagination__link"
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
          <li className="pagination__item">
            <span className="pagination__break">...</span>
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
        className={classNames('pagination__button',
          'pagination__button-right',
          { 'pagination__button-right--disabled': isLastPage })}
        data-cy="paginationRight"
        to={{
          search: getSearchWith(
            searchParams,
            { page: (currentPage + 1).toString() },
          ),
        }}
        aria-disabled={isLastPage}
      />
    </div>
  );
};
