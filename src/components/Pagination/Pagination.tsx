import React from 'react';
import './Pagination.scss';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: string) => void;
};

export const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
  onPerPageChange,
}) => {

  const goTo = (p: number) =>
    onPageChange(Math.min(Math.max(1, p), totalPages));

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="arrow">
      <button
        className="arrow__button"
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        <img
          className="arrow__image"
          src="/img/icons/arrow-left.svg"
          alt="arrow left"
        />
      </button>

      <div className="pagination__pages">
        {pageNumbers.map(num => (
          <button
            key={num}
            className={`page-button ${page === num ? 'active' : ''}`}
            onClick={() => onPageChange(num)}
          >
            {num + 1}
          </button>
        ))}
      </div>

      <button
        className="arrow__button"
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
      >
        <img
          className="arrow__image"
          src="/img/icons/arrow-right.svg"
          alt="arrow right"
        />
      </button>
    </div>
  );
};
