import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import Button from '../../../UI/Buttons/Button';
import React from 'react';
import styles from './Pagination.module.css';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  if (total === 0 || perPage === 0) {
    return null;
  }

  const totalPages = Math.ceil(total / perPage);
  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(startPage + 3, totalPages);

  if (endPage - startPage < 9) {
    if (currentPage < 5) {
      endPage = Math.min(startPage + 4, totalPages);
    } else {
      startPage = Math.max(endPage - 4, 1);
    }
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className={styles.pagination}>
      <li>
        <Button
          variant="icon"
          size={[32, 32]}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <GoChevronLeft size={16} />
        </Button>
      </li>

      {pages.map(page => (
        <li key={page}>
          <Button
            variant="pagination"
            isSelected={currentPage === page}
            size={[32, 32]}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        </li>
      ))}

      <li>
        <Button
          variant="icon"
          size={[32, 32]}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <GoChevronRight size={16} />
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
