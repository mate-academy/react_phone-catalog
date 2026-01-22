import React from 'react';
import styles from './Pagination.module.scss'; // Zakładam, że masz ten plik, lub usuń import i użyj className

type Props = {
  total: number;
  perPage: number | string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  // Jeśli wybrano "All", nie pokazujemy paginacji
  if (perPage === 'all') {
    return null;
  }

  const limit = Number(perPage);
  const totalPages = Math.ceil(total / limit);

  // Jeśli jest tylko 1 strona, też nie pokazujemy
  if (totalPages <= 1) {
    return null;
  }

  // Tworzymy tablicę numerów stron [1, 2, 3...]
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* Przycisk Wstecz */}
      <button
        className={styles.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {/* Numery stron */}
      {pages.map(page => (
        <button
          key={page}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Przycisk Dalej */}
      <button
        className={styles.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};
