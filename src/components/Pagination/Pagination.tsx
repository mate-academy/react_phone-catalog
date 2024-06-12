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

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={currentPage === i ? styles.activePage : styles.numPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      );
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
