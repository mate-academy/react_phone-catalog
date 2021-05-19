import React from 'react';
import classnames from 'classnames';
import { Products } from '../../../../helpers/types';
import './Pagination.scss';

type Pagination = {
  itemsOnPage: string;
  currentPage: string;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onCertainPage: (page: number) => void;
  phones: Products;
};

export const Pagination: React.FC<Pagination> = ({
  itemsOnPage,
  currentPage,
  onNextPage,
  onPreviousPage,
  phones,
  onCertainPage,
}) => {
  const paginationArr = itemsOnPage === 'all'
    ? Array.from(Array(1))
      .map((_el, index) => index + 1)
    : Array.from(Array(Math.ceil(phones.length / +itemsOnPage)))
      .map((_el, index) => index + 1);

  if (paginationArr.length === 1) {
    return null;
  }

  return (
    <div className="Pagination ProductsList-Pagination">
      <button
        type="button"
        name="Left-button"
        onClick={onPreviousPage}
        disabled={+currentPage === 1}
        className={classnames(
          'Pagination-SwitchArrow', 'Pagination-SwitchArrow_left',
          { 'Pagination-SwitchArrow_inactive': +currentPage === 1 },
        )}
      >
        <img
          src={+currentPage === 1
            ? './img/icons/arrow-left-inactive.svg'
            : './img/icons/arrow-left-active.svg'}
          alt="arrow-left"
        />
      </button>
      <div className="Pagination-ValuesBlock">
        {paginationArr.map((pagination) => (
          <button
            key={pagination}
            type="button"
            name="pagination"
            className={classnames('Pagination-Value',
              { 'Pagination-Value_active': +currentPage === pagination })}
            onClick={() => {
              onCertainPage(pagination);
            }}
          >
            {pagination}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onNextPage}
        disabled={Math.ceil(phones.length / +itemsOnPage) === +currentPage}
        className={classnames(
          'Pagination-SwitchArrow', 'Pagination-SwitchArrow_right',
          { 'Pagination-SwitchArrow_inactive': Math.ceil(phones.length / +itemsOnPage) === +currentPage },
        )}
      >
        <img
          src={Math.ceil(phones.length / +itemsOnPage) === +currentPage
            ? './img/icons/arrow-right-inactive.svg'
            : './img/icons/arrow-right-active.svg'}
          alt="arrow-right"
        />
      </button>
    </div>
  );
};
