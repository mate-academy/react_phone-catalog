import React from 'react';
import styles from './Pagination.module.scss';
import { ICONS } from '../../../../constants';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  const getVisiblePages = () => {
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Keep the current page in the middle (position 3 of 5)
    // but clamp so we never go below 1 or above totalPages
    const half = Math.floor(maxVisible / 2); // 2

    let start = currentPage - half; // want current in a center
    let end = currentPage + half; // 2 pages on each side

    if (start < 1) {
      // Too close to the beginning — pin left
      start = 1;
      end = maxVisible;
    }

    if (end > totalPages) {
      // Too close to the end — pin right
      end = totalPages;
      start = totalPages - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles.pageItem} ${styles.arrow} ${
          currentPage === 1 ? styles.disabled : ''
        }`}
      >
        <button
          data-cy="prevLink"
          className={styles.pageLink}
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => handleClick(currentPage - 1)}
        >
          <img src={ICONS.ARROW_DOWN} alt="Previous" />
        </button>
      </li>

      {visiblePages.map(page => {
        return (
          <li
            key={page}
            className={`${styles.pageItem} ${
              currentPage === page ? styles.active : ''
            }`}
          >
            <button
              data-cy="pageLink"
              className={styles.pageLink}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          </li>
        );
      })}

      <li
        className={`${styles.pageItem} ${styles.arrow} ${
          currentPage === totalPages ? styles.disabled : ''
        }`}
      >
        <button
          data-cy="nextLink"
          className={styles.pageLink}
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => handleClick(currentPage + 1)}
        >
          <img src={ICONS.ARROW_DOWN} alt="Next" />
        </button>
      </li>
    </ul>
  );
};
