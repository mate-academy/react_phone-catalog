import React from 'react';
import classNames from 'classnames';
import './CustomPagination.scss';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 4,
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2),
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination__button pagination__button--nav"
      >
        <svg
          className="svg-left"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={classNames('pagination__button', {
            'pagination__button--active': page === currentPage,
          })}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination__button pagination__button--nav"
      >
        <svg
          className="svg-right"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
