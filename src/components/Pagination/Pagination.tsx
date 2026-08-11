import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ total, current, onChange }) => {
  //вираховуєм кількість сторінок
  const pageNumbers: number[] = [];

  for (let i = 1; i <= total; i++) {
    pageNumbers.push(i);
  }

  //активна сторінка
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= total && page !== current) {
      onChange(page);
    }
  };

  return (
    <ul className={styles.pagination}>
      {/* Кнопка в назад */}
      <li className={styles.pagination__item}>
        <button
          type="button"
          className={styles.pagination__btn}
          onClick={() => handlePageClick(current - 1)}
          disabled={current === 1}
          aria-label="Previous page"
        >
          <img
            src="/react_phone-catalog/img/icons/arrow-left.svg"
            alt="Arrow left"
          />
        </button>
      </li>
      {/* Перебір номерків сторінок */}
      {pageNumbers.map(page => (
        <li key={page} className={styles.pagination__item}>
          <button
            type="button"
            className={`${styles.pagination__btn} ${page === current ? styles['pagination__btn--active'] : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        </li>
      ))}

      {/* Кнопка в вперед  */}
      <li className={styles.pagination__item}>
        <button
          type="button"
          className={styles.pagination__btn}
          onClick={() => handlePageClick(current + 1)}
          disabled={current === total}
          aria-label="Next page"
        >
          <img
            src="/react_phone-catalog/img/icons/arrow-right.svg"
            alt="Arrow right"
          />
        </button>
      </li>
    </ul>
  );
};
