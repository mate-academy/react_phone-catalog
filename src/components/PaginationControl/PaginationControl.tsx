import React from 'react';
import './PaginationControl.scss';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationControl: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <button
        className="arrow-button"
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        ‹
      </button>

      <button
        className="arrow-button"
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
      >
        ›
      </button>
    </div>
  );
};
