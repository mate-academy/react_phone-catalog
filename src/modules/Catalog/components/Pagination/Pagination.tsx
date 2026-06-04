import React from 'react';
import classNames from 'classnames';

import styles from './Pagination.module.scss';

interface PaginationProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  onPageChange,
  className,
}) => {
  if (total <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  const goToPage = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={classNames(styles.pagination, className)}>
      <button
        className={classNames(styles.arrow, {
          [styles.disabled]: current === 1,
        })}
        onClick={() => goToPage(current - 1)}
        disabled={current === 1}
      >
        {'<'}
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          className={classNames(styles.page, {
            [styles.active]: page === current,
            [styles.dots]: page === '...',
          })}
          onClick={() => typeof page === 'number' && goToPage(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(styles.arrow, {
          [styles.disabled]: current === total,
        })}
        onClick={() => goToPage(current + 1)}
        disabled={current === total}
      >
        {'>'}
      </button>
    </div>
  );
};
