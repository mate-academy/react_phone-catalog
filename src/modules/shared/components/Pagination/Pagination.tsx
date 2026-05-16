import React from 'react';
import { PerPageType } from '../../../Catalog';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: PerPageType;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const getVisiblePages = (current: number, total: number, windowSize = 4) => {
  if (total <= windowSize) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  let start = current - Math.floor(windowSize / 2);
  let end = current + Math.floor(windowSize / 2);

  if (start < 1) {
    start = 1;
    end = windowSize;
  }

  if (end > total) {
    end = total;
    start = total - windowSize;
  }

  return Array.from({ length: windowSize }, (_, i) => i + start);
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagPagesCount = Math.ceil(total / +perPage);
  const pages = getVisiblePages(currentPage, pagPagesCount);

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles['page-item']} ${currentPage === 1 ? styles.disabled : ''}`}
      >
        <button
          data-cy="prevLink"
          className={styles['page-link']}
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          {'<'}
        </button>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`${styles['page-item']} ${page === currentPage ? styles.active : ''}`}
        >
          <button
            data-cy="pageLink"
            className={styles['page-link']}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li
        className={`${styles['page-item']} ${currentPage === pagPagesCount ? styles.disabled : ''}`}
      >
        <button
          data-cy="nextLink"
          className={styles['page-link']}
          disabled={currentPage === pagPagesCount}
          onClick={() =>
            currentPage < pagPagesCount && onPageChange(currentPage + 1)
          }
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
};
