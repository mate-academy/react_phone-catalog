import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import './pagination.scss';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (n: number) => void;
};

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / +perPage));
  let visiblePages;

  if (pages.length <= 5) {
    visiblePages = pages;
  } else if (currentPage < 3) {
    visiblePages = [...pages.slice(0, 3), ...pages.slice(-1)];
  } else if (currentPage > pages.length - 2) {
    visiblePages = [...pages.slice(0, 1), ...pages.slice(-3)];
  } else {
    visiblePages = [
      ...pages.slice(0, 1),
      ...pages.slice(currentPage - 2, currentPage + 1),
      ...pages.slice(-1),
    ];
  }

  const isNextDisabled = currentPage === pages.length;
  const isPrevDisabled = currentPage === 1;

  const handlePrevChange = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextChange = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <div className="pagination__content">
        <button
          type="button"
          className="pagination__button"
          disabled={isPrevDisabled}
          onClick={handlePrevChange}
          data-cy="paginationLeft"
        >
          <ReactSVG src="img/icons/ArrowLeft.svg" />
        </button>

        <div className="pagination__pages">
          {visiblePages.map((page) => (
            <React.Fragment key={page}>
              {page === pages.length
                && currentPage < pages.length - 2
                && pages.length > 5
                && (
                  <span className="pagination__dots">...</span>
                )}

              <button
                type="button"
                key={page}
                className={classNames('pagination__page', {
                  'pagination__page--active': page === currentPage,
                })}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>

              {page === 1
                && currentPage > 3
                && pages.length > 5
                && (
                  <span className="pagination__dots">...</span>
                )}
            </React.Fragment>
          ))}
        </div>

        <button
          type="button"
          className="pagination__button"
          disabled={isNextDisabled}
          onClick={handleNextChange}
          data-cy="paginationRight"
        >
          <ReactSVG src="img/icons/ArrowRight.svg" />
        </button>
      </div>
    </div>
  );
};
