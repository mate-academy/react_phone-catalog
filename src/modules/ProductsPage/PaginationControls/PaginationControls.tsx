import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import styles from './PaginationControls.module.scss';
import classNames from 'classnames';

const countPages = (current: number, total: number): PageItem[] => {
  if (total <= 6) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total];
  }

  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
};

type PageItem = number | '...';

type Props = {
  total: number;
  currentPage: number;
  onChange: (currentPage: number) => void;
};

export const PaginationControls: React.FC<Props> = ({
  total,
  currentPage,
  onChange,
}) => {
  const pages = countPages(currentPage, total);

  return (
    <div className={styles['pagination-controls']}>
      <button
        type="button"
        className={styles['pagination-controls__arrow']}
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        aria-label="Prev page"
      >
        <IoIosArrowBack />
      </button>

      <div className={styles['pagination-controls__buttons']}>
        {pages.map((page, index) =>
          page === '...' ? (
            <span key={`per-${index}`} aria-hidden="true">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={classNames(styles['pagination-controls__per'], {
                [styles['pagination-controls__per--active']]:
                  page === currentPage,
              })}
              onClick={() => onChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className={`${styles['pagination-controls__arrow']} ${styles['pagination-controls__arrow--next']}`}
        disabled={currentPage === total}
        onClick={() => onChange(currentPage + 1)}
        aria-label="Next page"
      >
        <IoIosArrowBack />
      </button>
    </div>
  );
};
