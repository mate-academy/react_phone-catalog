import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';
import { ArrowLeftIcon, ArrowRight } from '../../../../components';

type Props = {
  currentPage: number;
  totalPages: number;
  className?: string;
  goToPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  className,
  goToPage,
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
    <div className={`pagination ${className}`}>
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            className={classNames('pagination__button', {
              disabled: currentPage === 1,
            })}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
          >
            <ArrowLeftIcon />
          </button>
        </li>
        {renderPageNumbers().map(pageNumber => (
          <li key={pageNumber} className="pagination__item typography__body">
            <button
              className={classNames('pagination__button', {
                'pagination__button--active': currentPage === pageNumber,
              })}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className="pagination__item">
          <button
            className={classNames('pagination__button', {
              disabled: currentPage === totalPages,
            })}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
          >
            <ArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
};
