import React from 'react';
import classNames from 'classnames';
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
        className={classNames(styles.btn, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={classNames(styles.btn, styles.page, {
            [styles.active]: page === currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(styles.btn, {
          [styles.disabled]: currentPage === totalPages,
        })}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
};
