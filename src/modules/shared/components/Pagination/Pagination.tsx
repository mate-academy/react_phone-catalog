import React from 'react';
import classNames from 'classnames';
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
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={styles.pagination}
      aria-label="Pagination"
      data-cy="pagination"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.button}
        aria-label="Previous page"
        data-cy="paginationLeft"
      >
        <i className="fas fa-chevron-left" />
      </button>

      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`dots-${idx}`} className={styles.dots}>
              ...
            </span>
          );
        }

        const pageNum = Number(p);

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={classNames(styles.button, {
              [styles.active]: currentPage === pageNum,
            })}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.button}
        aria-label="Next page"
        data-cy="paginationRight"
      >
        <i className="fas fa-chevron-right" />
      </button>
    </nav>
  );
};
