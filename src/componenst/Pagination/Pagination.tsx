import React from 'react';
import { getNumbers } from '../../utils';
import Select, { SelectOption } from '../Select';
import styles from './Pagination.module.scss';

const base = import.meta.env.BASE_URL ?? '/';

const resolveUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;
};

interface PaginationTopProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  perPage: number;
  onPerPageChange: (count: number) => void;
}

interface PaginationBottomProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const PaginationTop: React.FC<PaginationTopProps> = ({
  sortBy,
  onSortChange,
  perPage,
  onPerPageChange,
}) => {
  const sortOptions: SelectOption[] = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'newest', label: 'Newest' },
  ];

  const perPageOptions: SelectOption[] = [
    { value: 4, label: '4 items' },
    { value: 8, label: '8 items' },
    { value: 12, label: '12 items' },
    { value: 16, label: '16 items' },
  ];

  return (
    <div className={styles.paginationTop}>
      <div className={styles.select1}>
        <div className={styles.selectWrapper}>
          <Select
            value={sortBy}
            options={sortOptions}
            onChange={value => onSortChange(String(value))}
            label="Sort by:"
          />
        </div>
      </div>

      <div className={styles.select2}>
        <div className={styles.selectWrapper}>
          <Select
            value={perPage}
            options={perPageOptions}
            onChange={value => onPerPageChange(Number(value))}
            label="Items per page:"
          />
        </div>
      </div>
    </div>
  );
};

export const PaginationBottom: React.FC<PaginationBottomProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  if (pagesCount === 0) {
    return null;
  }

  // Show max 5 pages with sliding window, current page centered
  const visibleCount = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visibleCount / 2));
  const endPage = Math.min(pagesCount, startPage + visibleCount - 1);

  // Adjust start if we're at the end
  if (endPage - startPage + 1 < visibleCount) {
    startPage = Math.max(1, endPage - visibleCount + 1);
  }

  const visiblePages = getNumbers(startPage, endPage);

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles.pageItem} ${isFirstPage ? styles.disabled : ''}`}
      >
        <button
          type="button"
          className={styles.pagination__button}
          onClick={() => {
            if (!isFirstPage) {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={isFirstPage}
          aria-label="Previous page"
        >
          <img
            src={resolveUrl('icons/left.svg')}
            alt=""
            className={styles.pageIcon}
          />
        </button>
      </li>

      <div className={styles.pagination__pages}>
        {visiblePages.map(num => (
          <li key={num} className={styles.pageItem}>
            <button
              type="button"
              className={`${styles.pageLink} ${num === currentPage ? styles.active : ''}`}
              onClick={() => {
                if (num !== currentPage) {
                  onPageChange(num);
                }
              }}
              aria-current={num === currentPage ? 'page' : undefined}
            >
              {num}
            </button>
          </li>
        ))}
      </div>

      <li className={`${styles.pageItem} ${isLastPage ? styles.disabled : ''}`}>
        <button
          type="button"
          className={styles.pagination__button}
          onClick={() => {
            if (!isLastPage) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={isLastPage}
          aria-label="Next page"
        >
          <img
            src={resolveUrl('icons/right.svg')}
            alt=""
            className={styles.pageIcon}
          />
        </button>
      </li>
    </ul>
  );
};
