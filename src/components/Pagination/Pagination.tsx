import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Если страниц 1 или меньше, пагинация не нужна
  if (totalPages <= 1) {
    return null;
  }

  const maxVisiblePages = 4;
  const visiblePageNumbers: number[] = [];

  // Железобетонный расчет стартовой и конечной страницы
  let startPage = currentPage - 1;

  if (currentPage === 1) {
    startPage = 1;
  } else if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  } else if (currentPage + 2 > totalPages) {
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  startPage = Math.max(1, startPage);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Если из-за округлений в начале не добрали страниц до maxVisiblePages, корректируем старт
  const finalStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  for (let i = finalStartPage; i <= endPage; i++) {
    visiblePageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* Стрелка влево */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`${styles.arrow} ${currentPage === 1 ? styles.disabled : ''}`}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      {/* Номера страниц */}
      {visiblePageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
        >
          {page}
        </button>
      ))}

      {/* Стрелка вправо */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`${styles.arrow} ${currentPage === totalPages ? styles.disabled : ''}`}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};
