import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(total / perPage);

  if (pagesCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="icons/arrow-left-dark.svg" alt="Previous page" />
      </button>

      <div className={styles.pages}>
        {pages.map(page => (
          <button
            key={page}
            type="button"
            className={
              page === currentPage
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === pagesCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="icons/arrow-right-dark.svg" alt="Next page" />
      </button>
    </div>
  );
};
