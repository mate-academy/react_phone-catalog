import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const getVisiblePages = () => {
    // Якщо сторінок 4 або менше — виводимо всі
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Розраховуємо старт так, щоб завжди було 4 цифри
    let start = Math.max(1, currentPage - 1);

    // Якщо ми в самому кінці, фіксуємо старт, щоб не було порожніх місць
    if (start + 3 > totalPages) {
      start = totalPages - 3;
    }

    return Array.from({ length: 4 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null; // Не виводимо пагінацію, якщо сторінка одна

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__item}>
        <button
          type="button"
          className={`${styles.pagination__btn} ${styles.pagination__btn_arrow}`}
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          {/* Можна залишити стрілочку текстом або вставити іконку */}
          <span className={styles.arrow_left}></span>
        </button>
      </li>

      {visiblePages.map(page => (
        <li key={page} className={styles.pagination__item}>
          <button
            type="button"
            className={`${styles.pagination__btn} ${
              page === currentPage ? styles.pagination__btn_active : ''
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className={styles.pagination__item}>
        <button
          type="button"
          className={`${styles.pagination__btn} ${styles.pagination__btn_arrow}`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          <span className={styles.arrow_right}></span>
        </button>
      </li>
    </ul>
  );
};5