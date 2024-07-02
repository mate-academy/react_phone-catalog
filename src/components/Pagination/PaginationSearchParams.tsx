import classnames from 'classnames';
import { usePagination, DOTS } from '../../hooks/usePagination';
import './PaginationSearchParams.scss';
import ArrowRight from '../../images/icons/arrow_right_small.svg';
import ArrowRightDisabled from '../../images/icons/Chevron (Arrow Right).png';
import ArrowLeftDisabled from '../../images/icons/arrow_left_disabled.svg';
import ArrowLeft from '../../images/icons/arrow_left.svg';

type Props = {
  itemsPerPage: number;
  currentPage: number;
  countDatas: number;
  onPageChange: (number: number) => void;
};

export const PaginationSearchParams: React.FC<Props> = ({
  countDatas,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount: countDatas,
    pageSize: itemsPerPage,
    siblingCount: 1,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  const disabledLeft = currentPage === 1;
  const disabledRight = currentPage === lastPage;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination pagination__container">
      <button
        type="button"
        className={classnames('pagination__btn', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        {disabledLeft ? (
          <img
            src={ArrowLeftDisabled}
            alt="arrow left"
            className="pagination__arrow"
          />
        ) : (
          <img src={ArrowLeft} alt="arrow left" className="pagination__arrow" />
        )}
      </button>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li
              className="pagination__item pagination__dots"
              key={`${Math.random()}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <button
            key={pageNumber}
            type="button"
            className={classnames('pagination__item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        type="button"
        className={classnames('pagination__btn', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        {disabledRight ? (
          <img
            src={ArrowRightDisabled}
            alt="arrow left"
            className="pagination__arrow"
          />
        ) : (
          <img
            src={ArrowRight}
            alt="arrow left"
            className="pagination__arrow"
          />
        )}
      </button>
    </ul>
  );
};
