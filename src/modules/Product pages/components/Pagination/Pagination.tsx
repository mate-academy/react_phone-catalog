import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

function getVisiblePages(totalPages: number, currentPage: number): number[] {
  if (totalPages <= 7) {
    return getNumbers(1, totalPages);
  }

  if (currentPage <= 4) {
    return [...getNumbers(1, 6), -1, totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, -1, ...getNumbers(totalPages - 5, totalPages)];
  }

  return [
    1,
    -1,
    ...getNumbers(currentPage - 1, currentPage + 1),
    -1,
    totalPages,
  ];
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const amountOfPages: number = Math.ceil(total / perPage);
  const visiblePages: number[] = getVisiblePages(amountOfPages, currentPage);

  return (
    <div className="pagination">
      <div
        className={`pagination--left pagination__block ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={
          currentPage > 1 ? () => onPageChange(currentPage - 1) : undefined
        }
      >
        <img
          src="../../../img/slider/svg/chevron (arrow left).svg"
          alt="chevron"
        />
      </div>

      {visiblePages.map((item, index) =>
        item === -1
          ? (
            <span key={`ellipsis-${index}`} className="pagination__ellipsis">...</span>
          ) : (
          <div
            key={item}
            className={`pagination--number pagination__block ${currentPage === item ? 'pagination__active' : ''}`}
            onClick={() => onPageChange(item)}
          >
            <span>{item}</span>
          </div>
        ),
      )}
      <div
        className={`pagination--right pagination__block ${currentPage === amountOfPages ? 'disabled' : ''}`}
        onClick={
          currentPage < amountOfPages
            ? () => onPageChange(currentPage + 1)
            : undefined
        }
      >
        <img
          src="../../../img/slider/svg/chevron (arrow right).svg"
          alt="chevron"
        />
      </div>
    </div>
  );
};
