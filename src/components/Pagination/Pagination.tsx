import { getNumbers } from './utils';
import './Pagination.scss';
import cn from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pagesArray = getNumbers(1, totalPages);

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 3);

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className={cn('pagination__btn', 'pagination__btn-prev', {
          'pagination__btn--disabled': currentPage === 1,
        })}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {currentPage === 1 ? (
          <img src="./img/icons/left-gray.svg" alt="Previous" />
        ) : (
          <img src="./img/icons/left.svg" alt="Previous" />
        )}
      </button>
      {pagesArray.slice(startPage - 1, endPage).map(page => (
        <button
          className={cn('pagination__btn', {
            'pagination__btn--active': currentPage === page,
          })}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={cn('pagination__btn', 'pagination__btn-next', {
          'pagination__btn--disabled': currentPage === totalPages,
        })}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {currentPage === totalPages ? (
          <img src="./img/icons/right-gray.svg" alt="Next" />
        ) : (
          <img src="./img/icons/right.svg" alt="Next" />
        )}
      </button>
    </div>
  );
};
