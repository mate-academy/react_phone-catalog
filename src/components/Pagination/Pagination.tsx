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

  const getPages = () => {
    const pages: (number | string)[] = [];

    const left = Math.max(1, currentPage - 2);
    const right = Math.min(totalPages, currentPage + 2);

    if (left > 1) {
      pages.push(1);
    }

    if (left > 2) {
      pages.push('...');
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push('...');
    }

    if (right < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        {'<'}
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={`${page}-${index}`}
            className={classNames(styles.button, {
              [styles.isActive]: page === currentPage,
            })}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        {'>'}
      </button>
    </div>
  );
};
