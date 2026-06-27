import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__btn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="/icons/arrow-left.svg" alt="Prev" />
      </button>

      <div className={styles.pagination__pages}>
        {pages.map(page => {
          const pageClass = `${styles.pagination__page} ${
            page === currentPage ? styles['pagination__page--active'] : ''
          }`;

          return (
            <button
              key={page}
              className={pageClass}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={styles.pagination__btn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="/icons/arrow-right.svg" alt="Next" />
      </button>
    </div>
  );
};
