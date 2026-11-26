import React from 'react';
import classNames from 'classnames';
import type { PerPageValue } from '../../hooks/useProducts';
import styles from './ProductsPagination.module.scss';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: PerPageValue;
  onPerPageChange: (value: PerPageValue) => void;
  totalCount: number;
  showPagination: boolean;
}

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
] as const;

export function ProductsPagination({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
  totalCount,
  showPagination,
}: ProductsPaginationProps): JSX.Element | null {
  if (!showPagination) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePages = pageNumbers.filter(page => {
    if (totalPages <= 5) {
      return true;
    }

    if (page === 1 || page === totalPages) {
      return true;
    }

    if (page === currentPage) {
      return true;
    }

    if (page === currentPage - 1 || page === currentPage + 1) {
      return true;
    }

    return false;
  });

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <div className={styles.perPageControl}>
        <label htmlFor="perpage-pagination" className={styles.perPageLabel}>
          Items on page
        </label>
        <select
          id="perpage-pagination"
          className={styles.perPageSelect}
          value={perPage}
          onChange={e => onPerPageChange(e.target.value as PerPageValue)}
        >
          {PER_PAGE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.pages}>
        <button
          className={classNames(styles.pageButton, styles.navButton, {
            [styles.disabled]: currentPage === 1,
          })}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg
            className={styles.navIcon}
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {visiblePages.map((page, index) => {
          const prevPage = visiblePages[index - 1];
          const showEllipsis = prevPage !== undefined && page - prevPage > 1;

          return (
            <React.Fragment key={page}>
              {showEllipsis && (
                <span className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              )}
              <button
                className={classNames(styles.pageButton, {
                  [styles.active]: page === currentPage,
                })}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </React.Fragment>
          );
        })}
        <button
          className={classNames(styles.pageButton, styles.navButton, {
            [styles.disabled]: currentPage === totalPages,
          })}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg
            className={styles.navIcon}
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <p className={styles.pageInfo} aria-live="polite">
        Showing{' '}
        <strong>
          {(currentPage - 1) *
            (perPage === 'all' ? totalCount : parseInt(perPage, 10)) +
            1}
        </strong>{' '}
        to{' '}
        <strong>
          {Math.min(
            currentPage *
              (perPage === 'all' ? totalCount : parseInt(perPage, 10)),
            totalCount,
          )}
        </strong>{' '}
        of <strong>{totalCount}</strong> models
      </p>
    </nav>
  );
}
