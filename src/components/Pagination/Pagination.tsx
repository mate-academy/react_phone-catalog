/* eslint-disable max-len */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (number: number) => void;
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;
  const isCurrentPage = (page: number) => currentPage === page;

  const visiblePage = () => {
    const pages = [];

    const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
    const endPage = Math.min(totalPages, startPage + 3);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return pages;
  };

  const goToPreviousPage = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const selectPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const goToNextPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="phones__pagination pagination">
      <ul className="pagination__list">
        <button
          disabled={firstPage}
          onClick={goToPreviousPage}
          className="pagination__button"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.4712 3.52851C10.2109 3.26816 9.78878 3.26816 9.52843 3.52851L5.52843 7.52851C5.26808 7.78886 5.26808 8.21097 5.52843 8.47132L9.52843 12.4713C9.78878 12.7317 10.2109 12.7317 10.4712 12.4713C10.7316 12.211 10.7316 11.7889 10.4712 11.5285L6.94265 7.99992L10.4712 4.47132C10.7316 4.21097 10.7316 3.78886 10.4712 3.52851Z"
              fill="#0F0F11"
            />
          </svg>
        </button>

        {visiblePage().map(number => (
          <button
            key={number}
            onClick={() => selectPage(number)}
            className={cn('pagination__button', {
              activeCount: currentPage === number,
            })}
            disabled={isCurrentPage(number)}
          >
            {number}
          </button>
        ))}

        <button
          disabled={lastPage}
          onClick={goToNextPage}
          className="pagination__button"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
              fill="#0F0F11"
            />
          </svg>
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
