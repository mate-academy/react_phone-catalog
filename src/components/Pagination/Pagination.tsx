import classNames from 'classnames';
import React from 'react';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (number: number) => void,
  slideNextPage: () => void,
  slidePreviousPage: () => void,
  slideSelectedPage: (number: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  slideNextPage,
  slidePreviousPage,
  slideSelectedPage,
}) => {
  const pageQuantity = Math.ceil(total / perPage);

  const arrTotal = Array.from({ length: pageQuantity }, (_, i) => i + 1);

  return (
    <>
      <div className="pagination-wrapper" data-cy="pagination">
        <div className="pagination-container">
          <div className="pagination-button-container">
            <button
              type="button"
              className="pagination-button-prev"
              data-cy="paginationLeft"
              onClick={() => {
                onPageChange(page - 1);
                slidePreviousPage();
              }}
              disabled={page === 1}
            >
              <i className="fa-solid fa-angle-left" />
            </button>
          </div>
          <div className="pagination-button-container">
            {arrTotal.map(number => (
              <button
                key={number}
                type="button"
                data-cy="paginationRight"
                className={classNames(
                  'pagination-button-page',
                  { 'is-selected-page': number === page },
                )}
                onClick={() => {
                  onPageChange(number);
                  slideSelectedPage(number);
                }}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="pagination-button-container">
            <button
              type="button"
              className="pagination-button-next"
              onClick={() => {
                onPageChange(page + 1);
                slideNextPage();
              }}
              disabled={page === pageQuantity}
            >
              <i className="fa-solid fa-angle-right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
