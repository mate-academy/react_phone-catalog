import React, { useMemo } from 'react';
import cn from 'classnames';

import { ChevronIcon } from '../iconsSVG';
import styles from './Pagination.module.scss';

type PageItem = number | 'ellipsis';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
}

const buildPages = (current: number, total: number, maxVisible: number): PageItem[] => {
  const maxPages = Math.max(3, Math.min(maxVisible, total));
  const half = Math.floor(maxPages / 2);

  if (total <= maxPages) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  let start = Math.max(1, current - half);
  let end = start + maxPages - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - maxPages + 1);
  }

  const pages: PageItem[] = [];

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push('ellipsis');
    }
  }

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (end < total) {
    if (end < total - 1) {
      pages.push('ellipsis');
    }

    pages.push(total);
  }

  return pages;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className,
}) => {
  const pages = useMemo(
    () => buildPages(page, totalPages, maxVisible),
    [maxVisible, page, totalPages],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={cn(styles.pagination, className)} aria-label="Pagination">
      <button
        type="button"
        className={cn(styles.pagination__button, styles['pagination__button--prev'])}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronIcon direction="right" />
      </button>

      <div className={styles.pagination__pages}>
        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className={styles.pagination__ellipsis}
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={cn(styles.pagination__button, {
                [styles['pagination__button--active']]: item === page,
              })}
              onClick={() => onPageChange(item)}
              aria-current={item === page ? 'page' : undefined}
              aria-label={item === page ? `Page ${item}, current page` : `Go to page ${item}`}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className={cn(styles.pagination__button, styles['pagination__button--next'])}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronIcon direction="left" />
      </button>
    </nav>
  );
};
