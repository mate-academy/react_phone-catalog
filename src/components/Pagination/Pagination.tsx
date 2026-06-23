import React from 'react';
import { ArrowLeftIcon } from '../ui/ArrowLeftIcon';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const visibleRange = 4;
    let start = Math.max(1, currentPage - Math.floor(visibleRange / 2));
    let end = start + visibleRange - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visibleRange + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const pages = getVisiblePages();

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <ul className={styles.pagination__list}>
        <li className={styles.pagination__item}>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ArrowLeftIcon />
          </button>
        </li>
        {pages.map(page => {
          return (
            <li className={styles.pagination__item} key={page}>
              <button
                className={currentPage === page ? styles.isActive : ''}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className={styles.pagination__item}>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ArrowRightIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
};
