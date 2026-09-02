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

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/arrow-left.svg`}
          alt="Left"
        />
      </button>

      <div className={styles.pages}>
        {pages.map(page => (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/arrow-right.svg`}
          alt="Right"
        />
      </button>
    </div>
  );
};
