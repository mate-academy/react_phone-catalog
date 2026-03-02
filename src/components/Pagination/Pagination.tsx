import React from 'react';
import cn from 'classnames';
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
  if (perPage <= 0) {
    return null;
  }

  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <img src="/img/icons/arrow-left.svg" alt="" aria-hidden="true" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={cn(styles.button, {
            [styles.buttonActive]: currentPage === page,
          })}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          <span className={styles.pageNumber}>{page}</span>
        </button>
      ))}

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <img src="/img/icons/arrow-right.svg" alt="" aria-hidden="true" />
      </button>
    </div>
  );
};
