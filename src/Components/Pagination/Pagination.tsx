import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationButtons: React.FC<Props> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const handleLeft = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const handleRight = () => {
    if (currentPage === pageCount) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button className="pagination__arrow button--arrow" onClick={handleLeft}>
        <img src="icons/arrow_left.svg" alt="Arrow left" />
      </button>

      <div className="pagination__pages">
        {Array.from(Array(pageCount)).map((_, index) => {
          const pageIndex = index + 1;

          const handlePage = () => {
            onPageChange(pageIndex);
          };

          return (
            <button
              key={pageIndex}
              className={classNames('pagination__page-button button--arrow', {
                'pagination__page-button--selected': currentPage === pageIndex,
              })}
              onClick={handlePage}
            >
              <p className="body-text">{pageIndex}</p>
            </button>
          );
        })}
      </div>

      <button className="pagination__arrow button--arrow" onClick={handleRight}>
        <img src="icons/arrow_right.svg" alt="Arrow right" />
      </button>
    </div>
  );
};
