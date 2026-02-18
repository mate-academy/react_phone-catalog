import { getPaginationLinks } from '../../utils/paginationHelper';
import cn from 'classnames';
import './Pagination.scss';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  total: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  total,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / itemsPerPage);
  const pageNumbers = getPaginationLinks(pageCount, currentPage);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pageCount;

  return (
    <ul className="pagination">
      {/* ← Prev */}
      <li className="pagination__item">
        <button
          disabled={isPrevDisabled}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={cn('pagination__link', 'pagination__link--prev', {
            'pagination__link--disabled': isPrevDisabled,
          })}
        >
          <img src="/img/icons/SliderLeft.svg" alt="Prev" />
        </button>
      </li>

      {/* Pages */}
      {pageNumbers.map((page, index) => {
        if (page === -1) {
          return (
            <li key={`back-dots-${index}`} className="pagination__item">
              <button
                onClick={() => onPageChange(currentPage - 2)}
                className="pagination__link"
              >
                ...
              </button>
            </li>
          );
        }

        if (page === 0) {
          return (
            <li key={`forward-dots-${index}`} className="pagination__item">
              <button
                onClick={() => onPageChange(currentPage + 2)}
                className="pagination__link"
              >
                ...
              </button>
            </li>
          );
        }

        return (
          <li key={page} className="pagination__item">
            <button
              onClick={() => onPageChange(page)}
              className={cn('pagination__link', {
                'pagination__link--active': currentPage === page,
              })}
            >
              {page}
            </button>
          </li>
        );
      })}

      {/* → Next */}
      <li className="pagination__item">
        <button
          disabled={isNextDisabled}
          onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
          className={cn('pagination__link', 'pagination__link--next', {
            'pagination__link--disabled': isNextDisabled,
          })}
        >
          <img src="/img/icons/SliderRight.svg" alt="Next" />
        </button>
      </li>
    </ul>
  );
};
