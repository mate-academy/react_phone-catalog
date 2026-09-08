import leftArrowDisabled from '../../images/icons/arrow-left-disabled.svg';
import leftArrowActive from '../../images/icons/arrow-left-active.svg';
import rightArrowDisabled from '../../images/icons/arrow-right-disabled.svg';
import rightArrowActive from '../../images/icons/arrow-right-active.svg';

import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const range = (start: number, end: number) => {
      const arr = [];

      for (let i = start; i <= end; i++) {
        arr.push(i);
      }

      return arr;
    };

    if (totalPages <= 5) {
      return range(1, totalPages);
    }

    if (currentPage <= 3) {
      return [...range(1, 4), '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', ...range(totalPages - 3, totalPages)];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <button
          className="pagination__button pagination__button--prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <img
            src={currentPage === 1 ? leftArrowDisabled : leftArrowActive}
            alt="Previous page"
            className="pagination__button-icon"
          />
        </button>

        <div className="pagination__pages">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`pagination__page ${
                page === currentPage ? 'pagination__page--active' : ''
              } ${page === '...' ? 'pagination__page--dots' : ''}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination__button pagination__button--next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <img
            src={
              currentPage === totalPages ? rightArrowDisabled : rightArrowActive
            }
            alt="Next page"
            className="pagination__button-icon"
          />
        </button>
      </div>
    </div>
  );
};
