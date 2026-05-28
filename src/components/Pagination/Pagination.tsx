import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  pages: (number | string)[];
  onPageClick: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  pages,
  onPageClick,
  onPrevPage,
  onNextPage,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination_btn}
        onClick={onPrevPage}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        {'<'}
      </button>

      <div className={styles.pagination_pages}>
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className={styles.pagination_dots}>
                ...
              </span>
            );
          }

          const pageNumber = page as number;

          return (
            <button
              key={pageNumber}
              className={`${styles.pagination_page} ${
                currentPage === pageNumber ? styles.pagination_page_active : ''
              }`}
              onClick={() => onPageClick(pageNumber)}
              aria-label={`Page {pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        className={styles.pagination_btn}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        {'>'}
      </button>
    </div>
  );
};
