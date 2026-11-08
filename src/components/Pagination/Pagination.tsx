import React from 'react';
import './Pagination.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <ul className="pagination">
      <li>
        <button
          type="button"
          className="pagination__button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </button>
      </li>

      {getPageNumbers().map((page, index) => (
        <li key={index}>
          {page === '...' ? (
            <span className="pagination__dots">...</span>
          ) : (
            <button
              type="button"
              className={`pagination__button ${currentPage === page ? 'is-active' : ''}`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </button>
          )}
        </li>
      ))}

      <li>
        <button
          type="button"
          className="pagination__button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};
