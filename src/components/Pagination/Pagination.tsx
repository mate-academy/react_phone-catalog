import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { getNumbers } from '../../utils/utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pageCount;

  const handlePrevClick = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(pageCount, 5);
  } else if (endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(1, endPage - 4);
  }

  const pagesToShow = getNumbers(startPage, endPage);

  return (
    <ul className="pagination">
      <button
        className={cn('page-item page-link prev', { disabled: firstPage })}
        data-cy="prevLink"
        type="button"
        aria-label="next"
        disabled={firstPage}
        onClick={handlePrevClick}
      />

      {pagesToShow.map((page) => (
        <button
          key={page}
          className={cn('page-item',
            { 'pagination-active': currentPage === page })}
          type="button"
          aria-label="page"
          data-cy="pageLink"
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={cn('page-item page-link next', { disabled: lastPage })}
        type="button"
        aria-label="next"
        data-cy="nextLink"
        disabled={lastPage}
        onClick={handleNextClick}
      />
    </ul>
  );
};
