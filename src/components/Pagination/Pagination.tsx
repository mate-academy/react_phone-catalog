import React from 'react';
import cn from 'classnames';

import './Pagination.scss';

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
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {/* eslint-disable-next-line */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn('pagination__item pagination__item--prev', {
          'pagination__item--disabled': currentPage === 1,
        })}
        data-cy="paginationLeft"
      />

      {pages.map((page) => (
        /* eslint-disable-next-line */
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn('pagination__item', {
            'pagination__item--active': currentPage === page,
          })}
        >
          {page}
        </button>
      ))}

      {/* eslint-disable-next-line */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn('pagination__item pagination__item--next', {
          'pagination__item--disabled': currentPage === totalPages,
        })}
        data-cy="paginationRight"
      />
    </div>
  );
};

export default Pagination;
