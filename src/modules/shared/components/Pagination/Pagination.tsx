import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | '...';

const getVisiblePages = (current: number, total: number): PageItem[] => {
  if (total <= 5) {
    const pages: PageItem[] = [];

    for (let page = 1; page <= total; page += 1) {
      pages.push(page);
    }

    return pages;
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total];
  }

  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
};

export const Pagination: React.FC<Props> = ({
  total,
  current,
  onPageChange,
}) => {
  const pages = getVisiblePages(current, total);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={classNames(
          styles.paginationButton,
          styles.paginationButtonArrow,
        )}
        aria-label="Previous page"
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <ul className={styles.paginationList}>
        {pages.map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === '...' ? (
              <span className={styles.paginationDots} aria-hidden="true">
                . . .
              </span>
            ) : (
              <button
                type="button"
                className={classNames(styles.paginationButton, {
                  [styles.paginationButtonActive]: item === current,
                })}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={classNames(
          styles.paginationButton,
          styles.paginationButtonArrow,
        )}
        aria-label="Next page"
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );
};
