import React, { memo } from 'react';
import classNames from 'classnames';

import { getNumbers } from '../../utils/helpers';

import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = memo(
  ({ total, perPage, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(total / perPage);

    const pages = getNumbers(1, pagesCount);

    return (
      <nav className="Pagination" data-cy="pagination">
        <button
          type="button"
          className={classNames('Pagination__button Pagination__button--prev', {
            'Pagination__button--disabled': currentPage === 1,
          })}
          aria-label="Prev slide"
          onClick={() => onPageChange(currentPage - 1)}
          data-cy="paginationLeft"
        >
          <i className="fas fa-chevron-left Pagination__chevron" />
        </button>
        <ul className="Pagination__list">
          {pages.map(pageNumber => (
            <li key={pageNumber}>
              <button
                type="button"
                className={classNames('Pagination__button', {
                  'Pagination__button--active': pageNumber === currentPage,
                })}
                onClick={() => {
                  if (pageNumber !== currentPage) {
                    onPageChange(pageNumber);
                  }
                }}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={classNames('Pagination__button Pagination__button--next', {
            'Pagination__button--disabled': currentPage === pagesCount,
          })}
          aria-label="Next slide"
          onClick={() => onPageChange(currentPage + 1)}
          data-cy="paginationRight"
        >
          <i className="fas fa-chevron-right Pagination__chevron" />
        </button>
      </nav>
    );
  },
);
