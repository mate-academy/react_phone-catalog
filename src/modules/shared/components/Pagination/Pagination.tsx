import styles from './Pagination.module.scss';
import React, { useMemo } from 'react';

type Props = {
  currentPage: number;
  perPage: number | 'all';
  totalItems: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  perPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = useMemo(() => {
    if (perPage === 'all' || perPage === 0) {
      return 1;
    }

    return Math.ceil(totalItems / perPage);
  }, [totalItems, perPage]);

  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage === 0) {
      startPage = 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  }, [totalPages, currentPage]);

  return (
    <div>
      <div className={styles.pagination}>
        <button
          className={styles.paginationButtonArrow}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src="./img/icons/left.svg" alt="" className={styles.arrow} />
        </button>

        {pageNumbers.map(num => (
          <button
            key={num}
            className={`${styles.paginationButton} ${currentPage === num ? styles.activePage : ''}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}

        <button
          className={styles.paginationButtonArrow}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src="./img/icons/right.svg" alt="" className={styles.arrow} />
        </button>
      </div>
    </div>
  );
};
