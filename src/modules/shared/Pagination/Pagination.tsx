import React from 'react';
import classNames from 'classnames';
import style from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (endPage - startPage + 1 < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 3);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 3);
      }
    }

    return Array.from({ length: 4 }, (_, index) => startPage + index);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={style.pagination} aria-label="Page navigation">
      <ul className={style.pagination_list}>
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={style.pagination_button_arrow}
            aria-label="Previous page"
          >
            <span className={style.pagination_button_iconLeft}></span>
          </button>
        </li>
        {visiblePages.map(page => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={classNames(style.pagination_button, {
                [style.pagination_active]: page === currentPage,
              })}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              <span>{page}</span>
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={style.pagination_button_arrow}
            aria-label="Next page"
          >
            <span className={style.pagination_button_iconRight}></span>
          </button>
        </li>
      </ul>
    </div>
  );
};
