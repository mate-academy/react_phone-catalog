import React from 'react';
import Button from '../../../UI/Buttons/Button';
import s from './Pagination.module.css';

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
      <li>
        <Button
          variant="pagination"
          size={[32, 32]}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt;
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
          variant="pagination"
          size={[32, 32]}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
