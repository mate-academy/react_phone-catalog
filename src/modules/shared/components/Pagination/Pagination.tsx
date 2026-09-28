import React from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ELLIPSIS = '…';

function getCompactPages(
  currentPage: number,
  pageCount: number,
): (number | typeof ELLIPSIS)[] {
  const siblings = 1;
  const range = new Set<number>([
    1,
    pageCount,
    currentPage,
    ...Array.from(
      { length: siblings * 2 },
      (_, i) => currentPage - siblings + i,
    ),
  ]);

  const pages = Array.from(range)
    .filter(page => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b);

  const result: (number | typeof ELLIPSIS)[] = [];

  pages.forEach((page, index) => {
    if (index === 0) {
      result.push(page);

      return;
    }

    const prev = pages[index - 1];

    if (page - prev === 2) {
      result.push(prev + 1);
    } else if (page - prev > 2) {
      result.push(ELLIPSIS);
    }

    result.push(page);
  });

  return result;
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

  const pages = getCompactPages(currentPage, pageCount);

  return (
    <nav className={styles.wrapper} aria-label="Pagination">
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="chevron-left" />
      </button>

      {pages.map((page, index) =>
        page === ELLIPSIS ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            {ELLIPSIS}
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={cn(styles.page, {
              [styles.active]: page === currentPage,
            })}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === pageCount}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  );
};
