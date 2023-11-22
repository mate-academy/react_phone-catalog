import React, { useEffect } from 'react';
import './Pagination.scss';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total, perPage, currentPage = 1, onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageRange = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="pagination_arrowleft"
        aria-label="Previous"
      />

      {pageRange.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination_number${page === currentPage ? '_active' : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="pagination_arrowright"
        aria-label="Next"
      />
    </div>
  );
};

export default Pagination;
