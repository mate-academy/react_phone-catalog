import React from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';

import ArrowRight from 'assets/icons/ArrowRight.svg?react';
import ArrowLeft from 'assets/icons/ArrowLeft.svg?react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

      {pages.map(page => (
        <li
          key={page}
          className={cn(styles.pageItem, {
            [styles.active]: currentPage === page,
          })}
        >
          <button
            className={styles.pageLink}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        </li>
      ))}

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
