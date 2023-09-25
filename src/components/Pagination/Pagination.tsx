// import { useState } from 'react';
import cn from 'classnames';

import { useSearchParams } from 'react-router-dom';

type Props = {
  pages: number[],
};

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCurrentPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  };

  const currentPage = Number(searchParams.get('page') || '1');

  const handlePrevClick = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;

      handleCurrentPage(newPage);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pages.length) {
      const newPage = currentPage + 1;

      handleCurrentPage(newPage);
    }
  };

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <button
        type="button"
        className={cn('pagination__prev', {
          'pagination__prev-disabled': currentPage === 1,
        })}
        data-cy="paginationLeft"
        onClick={() => handlePrevClick()}
      >
        <img
          className="pagination__prev-img"
          src="new/img/icons/arrow-left.svg"
          alt="arrow-left"
        />
      </button>

      {pages.map(page => (
        <button
          type="button"
          key={page}
          className={cn('pagination__item', {
            'pagination__item-is-active': page === currentPage,
          })}
          onClick={() => handleCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={cn('pagination__next', {
          'pagination__next-disabled': currentPage === pages.length,
        })}
        data-cy="paginationRight"
        onClick={() => handleNextClick()}
      >
        <img
          className="pagination__next-img"
          src="new/img/icons/arrow-right.svg"
          alt="arrow-right"
        />
      </button>
    </div>
  );
};
