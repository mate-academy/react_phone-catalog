import React from 'react';
import styles from './Pagination.module.scss';
import { BASE_URL } from '../../utils/const';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;

    const startPage = Math.max(2, currentPage - delta);
    const endPage = Math.min(totalPages - 1, currentPage + delta);

    const addPageButton = (page: number) => {
      pageNumbers.push(
        <button
          key={page}
          className={currentPage === page ? styles.activePage : styles.numPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>,
      );
    };

    addPageButton(1);

    if (startPage > 2) {
      pageNumbers.push(
        <span key="start-ellipsis" className={styles.ellipsis}>
          ...
        </span>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      addPageButton(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="end-ellipsis" className={styles.ellipsis}>
          ...
        </span>,
      );
    }

    if (totalPages > 1) {
      addPageButton(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
      >
        <img src={`${BASE_URL}/icons/ArrowLeft.svg`} alt="Previous" />
      </button>
      <div className={styles.numbers}>{renderPageNumbers()}</div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.button}
      >
        <img src={`${BASE_URL}/icons/ArrowRight.svg`} alt="Next" />
      </button>
    </div>
  );
};

export default Pagination;
