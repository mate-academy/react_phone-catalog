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
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

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
        {pages.map((page, index) => {
          return (
            <li className={styles.pagination__item} key={index}>
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
