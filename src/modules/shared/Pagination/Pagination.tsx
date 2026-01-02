import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const VISIBLE_PAGES = 4;
  const pagesNum = Math.ceil(total / perPage);

  if (pagesNum <= 1) {
    return null;
  }

  let startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));

  let endPage = startPage + VISIBLE_PAGES - 1;

  if (endPage > pagesNum) {
    endPage = pagesNum;
    startPage = Math.max(1, endPage - VISIBLE_PAGES + 1);
  }

  const pages = getNumbers(startPage, endPage);

  return (
    <div className={styles.pagination}>
      {/* PREV */}
      <button
        className={styles.pagination__arrow}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {/* PAGES */}
      {pages.map(page => (
        <button
          key={page}
          className={`pagination__page ${
            page === currentPage ? 'pagination__page--active' : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* NEXT */}
      <button
        className={styles.pagination__arrow}
        disabled={currentPage === pagesNum}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
};
