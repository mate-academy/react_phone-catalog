import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="img/icons/arrow-left.svg" alt="left" />
      </button>

      <div className={styles.pages}>
        {visiblePages.map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={page === currentPage ? styles.pageActive : styles.page}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className={styles.btn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="img/icons/arrow-right.svg" alt="right" />
      </button>
    </div>
  );
};
