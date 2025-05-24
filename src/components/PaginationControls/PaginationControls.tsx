// components/PaginationControls/PaginationControls.tsx
import React from 'react';
import './PaginationControls.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination__controls">
      <button
        className="pagination-button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
          onClick={() => goToPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default PaginationControls;
