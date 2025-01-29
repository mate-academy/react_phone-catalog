import React from 'react';
import style from './Pagination.module.scss';
import classNames from 'classnames';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';

interface Props {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  className: string;
}

export const Pagination: React.FC<Props> = ({
  className,
  currentPage,
  goToPage,
  totalPages,
}) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      goToPage(page);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
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
            <ArrowLeftIcon active={currentPage === 1} />
          </button>
        </li>
        {renderPageNumbers().map(pageNumber => (
          <li className={style.pagination__item} key={pageNumber}>
            <button
              className={classNames(
                style.pagination__button,
                style.pagination__numberButton,
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
              style.pagination__button,
              style.pagination__arrowButton,
            )}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRightIcon active={currentPage !== totalPages} />
          </button>
        </li>
      </ul>
    </div>
  );
};
