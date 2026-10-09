import React from 'react';
import { getPaginationRange } from './getPaginationRange';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const paginationRange = getPaginationRange(currentPage, totalPages);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <button
          type="button"
          className="pagination__button pagination__button--prev"
          disabled={currentPage === 1}
          onClick={handlePrev}
          aria-label="Previous page"
        >
          &lt;
        </button>
      </li>

      {paginationRange.map((page, index) => {
        if (page === '...') {
          return (
            <li
              key={`dots-${index}`}
              className="pagination__item pagination__dots"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li key={page} className="pagination__item">
            <button
              type="button"
              className={`pagination__button ${
                page === currentPage ? 'pagination__button--active' : ''
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        );
      })}

      <li className="pagination__item">
        <button
          type="button"
          className="pagination__button pagination__button--next"
          disabled={currentPage === totalPages}
          onClick={handleNext}
          aria-label="Next page"
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};
