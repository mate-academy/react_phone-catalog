import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let i = from; i <= to; i += 1) {
    numbers.push(i);
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

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <div className="pagination__content">
        <button
          type="button"
          className="pagination__button"
          disabled={isPrevDisabled}
          onClick={handlePrevPage}
          data-cy="paginationLeft"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pagination__button--arrow"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826
              9.52868 3.52861L5.52868
              7.52861C5.26833 7.78896 5.26833 8.21107
              5.52868 8.47141L9.52868 12.4714C9.78903
              12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318
              11.789 10.4715
              11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107
               10.7318 3.78896 10.4715 3.52861Z"
              fill="black"
            />
          </svg>

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
          onClick={handleNextPage}
          data-cy="paginationRight"
        >
          <svg
            className="pagination__button--arrow"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.528636 0.528606C0.788986 0.268256 1.2111
              0.268256 1.47145 0.528606L5.47145 4.52861C5.73179
              4.78896 5.73179 5.21107 5.47145 5.47141L1.47145
              9.47141C1.2111 9.73176 0.788986 9.73176 0.528636
              9.47141C0.268287 9.21107 0.268287 8.78896 0.528636
               8.52861L4.05723 5.00001L0.528636 1.47141C0.268287
                1.21107 0.268287 0.788955 0.528636 0.528606Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
