import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, totalPages, onPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', page, '...', totalPages];
  };

  const pages = getPages();

  return (
    <nav className={styles.pagination} aria-label="pagination">
      <button
        className={styles.pagination__arrow}
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
        aria-label="Previous"
      >
        <img src="/public/icons/Chevron (Arrow Left).svg" alt="left" />
      </button>
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={`page-${p}`}
            className={
              p === page
                ? `${styles.pagination__page} ${styles['pagination__page--active']}`
                : styles.pagination__page
            }
            onClick={() => onPage(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${i}`} className={styles.pagination__ellipsis}>
            ...
          </span>
        ),
      )}
      <button
        className={styles.pagination__arrow}
        onClick={() => onPage(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next"
      >
        <img src="/public/icons/Chevron (Arrow Right).svg" alt="left" />
      </button>
    </nav>
  );
};
