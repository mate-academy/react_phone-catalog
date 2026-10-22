import React from 'react';
import styles from './Pagination.module.scss';
import {
  ELLIPSIS,
  MAX_WITHOUT_ELLIPSIS,
} from '../../../../constants/pagination-ellipsis';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const getPages = (current: number, total: number): (number | string)[] => {
  if (total <= MAX_WITHOUT_ELLIPSIS) {
    return range(1, total);
  }

  if (current <= 3) {
    return [...range(1, Math.max(3, current + 1)), ELLIPSIS, total];
  }

  if (current >= total - 2) {
    return [1, ELLIPSIS, ...range(Math.min(total - 2, current - 1), total)];
  }

  return [1, ELLIPSIS, current - 1, current, current + 1, ELLIPSIS, total];
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPages(currentPage, totalPages);

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

      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            {page}
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`${styles['page-button']} ${page === currentPage ? styles.active : ''}`}
          >
            {page}
          </button>
        ),
      )}

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
