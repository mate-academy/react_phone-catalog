import styles from './Pagination.module.scss';
import React from 'react';

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
  const pageSize = 4;
  const pageStart = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const pageEnd = Math.min(pageStart + pageSize - 1, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {[...Array(pageEnd - pageStart + 1)].map((_, i) => {
        const pageNum = pageStart + i;

        return (
          <button
            key={pageNum}
            className={currentPage === pageNum ? styles.activePage : ''}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};
