import React from 'react';
import './Pagination.scss';

type Props = {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
};

export const Pagination: React.FC<Props> = ({ page, totalPages, onChange }) => {
  const makePages = () => {
    const pages: (number | 'dots')[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push('dots');
    }

    for (let p = page - 1; p <= page + 1; p++) {
      if (p > 1 && p < totalPages) {
        pages.push(p);
      }
    }

    if (page < totalPages - 2) {
      pages.push('dots');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <img src={`img/icons/left.svg`} alt="prev" />
      </button>

      {makePages().map((p, i) =>
        p === 'dots' ? (
          <span key={i} className="pagination__dots">
            …
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onChange(p)}
            className={`pagination__page ${page === p ? 'active' : ''}`}
          >
            {p}
          </button>
        ),
      )}

      <button
        className="pagination__btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        <img src={`img/icons/right.svg`} alt="prev" />
      </button>
    </div>
  );
};
