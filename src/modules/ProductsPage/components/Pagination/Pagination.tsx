import React from 'react';
import styles from './Pagination.module.scss';
import { Button } from '../../../../components/Button';

type PaginationProps = {
  total: number;
  perPage: 'all' | string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (perPage === 'all') {
    return null;
  }

  const totalPages = Math.ceil(total / Number(perPage));

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const visiblePages = () => {
    const maxVisible = 4;

    let start = Math.max(1, currentPage - 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={styles.pagination}>
      <Button
        rotation={180}
        disabled={currentPage === 1}
        onClick={handlePrev}
      />

      <div className={styles.pagination__pages}>
        <div className={styles.pagination__pages}>
          {visiblePages().map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${styles.pagination__page} ${
                currentPage === page ? styles['pagination__page--active'] : ''
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleNext} disabled={currentPage === totalPages} />
    </div>
  );
};
