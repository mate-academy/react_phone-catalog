/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { getNumbers } from '../utils/getNumbers';

import '../styles/Pagination.scss';

interface Props {
  productsCount: number;
}

export const Pagination: React.FC<Props> = ({ productsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 8);

  const pages = getNumbers(1, Math.ceil(productsCount / perPage));

  const isFirstPage = page === 1;
  const isLastPage = page === pages[pages.length - 1];

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== page) {
      setSearchParams(
        getSearchWith(searchParams, { page: pageNumber.toString() }),
      );
    }
  };

  const moveLeft = (value: number) => {
    handlePageChange(value - 1);
  };

  const moveRight = (value: number) => {
    handlePageChange(value + 1);
  };

  return (
    <div className="pagination" data-cy="pagination">
      <button
        type="button"
        className={cn('pagination__button pagination__button--left', {
          'pagination__button--disabled-left': isFirstPage,
        })}
        onClick={() => moveLeft(page)}
        disabled={isFirstPage}
      />

      <ul className="pagination__pages-list">
        {pages.map(pageNum => (
          <li className="pagination__pages-item" key={pageNum}>
            <button
              type="button"
              className={cn('pagination__button', {
                'pagination__button--active': page === pageNum,
              })}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn('pagination__button pagination__button--right', {
          'pagination__button--disabled-right': isLastPage,
        })}
        onClick={() => moveRight(page)}
        disabled={isLastPage}
      />

    </div>
  );
};
