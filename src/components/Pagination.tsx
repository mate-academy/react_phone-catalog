import React from 'react';
import cn from 'classnames';

export const Pagination = ({
  total,
  perPage,
  page,
  changePage,
}: PaginationProps) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination section__pagination">
      <button
        type="button"
        aria-label="Go left"
        className="pagination__button pagination__button--left"
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
      />
      <ul className="pagination__list">
        {pageNumbers.map(number => (
          <li
            className="pagination__item"
            key={number}
          >
            <button
              type="button"
              onClick={() => changePage(number)}
              className={cn({
                pagination__button: true,
                'pagination__button--active': page === number,
              })}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-label="Go right"
        className="pagination__button pagination__button--right"
        onClick={() => changePage(page + 1)}
        disabled={page === pageNumbers.length}
      />
    </div>
  );
};
