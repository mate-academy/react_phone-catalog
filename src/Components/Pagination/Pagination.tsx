import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import './Pagination.scss';
import classNames from 'classnames';
import { DOTS, usePagination } from './usePagination';

type Props = {
  total: number[];
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const { currentPage, onPageChange, itemsOnPage } = useContext(ProductContext);
  const totalItems = total.length;

  const paginationRange = usePagination({
    totalItems,
    itemsOnPage,
    siblingCount: 1,
    currentPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1, totalItems);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1, totalItems);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination">
      {/* Left navigation arrow */}
      <li
        className={classNames('pagination__item pagination__prev', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="pagination__icon--left" />
      </li>
      <div className="pagination__container">
        {paginationRange.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li className="pagination__item disabled" key={`dots-${index}`}>
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={pageNumber}
              className={classNames('pagination__item', {
                'pagination__item--is-active': pageNumber === currentPage,
              })}
              onClick={() => onPageChange(+pageNumber, totalItems)}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>
      <li
        className={classNames('pagination__next pagination__item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="pagination__icon--right" />
      </li>
    </ul>
  );
};
