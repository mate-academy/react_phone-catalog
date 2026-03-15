import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.arrowButtons}>
        <button
          className={`${styles.arrowButton} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          aria-label="Previous Page"
        >
          &lt;
        </button>
      </div>

      <div className={styles.pageNumbers}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.active : ''
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className={styles.arrowButtons}>
        <button
          className={`${styles.arrowButton} ${
            currentPage === totalPages ? styles.disabled : ''
          }`}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          aria-label="Next Page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
