import React from 'react';

import styles from './Pagination.module.scss';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | string)[] = [];

  items.push(1);

  let rangeStart = 2;

  if (currentPage > 3) {
    rangeStart = currentPage - 1;

    if (rangeStart < 3) {
      rangeStart = 3;
    }
  }

  let rangeEnd = totalPages - 1;

  if (totalPages - currentPage > 2) {
    rangeEnd = currentPage + 1;

    if (rangeEnd > totalPages - 2) {
      rangeEnd = totalPages - 2;
    }
  }

  if (rangeStart > 2) {
    items.push('...');
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    items.push(i);
  }

  if (rangeEnd < totalPages - 1) {
    items.push('...');
  }

  items.push(totalPages);

  return items;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      className={styles.pagination}
      aria-label="Pagination"
      data-testid="pagination"
    >
      <button
        type="button"
        className={`${styles.item} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>

      {pageItems.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <span
              key={`dots-${index}`}
              className={`${styles.item} ${styles.dots}`}
            >
              {item}
            </span>
          );
        }

        return (
          <button
            key={item}
            type="button"
            className={`${styles.item} ${currentPage === item ? styles.active : ''}`}
            onClick={() => onPageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={currentPage === item ? 'page' : undefined}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        className={`${styles.item} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
    </nav>
  );
};
