import React from 'react';
import classNames from 'classnames';
import { getPageNumbers } from '../../../../utils/helpers';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__button_prev,
        )}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <img src="img/icons/icon-left.png" alt="Previous" />
      </button>

      <div className={styles.pagination__pages}>
        {currentPage > 3 && (
          <>
            <button
              className={styles.pagination__page}
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {currentPage > 4 && (
              <span className={styles.pagination__dots}>...</span>
            )}
          </>
        )}

        {pageNumbers.map(page => (
          <button
            key={page}
            className={classNames(styles.pagination__page, {
              [styles.pagination__page_active]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className={styles.pagination__dots}>...</span>
            )}
            <button
              className={styles.pagination__page}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__button_next,
        )}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <img src="img/icons/icon-right.png" alt="Next" />
      </button>
    </div>
  );
};
