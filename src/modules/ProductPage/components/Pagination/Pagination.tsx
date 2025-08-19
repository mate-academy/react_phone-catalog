import React from 'react';
import { ICON_PATHS } from '../../../../shared/constants/IconPaths';
// eslint-disable-next-line max-len
import { getPaginationPages } from '../../../../shared/utils/getPaginationPages';

import styles from './Pagination.module.scss';
import { BREAKPOINTS } from '../../../../shared/constants/Breakpoints';
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  maxVisiblePages?: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxVisiblePages = 10,
}) => {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const effectiveMaxVisiblePages = isMobile ? 4 : maxVisiblePages;

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

  const pageNumbers = getPaginationPages({
    totalPages,
    currentPage,
    maxVisiblePages: effectiveMaxVisiblePages,
  });

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.pagination__button}
      >
        <img
          src={ICON_PATHS.arrowLeft}
          alt="previous page"
          className={styles.pagination__icon}
        />
      </button>

      <div className={styles.pagination__pages}>
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={styles.pagination__ellipsis}
              >
                ...
              </span>
            );
          }

          const page = pageNumber as number;

          return (
            <button
              key={page}
              disabled={currentPage === page}
              onClick={() => onPageChange(page)}
              className={`${styles.pagination__pageButton} ${currentPage === page ? styles.pagination__pageButtonActive : ''}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.pagination__button}
      >
        <img
          src={ICON_PATHS.arrowRight}
          alt="next page"
          className={styles.pagination__icon}
        />
      </button>
    </div>
  );
};
