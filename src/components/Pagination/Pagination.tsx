import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  quantity: number,
  perPage: number,
  currentPage: number,
  setCurrentPage: (number: number) => void,
};

export const Pagination: React.FC<Props> = ({
  quantity,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const quantityOfPages = Math.ceil(quantity / perPage);
  const pages: number[] = [];

  for (let i = 1; i <= quantityOfPages; i += 1) {
    pages.push(i);
  }

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <button
        type="button"
        className="button pagination__button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src="./assets/arrow-prev.svg" alt="arrow-prev" />
      </button>

      {pages.map(page => (
        <button
          type="button"
          key={page}
          className={classNames('button pagination__button', {
            'button--is-dark': currentPage === page,
          })}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="button pagination__button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === quantityOfPages}
      >
        <img src="./assets/arrow-next.svg" alt="arrow-prev" />
      </button>
    </div>
  );
};
