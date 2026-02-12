import React from 'react';
import style from './Pagination.module.scss';
import classNames from 'classnames';
import { ArrowIconLeft } from '../Icons/ArrowIconLeft';
import { ArrowIconRight } from '../Icons/ArrowIconRight';

interface Props {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  className: string;
}

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  goToPage,
  className,
}) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      goToPage(page);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumber = () => {
    const pageNumbers = [];
    const maxVisiblePage = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePage / 2));
    let endPage = startPage + maxVisiblePage - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePage + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={`${style.pagination} ${className}`}>
      <ul className={style.pagination__list}>
        <li className={style.pagination__item}>
          <button
            className={classNames(
              style.pagination__arrowButton,
              style.pagination__button,
            )}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowIconLeft active={currentPage === 1} />
          </button>
        </li>

        {renderPageNumber().map(pageNumber => (
          <li key={pageNumber} className={style.pagination__item}>
            <button
              className={classNames(
                style.pagination__numberButton,
                style.pagination__button,
                {
                  [style.pagination__button_active]: currentPage === pageNumber,
                },
              )}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        <li className={style.pagination__item}>
          <button
            className={classNames(
              style.pagination__arrowButton,
              style.pagination__button,
            )}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowIconRight active={currentPage !== totalPages} />
          </button>
        </li>
      </ul>
    </div>
  );
};
