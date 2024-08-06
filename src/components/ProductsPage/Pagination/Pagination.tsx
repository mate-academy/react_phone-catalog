import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import { Products } from '../../../types/Products';
import classNames from 'classnames';

interface Props {
  products: Products[];
  perPage: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props> = ({
  products,
  perPage,
  currentIndex,
  setCurrentIndex,
}) => {
  const [onPage, setOnPage] = useState(1);

  useEffect(() => {
    if (perPage === 'All') {
      setOnPage(1);
    } else {
      setOnPage(+perPage);
    }
  }, [perPage]);

  const paginationCounts = Math.ceil(products.length / onPage);
  const maxPagesToShow = 5; // Define maximum number of pages to show

  // Function to generate array of page numbers to display
  const getPageRange = () => {
    if (paginationCounts <= maxPagesToShow) {
      return Array.from({ length: paginationCounts }, (_, index) => index);
    }

    // Calculate start and end indices for pagination display
    let startPage = Math.max(0, currentIndex - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage >= paginationCounts) {
      endPage = paginationCounts - 1;
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    const pagesToShow = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );

    // Add "..." for indicating more pages before
    if (startPage > 0) {
      pagesToShow.unshift(-1); // -1 represents "..."
      pagesToShow.unshift(0); // Always include first page
    }

    // Add "..." for indicating more pages after
    if (endPage < paginationCounts - 1) {
      pagesToShow.push(-1); // -1 represents "..."
      pagesToShow.push(paginationCounts - 1); // Always include last page
    }

    return pagesToShow;
  };

  const handlePageClick = (pageIndex: number) => {
    if (
      pageIndex === currentIndex ||
      pageIndex < 0 ||
      pageIndex >= paginationCounts
    ) {
      return;
    }

    if (pageIndex === -1) {
      // Handle "..." click to show more pages
      if (currentIndex < Math.floor(maxPagesToShow / 2)) {
        setCurrentIndex(maxPagesToShow);
      } else if (
        currentIndex >
        paginationCounts - 1 - Math.floor(maxPagesToShow / 2)
      ) {
        setCurrentIndex(paginationCounts - 1 - Math.floor(maxPagesToShow / 2));
      } else {
        setCurrentIndex(currentIndex + Math.floor(maxPagesToShow / 2));
      }
    } else {
      setCurrentIndex(pageIndex);
    }
  };

  return (
    <nav
      className={`${styles.page__pagination} ${styles.pagination}`}
      role="navigation"
      aria-label="pagination"
    >
      <button
        className={`${styles.pagination__button} ${styles['pagination__button--prev']}`}
        onClick={() => handlePageClick(currentIndex - 1)}
        disabled={currentIndex === 0}
      ></button>
      <ul className={styles.pagination__list}>
        {getPageRange().map((pageIndex, index) => (
          <li key={index}>
            <button
              className={classNames(
                'pagination-link',
                styles.pagination__link,
                {
                  [styles['pagination__link--active']]:
                    currentIndex === pageIndex,
                  [styles['pagination__link--dots']]: pageIndex === -1,
                },
              )}
              aria-label={
                pageIndex === -1 ? 'More pages' : `Goto page ${pageIndex + 1}`
              }
              onClick={() => handlePageClick(pageIndex)}
            >
              {pageIndex === -1 ? '...' : pageIndex + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={`${styles.pagination__button} ${styles['pagination__button--next']}`}
        onClick={() => handlePageClick(currentIndex + 1)}
        disabled={currentIndex === paginationCounts - 1}
      ></button>
    </nav>
  );
};
