import React from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';

import ArrowRight from 'assets/icons/ArrowRight.svg?react';
import ArrowLeft from 'assets/icons/ArrowLeft.svg?react';
import { usePagination, DOTS } from '@/hooks/usePagination';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    itemsPerPage: perPage,
    siblingCount,
  });

  const totalPages = Math.ceil(total / perPage);

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={cn(styles.pageItem, {
          [styles.disabled]: currentPage === 1,
        })}
      >
        <button
          className={`${styles.pageLink} ${styles.pageLinkNavBtn}`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <ArrowLeft className={styles.arrowPagination} />
        </button>
      </li>

      {paginationRange?.map((page, index) => {
        if (page === DOTS) {
          // eslint-disable-next-line react/no-array-index-key
          return (
            <li key={`dots-${index}`} className={styles.dots}>
              …
            </li>
          );
        }

        return (
          <li
            key={page}
            className={cn(styles.pageItem, {
              [styles.active]: currentPage === (page as number),
            })}
          >
            <button
              className={styles.pageLink}
              onClick={() => handlePageClick(page as number)}
            >
              {page}
            </button>
          </li>
        );
      })}

      <li
        className={cn(styles.pageItem, {
          [styles.disabled]: currentPage === totalPages,
        })}
      >
        <button
          className={`${styles.pageLink} ${styles.pageLinkNavBtn}`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <ArrowRight className={styles.arrowPagination} />
        </button>
      </li>
    </ul>
  );
};
