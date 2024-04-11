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

  return (
    <div className="pagination">
      <button
        className="pagination__btn pagination__btn-prev"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <img src="./img/icons/left.svg" alt="Previous" />
      </button>
      {pagesArray.map(page => (
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
        className="pagination__btn pagination__btn-next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <img src="./img/icons/right.svg" alt="Next" />
      </button>
    </div>
  );
};
