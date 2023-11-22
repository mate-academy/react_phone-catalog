import React from 'react';
import cn from 'classnames';

type Props = {
  currentPage: string;
  pagesCount: number;
  onClick: (page: string) => () => void
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  pagesCount,
  onClick,
}) => {
  const returnButtons = (count: number) => {
    let pages = [1, +currentPage - 1, +currentPage, +currentPage + 1, count];

    if (+currentPage === 1 || +currentPage === 2) {
      pages = [1, 2, 3, 4, count];
    }

    if (+currentPage === count - 1 || +currentPage === count) {
      pages = [1, count - 3, count - 2, count - 1, count];
    }

    if (count < 5) {
      pages = [];

      for (let i = 1; i <= count; i += 1) {
        pages.push(i);
      }
    }

    return pages.map(page => (
      <button
        className={cn(
          'pagination__button',
          { 'pagination__button--active': (+currentPage === page) },
        )}
        type="button"
        key={page}
        onClick={onClick(page.toString())}
      >
        {page}
      </button>
      // console.log(page)
    ));
  };

  return (
    <div className="pagination">
      <div className="pagination__container">
        <button
          className="pagination__button pagination__button--left"
          data-cy="paginationLeft"
          aria-label="Button left"
          type="button"
          onClick={onClick((+currentPage - 1).toString())}
          disabled={+currentPage === 1}
        />

        {returnButtons(pagesCount)}

        <button
          className="pagination__button pagination__button--right"
          data-cy="paginationRight"
          aria-label="Button right"
          type="button"
          onClick={onClick((+currentPage + 1).toString())}
          disabled={+currentPage === pagesCount}
        />
      </div>
    </div>
  );
};
