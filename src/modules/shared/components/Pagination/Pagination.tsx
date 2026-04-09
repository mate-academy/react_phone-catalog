import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  visiblePages: number[];
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        <img
          src={
            currentPage === 1
              ? '/img/icon/arrow-left-disabled.svg'
              : '/img/icon/chevron-arrow-left.svg'
          }
          alt="Previous page"
        />
      </button>

      <div className={styles.pageList}>
        {visiblePages.map(page => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ''
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        <img
          src={
            currentPage === totalPages
              ? '/img/icon/arrow-right-disabled.svg'
              : '/img/icon/chevron-arrow-right.svg'
          }
          alt="Previous page"
        />
      </button>
    </div>
  );
};
