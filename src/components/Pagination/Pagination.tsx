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
  let start = Math.max(page - Math.floor(maxVisible / 2), 1);
  let end = start + maxVisible;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(totalPages - maxVisible, 1);
  }

  start = Math.max(start, 1);
  const visiblePageNumbers = pageNumbers.slice(start, end);

  const handlePageChange = (num: number) => {
    onPageChange(num);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
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
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className="pagination__arrow"
        onClick={() => handlePageChange(Math.min(page + 1, totalPages - 1))}
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
