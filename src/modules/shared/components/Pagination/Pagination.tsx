import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { ArrowUpIcon } from '../Icons';
import { usePagination } from './usePagination';

interface Props {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  current,
  onPageChange,
}) => {
  const { pages, isHidden, isFirstPage, isLastPage, handlePrev, handleNext } =
    usePagination(total, current, onPageChange);

  if (isHidden) {
    return null;
  }

  return (
    <nav className={styles.container} aria-label="Page navigation">
      <button
        type="button"
        className={classNames(styles.button, styles.arrow, {
          [styles.disabled]: isFirstPage,
        })}
        onClick={handlePrev}
        disabled={isFirstPage}
        aria-label="Previous page"
      >
        <span className="icon icon--left">
          <ArrowUpIcon />
        </span>
      </button>

      <ul className={styles.paginationList}>
        {pages.map(page => (
          <li key={page} className={styles.item}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.active]: page === current,
              })}
              onClick={() => onPageChange(page)}
              aria-current={page === current ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={classNames(styles.button, styles.arrow, {
          [styles.disabled]: isLastPage,
        })}
        onClick={handleNext}
        disabled={isLastPage}
        aria-label="Next page"
      >
        <span className="icon icon--right">
          <ArrowUpIcon />
        </span>
      </button>
    </nav>
  );
};
