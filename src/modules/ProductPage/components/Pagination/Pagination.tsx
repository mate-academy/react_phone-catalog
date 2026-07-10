import React, { useCallback, useMemo } from 'react';
import './Pagination.scss';
import { IconButton } from '../../../shared/components/Buttons/IconButton';
import classNames from 'classnames';

type Props = {
  totalProducts: number;
  perPage: number;
  currentPage: number;
  handleSearchParams: (
    key: 'page' | 'perPage' | 'sort',
    value: string | null,
  ) => void;
};

const PAGINATION_LENGTH = 4;

export const Pagination: React.FC<Props> = ({
  totalProducts,
  perPage,
  currentPage,
  handleSearchParams,
}) => {
  const paginationPage = Math.ceil(currentPage / 4);
  const totalPages = Math.ceil(totalProducts / perPage);

  const pageNumbersShown = useMemo(() => {
    const startNumber = paginationPage * PAGINATION_LENGTH - PAGINATION_LENGTH;
    const pages = Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    ).slice(startNumber, startNumber + PAGINATION_LENGTH);

    return pages;
  }, [paginationPage, totalPages]);

  if (currentPage > totalPages) {
    handleSearchParams('page', '1');
  }

  const getPageNumbersShown = useCallback(
    (arrayNumbers: number[]) => {
      const finalArray: (number | '...')[] = [...arrayNumbers];

      if (arrayNumbers[arrayNumbers.length - 1] < totalPages) {
        finalArray.push('...');
      }

      return finalArray;
    },
    [totalPages],
  );

  return (
    <div className="pagination">
      <IconButton
        className="pagination__button"
        onClick={() => {
          if (currentPage !== 1) {
            handleSearchParams('page', String(currentPage - 1));
          }
        }}
        name="arrow-left"
        disabled={currentPage === 1}
      />
      <div className="pagination__pages">
        {getPageNumbersShown(pageNumbersShown).map(page => (
          <button
            className={classNames('pagination__onePage', {
              'pagination__onePage--is-active': page === currentPage,
            })}
            key={page}
            onClick={() =>
              typeof page === 'number' &&
              handleSearchParams('page', String(page))
            }
          >
            <span
              className={classNames('pagination__number', {
                'pagination__number--is-active': page === currentPage,
              })}
            >
              {page}
            </span>
          </button>
        ))}
      </div>
      <IconButton
        className="pagination__button"
        onClick={() => {
          if (currentPage !== totalPages) {
            handleSearchParams('page', String(currentPage + 1));
          }
        }}
        name="arrow-right"
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
