/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */

import classNames from 'classnames';
import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [, setSearchParams] = useSearchParams();

  const updatePageInUrl = (page: number) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams.toString());

      newSearchParams.set('page', page.toString());

      return newSearchParams;
    });
  };

  const handleLeftArrowClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      updatePageInUrl(currentPage - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      updatePageInUrl(currentPage + 1);
    }
  };

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <button
        className="pagination__left"
        data-cy="paginationLeft"
        type="button"
        disabled={currentPage === 1}
        onClick={handleLeftArrowClick}
      >
        <span className="pagination__icon pagination__left-icon" />
      </button>

      <div className="pagination__list">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            type="button"
            key={index + 1}
            className={classNames('pagination__list-item', {
              active: currentPage === index + 1,
            })}
            onClick={() => {
              onPageChange(index + 1);
              updatePageInUrl(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className="pagination__right"
        data-cy="paginationRight"
        type="button"
        disabled={currentPage === totalPages}
        onClick={handleRightArrowClick}
      >
        <span className="pagination__icon pagination__right-icon" />
      </button>
    </div>
  );
};
