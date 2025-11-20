import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  totalItems: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  currentPage,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalItems <= perPage) {
    return null; // nada a paginar
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.controls}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {'<'}
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>

      <label>
        Items per page:
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={totalItems}>All</option>
        </select>
      </label>
    </div>
  );
};
