import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../helpers/products';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pageArray = getNumbers(1, pageCount);
  const theFirstPage = currentPage === 1;
  const theLastPage = currentPage === pageCount;

  function handlePageChange(page: number) {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }

  function handlePrevPage() {
    if (theFirstPage) {
      return;
    }

    onPageChange(currentPage - 1);
  }

  function handleNextPage() {
    if (theLastPage) {
      return;
    }

    onPageChange(currentPage + 1);
  }

  return (
    <ul className="pagination" data-cy="pagination">
      <li className="pagination__page-item">
        <button
          type="button"
          className="arrow arrow--left"
          data-cy="paginationLeft"
          aria-disabled={theFirstPage}
          onClick={handlePrevPage}
        >
          {theFirstPage ? (
            <img
              src="/icons/buttons-icons/ChevronDisabled(Left).svg"
              alt="left"
              className="icon icon__disabled pagination__button"
            />
          ) : (
            <img
              src="/icons/buttons-icons/ChevronDef(Left).svg"
              alt="left"
              className="icon pagination__button"
            />
          )}
        </button>
      </li>

      {pageArray.map(pageNum => (
        <li
          key={pageNum}
          className="pagination__page-item pagination__page-item--number"
        >
          <a
            data-cy="pageLink"
            className={cn('pagination__page-link',
              { active: pageNum === currentPage })}
            href={`#${pageNum}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </a>
        </li>
      ))}

      <li className="pagination__page-item">
        <button
          type="button"
          className="arrow arrow--left"
          data-cy="paginationRight"
          aria-disabled={theLastPage}
          onClick={handleNextPage}
        >
          {theLastPage ? (
            <img
              src="/icons/buttons-icons/ChevronDisabled(Right).svg"
              alt="right"
              className="icon icon__disabled pagination__button"
            />
          ) : (
            <img
              src="/icons/buttons-icons/ChevronDef(Right).svg"
              alt="left"
              className="icon pagination__button"
            />
          )}
        </button>
      </li>
    </ul>
  );
};
