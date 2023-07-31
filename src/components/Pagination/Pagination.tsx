import React from 'react';
import cn from 'classnames';

import { generatePageNumbers } from '../../helpers/generatePageNumbers';

import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';
import './Pagination.scss';

type Props = {
  phonesLength: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
};

export const Pagination: React.FC<Props> = ({
  phonesLength,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  const handlePaginationButtonClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePaginationLeftClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePaginationRightClick = () => {
    const maxPage = Math.ceil(phonesLength / pageSize);

    if (currentPage < maxPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const pages = generatePageNumbers(phonesLength, pageSize);

  return (
    <div className="Pagination" data-cy="pagination">
      <button
        type="button"
        className="Pagination__button Pagination__button--prev"
        onClick={handlePaginationLeftClick}
        data-cy="paginationLeft"
      >
        <img src={arrowLeft} alt="previous page button" />
      </button>
      {pages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={cn('Pagination__button', 'Pagination__button--page', {
            active: currentPage === pageNumber,
          })}
          onClick={() => handlePaginationButtonClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        className="Pagination__button Pagination__button--next"
        onClick={handlePaginationRightClick}
        data-cy="paginationRight"
      >
        <img src={arrowRight} alt="next page button" />
      </button>
    </div>
  );
};
