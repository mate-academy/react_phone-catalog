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

  // Если страниц 1 или меньше, пагинация вообще не нужна
  if (totalPages <= 1) {
    return null;
  }

  // Количество одновременно видимых номеров страниц (ограничим до 4, как в ТЗ)
  const maxVisiblePages = 4;

  // Логика расчета динамического диапазона (какие именно цифры показать)
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
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

      {/* Номера страниц (показываем только обрезанный диапазон) */}
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
