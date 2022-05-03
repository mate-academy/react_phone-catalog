import React from 'react';
import classnames from 'classnames';
import { PaginationType } from '../../helpers/types';
import { NoSelected } from '../NoSelected/NoSelected';
import './Pagination.scss';

export const Pagination: React.FC<PaginationType> = ({
  itemsOnPage,
  currentPage,
  onNextPage,
  onPreviousPage,
  onCertainPage,
  products,
}) => {
  if (!products.length) {
    return <NoSelected />;
  }

  const paginationArr = products.length / +itemsOnPage <= 1
    ? null
    : Array.from(Array(Math.ceil(products.length / +itemsOnPage)), (_el, index) => index + 1);

  if (!paginationArr) {
    return null;
  }

  return (
    <div className="Pagination ProductsList-Pagination" data-cy="pagination">
      <button
        data-cy="paginationLeft"
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
        data-cy="paginationRight"
        type="button"
        onClick={onNextPage}
        disabled={Math.ceil(products.length / +itemsOnPage) === +currentPage}
        className={classnames(
          'Pagination-SwitchArrow', 'Pagination-SwitchArrow_right',
          { 'Pagination-SwitchArrow_inactive': Math.ceil(products.length / +itemsOnPage) === +currentPage },
        )}
      >
        <img
          src={Math.ceil(products.length / +itemsOnPage) === +currentPage
            ? './img/icons/arrow-right-inactive.svg'
            : './img/icons/arrow-right-active.svg'}
          alt="arrow-right"
        />
      </button>
    </div>
  );
};
