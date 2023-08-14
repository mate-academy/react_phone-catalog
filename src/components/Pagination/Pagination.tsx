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
    const pages = [];

    for (let i = 1; i <= count; i += 1) {
      pages.push(i);
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
