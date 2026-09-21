import React from 'react';
import styles from './Pagination.module.scss';

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
  const pageCount = Math.ceil(total / perPage);

  if (pageCount <= 1) {
    return null;
  }

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i = i + 1) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(pageCount - 1, currentPage + 1);

    for (let i = start; i <= end; i = i + 1) {
      pages.push(i);
    }

    if (currentPage < pageCount - 2) {
      pages.push('...');
    }

    pages.push(pageCount);

    return pages;
  };

  const pages = getPages();

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.button}
        aria-label="Previous page"
      >
        ‹
      </button>

      <div className={styles.pagesList}>
        {pages.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`${styles.pageItem} ${currentPage === page ? styles.active : ''}`}
            >
              {page}
            </button>
          ) : (
            <span key={`dots-${idx}`} className={styles.dots}>
              {page}
            </span>
          ),
        )}
      </div>

      <button
        type="button"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.button}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
};
