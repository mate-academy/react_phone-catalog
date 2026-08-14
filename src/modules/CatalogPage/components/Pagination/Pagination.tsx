import React from 'react';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      '...',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    const newPageCopy = new URLSearchParams(searchParams);

    if (newPage === 1) {
      newPageCopy.delete('page');
    } else {
      newPageCopy.set('page', String(newPage));
    }

    setSearchParams(newPageCopy);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginationArr = getPaginationItems(currentPage, totalPages);

  return (
    <div className={styles.paginationBlock}>
      <button
        className={styles.arrowBtn}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span className={styles.leftArrow} aria-label="Arrow left"></span>
      </button>
      {paginationArr.map((item, index) => {
        if (item === '...') {
          return (
            <span className={styles.dots} key={index}>
              ...
            </span>
          );
        }

        return (
          <button
            className={classNames(styles.pageNum, {
              [styles.active]: item === currentPage,
            })}
            key={index}
            onClick={() => handlePageChange(Number(item))}
          >
            {item}
          </button>
        );
      })}
      <button
        className={styles.arrowBtn}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className={styles.rightArrow} aria-label="Arrow right"></span>
      </button>
    </div>
  );
};
