import { ArrowLeftIcon } from '@components/Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@components/Icons/ArrowRightIcon';

import React from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  goToPage,
}) => {
  const pageLimit = 10;

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= pageLimit) {
      return [...Array(totalPages)].map((_, index) => index + 1);
    }

    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, currentPage + 4);

    const pages: (number | string)[] = [];

    if (startPage > 1) {
      pages.push(1);
    }

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    if (endPage < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    totalPages > 1 && (
      <div className={styles.pagination}>
        <button
          className={cn(styles.pagination__prev, 'button-icon', {
            disabled: currentPage <= 1,
          })}
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <ArrowLeftIcon active={currentPage <= 1} />
        </button>

        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className={styles.pagination__dots}>
                ...
              </span>
            );
          }

          return (
            <button
              key={index}
              onClick={() => goToPage(Number(page))}
              className={`${styles.pagination__item} ${currentPage === page ? styles.active : ''}`}
            >
              {page}
            </button>
          );
        })}

        <button
          className={cn(styles.pagination__next, 'button-icon', {
            disabled: currentPage >= totalPages,
          })}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ArrowRightIcon active={currentPage >= totalPages} />
        </button>
      </div>
    )
  );
};
