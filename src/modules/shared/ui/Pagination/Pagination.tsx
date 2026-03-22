import React from 'react';
import cn from 'classnames';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';
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
  // --- CALCULATIONS ---
  // Determine total number of pages based on total items and items per page
  const totalPages = Math.ceil(total / perPage);

  // Do not render pagination if there is only one page or no items
  if (totalPages <= 1) {
    return null;
  }

  // --- SLIDING WINDOW LOGIC ---
  // Calculates which page numbers should be visible to the user.
  // This prevents the pagination bar from becoming too long on large datasets.
  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
    const endPage = Math.min(totalPages, startPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className={styles.pagination}>
      <li className={styles.item}>
        <button
          type="button"
          className={cn(styles.button, styles.arrow)}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft />
        </button>
      </li>

      {visiblePages.map(page => (
        <li key={page} className={styles.item}>
          <button
            type="button"
            className={cn(styles.button, {
              [styles['button--active']]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className={styles.item}>
        <button
          type="button"
          className={cn(styles.button, styles.arrow)}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight />
        </button>
      </li>
    </ul>
  );
};
