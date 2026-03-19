import React from 'react';
import styles from './Pagination.module.scss';
import icons from '../../../assets/icons/icons.svg';

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
  const pageNumbers = React.useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  if (totalPages <= 0) return null;

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
          <svg className={styles.icon}>
            <use href={`${icons}#arrow-left-icon`}></use>
          </svg>
        </button>
      </div>

      <div className={styles.pageNumbers}>
        {pageNumbers.map(page => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
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
          <svg className={styles.icon}>
            <use href={`${icons}#arrow-right-icon`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
