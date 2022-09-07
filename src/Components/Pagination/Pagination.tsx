import classNames from 'classnames';
import React from 'react';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: number | string,
  currentPage: number,
  onPageChange: (newPage: number) => void
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / +perPage);
  const pagesArray = Array(pagesAmount).fill(0).map((_, i) => i + 1);

  const disableLeft = currentPage === 1;
  const disableRight = currentPage === pagesAmount;

  return (
    <div data-cy="pagination" className="Pagination">
      <button
        type="button"
        data-cy="paginationLeft"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disableLeft}
        className={classNames(
          'button-small',
          'button-small--left',
          { 'button-small--left--disable': disableLeft },
        )}
        aria-label="Left"
      />
      <div className="Pagination__buttons-container">
        {pagesArray.map((item: number) => (
          <button
            type="button"
            key={item}
            onClick={() => {
              if (item !== currentPage) {
                onPageChange(item);
              }
            }}
            className={classNames(
              'button-small',
              'body-text',
              'body-text--center',
              {
                'body-text--white Pagination__button--active':
                currentPage === item,
              },
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        type="button"
        data-cy="paginationRight"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disableRight}
        className={classNames(
          'button-small',
          'button-small--right',
          { 'button-small--right--disable': disableRight },
        )}
        aria-label="Right"
      />
    </div>
  );
};
