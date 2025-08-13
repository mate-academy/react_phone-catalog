import React from 'react';
import './Pagination.scss';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const maxVisible = 8;
  let start = Math.max(page - Math.floor(maxVisible / 2), 0);
  let end = start + maxVisible;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(totalPages - maxVisible, 0);
  }

  start = Math.max(start, 0);
  const visiblePageNumbers = pageNumbers.slice(start, end);

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        <img
          className="pagination__arrow-image"
          src="/img/icons/arrow-left.svg"
          alt="arrow left"
        />
      </button>

      <div className="pagination__pages">
        {visiblePageNumbers.map(num => (
          <button
            key={num}
            className={`pagination__pages__page-button ${page === num ? 'active' : ''}`}
            onClick={() => onPageChange(num)}
          >
            {num + 1}
          </button>
        ))}
      </div>

      <button
        className="pagination__arrow"
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
      >
        <img
          className="pagination__arrow-image"
          src="/img/icons/arrow-right.svg"
          alt="arrow right"
        />
      </button>
    </div>
  );
};
