import React from 'react';
import cn from 'classnames';

import { getNumbers } from '../../helpers/commonHelper';

import './Pagination.scss';

type Props = {
  total: number,
  perPage?: number,
  crntPage?: number,
  onPageChange?: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 4,
  crntPage = 1,
  onPageChange = () => { },
}) => {
  if (perPage <= 0 || crntPage <= 0) {
    throw new Error("can't be 'perPage <= 0 || crntPage <= 0'");
  }

  const pageNumbers
    = getNumbers(1, Math.ceil(total / perPage));
  const isFirst: boolean
    = crntPage === pageNumbers[0];
  const isLast: boolean
    = crntPage === pageNumbers[pageNumbers.length - 1];

  return (
    <div className="Pagination Pagination__container" data-cy="pagination">
      <button
        data-cy="paginationLeft"
        type="button"
        aria-label="paginationLeft"
        className={cn('ProductsSlider__button', {
          'ProductsSlider__button--defualt': !isFirst,
          'ProductsSlider__button--disabled': isFirst,
        })}
        disabled={isFirst}
        onClick={() => isFirst || onPageChange(crntPage - 1)}
      >
        <i className="Pagination__icon icon--arrow-left" />
      </button>

      <div className="Pagination__pages">
        {pageNumbers.map((pageNumber: number) => (
          <button
            type="button"
            key={pageNumber}
            className={cn(
              'Pagination__button',
              { 'Pagination__button--active': pageNumber === crntPage },
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        data-cy="paginationRight"
        type="button"
        aria-label="paginationRight"
        className={cn('ProductsSlider__button', {
          'ProductsSlider__button--defualt': !isLast,
          'ProductsSlider__button--disabled': isLast,
        })}
        disabled={isLast}
        onClick={() => isLast || onPageChange(crntPage + 1)}
      >
        <i className="Pagination__icon icon--arrow-right" />
      </button>
    </div>
  );
};
