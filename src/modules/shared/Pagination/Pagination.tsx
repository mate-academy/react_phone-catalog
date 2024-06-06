import React from 'react';
import Button from '../../../UI/Buttons/Button';
import s from './Pagination.module.css';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  if (total === 0 || perPage === 0) {
    return null; // or some other handling for zero values
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
    <ul className={s.pagination}>
      <li onClick={handlePrevPage}>
        <Button
          variant="pagination"
          size={[32, 32]}
          disabled={currentPage === 1}
        >
          <img src="img/icons/arrow-left-dark-icon.svg" alt="Previous Page" />
        </Button>
      </li>

      {pages.map(page => (
        <li onClick={() => onPageChange(page)} key={page}>
          <Button
            variant="pagination"
            isSelected={currentPage === page}
            size={[32, 32]}
          >
            {page}
          </Button>
        </li>
      ))}

      <li onClick={handleNextPage}>
        <Button
          variant="pagination"
          size={[32, 32]}
          disabled={currentPage === totalPages}
        >
          <img src="img/icons/arrow-right-dark-icon.svg" alt="Next Page" />
        </Button>
      </li>
    </ul>
  );
};
