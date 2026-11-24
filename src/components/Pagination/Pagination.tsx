import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
  const visiblePages = pages.slice(start - 1, start + 3);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={`${styles.pagination__button} ${styles.pagination__arrowButton}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          src={
            currentPage === 1
              ? 'images/icons/arrow-left-disabled.png'
              : 'images/icons/arrow-left.png'
          }
          alt="Previous"
          className={styles.pagination__arrow}
        />
      </button>
      {visiblePages.map(page => (
        <button
          key={page}
          type="button"
          className={
            page === currentPage
              ? `${styles.pagination__button} ${styles.pagination__buttonActive}`
              : styles.pagination__button
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={`${styles.pagination__button} ${styles.pagination__arrowButton}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img
          src={
            currentPage === totalPages
              ? 'images/icons/arrow-breadcrumbs.png'
              : 'images/icons/arrow-right.png'
          }
          alt="Next"
          className={styles.pagination__arrow}
        />
      </button>
    </div>
  );
};
