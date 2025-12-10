import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getPaginationItems } from '../../utils/paginationUtils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(total / perPage);

  if (pageCount <= 1) {
    return;
  }

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', page.toString());
    }

    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = getPaginationItems(currentPage, pageCount);

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__arrow-left"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div className="pagination__list">
        {pages.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span key={`dots-${index}`} className="pagination__dots">
                {page}
              </span>
            );
          }

          return (
            <button
              key={page}
              className={cn('pagination__button', {
                'pagination__button--active': page === currentPage,
              })}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className="pagination__button pagination__arrow-right"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      />
    </div>
  );
};
