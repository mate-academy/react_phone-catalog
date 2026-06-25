import React from 'react';
import styles from './Pagination.module.scss'; // Importa os estilos do módulo SCSS

type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  perPage,
  setPerPage,
  total,
}) => {
  const totalPages = perPage === 0 ? 1 : Math.ceil(total / perPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? 0 : parseInt(e.target.value);

    setPerPage(value);
    setCurrentPage(1);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.button}
      >
        Prev
      </button>

      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.button}
      >
        Next
      </button>
      <select
        value={perPage === 0 ? 'all' : perPage}
        onChange={handlePerPageChange}
        className={styles.select}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};

export default Pagination;
