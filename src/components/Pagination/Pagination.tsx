import React from 'react';
import styles from './Pagination.module.scss';
type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ page, totalPages, onChange }) => {
  const pages = [];
  const visiblePages = 4;
  let startPage = Math.max(1, page - visiblePages + 1);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        disabled={page === 1}
        className={`${styles.pagination__btns} ${page === 1 ? styles.pagination__btnsDisable : ''}`}
        onClick={() => onChange(page - 1)}
      >
        <img src="./img/icons/arrowLeftBtn.svg" alt="" />
      </button>
      {pages.map(p => (
        <button
          key={p}
          className={`${styles.pagination__btnNumber} ${
            page === p ? styles.pagination__btnActive : ''
          }`}
          disabled={p === page}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className={`${styles.pagination__btns} ${page === totalPages ? styles.pagination__btnsDisable : ''}`}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        <img src="./img/icons/arrowRightBtn.svg" alt="" />
      </button>
    </div>
  );
};
