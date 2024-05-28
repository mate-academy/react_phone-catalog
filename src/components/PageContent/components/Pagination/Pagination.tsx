import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../helpers/getPaginationNumbers';
import classes from './Pagination.module.scss';

export type Props = {
  perPage: number;
  length: number;
  page: number;
  changePage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  length,
  page,
  changePage,
}) => {
  const paginationNumbers = getNumbers(1, Math.ceil(length / perPage));

  if (paginationNumbers.length < 2) {
    return null;
  }

  return (
    <div className={classes.Pagination}>
      <button
        type="button"
        className={classes.Pagination__button}
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        data-cy="paginationLeft"
      >
        <img
          src={`img/icons/Chevron-Left${page !== 1 ? '-black' : ''}.svg`}
          alt="Prev"
        />
      </button>

      <div className={classes.Pagination__pages}>
        {paginationNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            type="button"
            className={classNames(classes.Pagination__button, {
              [classes['Pagination__button--active']]: pageNumber === page,
            })}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={classes.Pagination__button}
        disabled={page === paginationNumbers.length}
        onClick={() => changePage(page + 1)}
        data-cy="paginationRight"
      >
        {page === paginationNumbers.length ? (
          <img src="img/icons/Chevron-Right.svg" alt="Next" />
        ) : (
          <img src="img/icons/Chevron-Right-black.svg" alt="Next" />
        )}
      </button>
    </div>
  );
};
