import React from 'react';
import cn from 'classnames';
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

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="img/icons/arrow-left.svg" alt="Previous" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={cn({
            [styles.button]: currentPage !== page,
            [styles.buttonActive]: currentPage === page,
          })}
          onClick={() => onPageChange(page)}
        >
          <span className={styles.pageNumber}>{page}</span>
        </button>
      ))}

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src="img/icons/arrow-right.svg" alt="Next" />
      </button>
    </div>
  );
};
