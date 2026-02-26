import React from 'react';
import style from './pagination.module.scss';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(startPage + 4, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={style.pagination}>
      <ul className={style.pagination_list}>
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={style.pagination_button_arrow}
          >
            <span className={style.pagination_button_iconL}></span>
          </button>
        </li>
        {visiblePages.map(page => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={classNames(style.pagination_button, {
                [style.pagination_active]: page === currentPage,
              })}
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
          >
            <span className={style.pagination_button_iconR}></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
