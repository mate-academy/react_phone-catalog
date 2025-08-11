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
    <div className="arrow">
      <button
        className="arrow__button"
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        <img
          className="arrow__image"
          src="/img/icons/arrow-left.svg"
          alt="arrow left"
        />
      </button>

      <button
        className="arrow__button"
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
      >
        <img
          className="arrow__image"
          src="/img/icons/arrow-right.svg"
          alt="arrow right"
        />
      </button>
    </div>
  );
};
