import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) {
    return null;
  }

  // Обмеження: показуємо максимум 4 кнопки пагінації (за макетом Figma)
  const MAX_VISIBLE_PAGES = 4;

  // Намагаємось тримати поточну сторінку ближче до початку списку
  let startPage = Math.max(1, currentPage - 1);
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  // Якщо вікно "вилізло" за межі загальної кількості сторінок, коригуємо його назад
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  // Генеруємо масив тільки з видимих сторінок
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__btn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="/icons/arrow-left.svg" alt="Prev" />
      </button>

      <div className={styles.pagination__pages}>
        {visiblePages.map(page => {
          const pageClass = `${styles.pagination__page} ${
            page === currentPage ? styles['pagination__page--active'] : ''
          }`;

          return (
            <button
              key={page}
              className={pageClass}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={styles.pagination__btn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="/icons/arrow-right.svg" alt="Next" />
      </button>
    </div>
  );
};
