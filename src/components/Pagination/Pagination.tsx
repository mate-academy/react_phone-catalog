import React from 'react';
import { Icon } from '../Icon';
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
  const pageCount = Math.ceil(total / perPage);

  if (pageCount <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const maxVisible = 4;

    if (pageCount <= maxVisible) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    let start = currentPage - 1;
    let end = currentPage + 2;

    if (start < 1) {
      start = 1;
      end = maxVisible;
    }

    if (end > pageCount) {
      end = pageCount;
      start = pageCount - maxVisible + 1;
    }

    const visiblePages = [];

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const pages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.arrow}
        disabled={currentPage === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="chevron-left" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={`${styles.item} ${page === currentPage ? styles.active : ''}`}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={styles.arrow}
        disabled={currentPage === pageCount}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="chevron-right" />
      </button>
    </div>
  );
};
