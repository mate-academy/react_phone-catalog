import React from 'react';
import '@/styles/main.scss';
import classNames from 'classnames';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages < 1) {
    return null;
  }

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Current page is near the beginning
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }

        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Current page is near the end
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Current page is in the middle
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }

        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className="button__circle button__circle--arrow"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <i className="icon icon--left"></i>
      </button>
      <div className={styles.pagination__numbers}>
        {getPageNumbers().map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum === '...' ? (
              <span className="pagination__ellipsis">...</span>
            ) : (
              <button
                onClick={e => handlePageClick(pageNum as number, e)}
                className={classNames(
                  'button__circle button__circle--regular',
                  { active: pageNum === currentPage },
                )}
              >
                {pageNum}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      <button
        className="button__circle button__circle--arrow"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <i className="icon icon--right"></i>
      </button>
    </div>
  );
};
