import React from 'react';
import { getNumbers } from '../../utils/heplerFunctions';
import './PaginationProduct.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const PaginationProduct: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numOfPages = Math.ceil(total / perPage);
  const disabledPrev = currentPage === 1;
  const disabledNext = currentPage === numOfPages;

  const handlePrevPage = () => {
    if (!disabledPrev) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!disabledNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <button
        className="pagination--btn-prev"
        disabled={disabledPrev}
        onClick={handlePrevPage}
      >
        <svg className="icon icon-nav">
          <use href="img/icons.svg#icon-arrow-left"></use>
        </svg>
      </button>
      {getNumbers(1, numOfPages).map(num => (
        <NavLink
          className={classNames('pagination__number', {
            'is-active-page': num === currentPage,
          })}
          to={`#${num}`}
          key={num}
          onClick={() => onPageChange(num)}
        >
          {num}
        </NavLink>
      ))}
      <button
        className="pagination--btn-next"
        disabled={disabledNext}
        onClick={handleNextPage}
      >
        <svg className="icon icon-nav">
          <use href="img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
    </>
  );
};
