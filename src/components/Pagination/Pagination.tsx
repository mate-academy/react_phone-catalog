import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  if (itemsPerPage === 0) return null;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleCount = 4;

  const currentWindowStart =
    Math.floor((currentPage - 1) / visibleCount) * visibleCount;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    currentWindowStart,
    currentWindowStart + visibleCount,
  );

  const goPrevWindow = () => {
    if (currentWindowStart === 0) return;
    onPageChange(currentWindowStart);
  };

  const goNextWindow = () => {
    const nextStart = currentWindowStart + visibleCount;
    if (nextStart >= totalPages) return;
    onPageChange(nextStart + 1);
  };

  const setActiveBtn = (page: number) => {
    return page === currentPage ? { backgroundColor: '#905BFF' } : {};
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={goPrevWindow}
        disabled={currentWindowStart === 0}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {visiblePages.map(p => (
        <button
          key={p}
          className={`${styles.pageButton}`}
          onClick={() => onPageChange(p)}
          style={setActiveBtn(p)}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.arrowButton}
        onClick={goNextWindow}
        disabled={currentWindowStart + visibleCount >= totalPages}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
