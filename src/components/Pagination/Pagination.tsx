import { useState } from 'react';
import styles from './Pagination.module.scss';
type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const [startPage, setStartPage] = useState(1);
  const visiblePages = Array.from(
    { length: 4 },
    (_, index) => startPage + index,
  ).filter(page => page <= totalPages);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => {
          if (startPage > 1) {
            setStartPage(prev => prev - 1);
          }
        }}
      >
        <img src={`${import.meta.env.BASE_URL}/img/buttons/arrow-left.png`} />
      </button>
      {visiblePages.map(page => (
        <button
          key={page}
          className={`${styles.pagination__item}
        ${currentPage === page ? styles['pagination__item--active'] : ''}`}
          onClick={() => setCurrentPage(page)}
        >
          {' '}
          {page}
        </button>
      ))}
      <button
        className={styles.arrow}
        onClick={() => {
          if (startPage + 4 <= totalPages) {
            setStartPage(prev => prev + 1);
          }
        }}
      >
        <img src={`${import.meta.env.BASE_URL}/img/buttons/arrow-right.png`} />
      </button>
    </div>
  );
};
