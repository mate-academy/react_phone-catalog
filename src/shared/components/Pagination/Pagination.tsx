import React from 'react';
import s from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePaginationButtons = () => {
    const buttons: (number | string)[] = [];

    if (currentPage > 2) {
      buttons.push(1);
    }

    if (currentPage > 3) {
      buttons.push('...');
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      buttons.push(i);
    }

    if (currentPage < totalPages - 2) {
      buttons.push('...');
    }

    if (currentPage < totalPages - 1) {
      buttons.push(totalPages);
    }

    return buttons;
  };

  const buttons = generatePaginationButtons();

  return (
    <div className={s.Pagination}>
      <button
        className={`${s.PaginationButton} ${currentPage === 1 ? s.Disabled : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {buttons.map((button, index) => (
        <button
          key={index}
          className={`${s.PaginationButton} ${
            button === currentPage ? s.Active : ''
          }`}
          onClick={() => typeof button === 'number' && onPageChange(button)}
          disabled={typeof button !== 'number'}
        >
          {button}
        </button>
      ))}

      <button
        className={`${s.PaginationButton} ${
          currentPage === totalPages ? s.Disabled : ''
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};
