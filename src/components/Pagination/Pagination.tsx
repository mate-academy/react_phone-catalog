import React from 'react';
import styles from './Pagination.module.scss';
import { PerPageOptions } from '../../utils/PerPageOptions';

type Props = {
  total: number;
  perPage: PerPageOptions;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ total, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / +perPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const range = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages.map((page, index) => (
      <button
        key={typeof page === 'number' ? page : `ellipsis-${index}`}
        onClick={() => handlePageChange(+page)}
        className={`${styles.paginationButton} ${currentPage === page ? styles.isActive : ''}`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <button
          className={`${styles.paginationButton} ${styles.paginationArrows} ${styles.paginationLeftArrow}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        ></button>

        {renderPageNumbers()}

        <button
          className={`${styles.paginationButton} ${styles.paginationArrows} ${styles.paginationRightArrow}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        ></button>
      </div>
    </div>
  );
};
