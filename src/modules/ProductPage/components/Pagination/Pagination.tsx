import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const VISIBLE_PAGES = 4;
  const currentBlock = Math.ceil(currentPage / VISIBLE_PAGES);
  const startPage = (currentBlock - 1) * VISIBLE_PAGES + 1;
  const endPage = Math.min(startPage + VISIBLE_PAGES - 1, totalPages);

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles['arrow-button']}
      >
        &lt;
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`${styles['page-button']} ${page === currentPage ? styles.active : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles['arrow-button']}
      >
        &gt;
      </button>
    </div>
  );
};
