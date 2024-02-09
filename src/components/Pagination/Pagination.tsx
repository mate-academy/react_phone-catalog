import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from '../../icons';

import './Pagination.scss';

type Props = {
  currentPage: number;
  onPageChange: (value: number) => void;
  itemPerPage: number;
  totalItems: number;
};

export function getTotalNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: FC<Props> = ({
  currentPage,
  totalItems,
  onPageChange,
  itemPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / +itemPerPage);
  const pageNumbers = getTotalNumbers(1, totalPages);

  return (
    <>
      <ul className="pagination" data-cy="pagination">
        <>
          <li
            className={cn(
              'pagination__item pagination__item--left',
              { disabled: currentPage <= 1 },
            )}
          >
            <Link
              className="pagination__link"
              data-cy="paginationLeft"
              to={`${currentPage}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
            >
              {currentPage <= 1 ? (
                <ArrowLeft color="#b4bdc3" />
              ) : (
                <ArrowLeft />
              )}
            </Link>
          </li>
          {pageNumbers.map(number => (
            <li
              key={number}
              className="pagination__item"
            >
              <Link
                className={cn(
                  'pagination__link',
                  { pagination__active: currentPage === number },
                )}
                to={`${number}`}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(number);
                }}
              >
                {number}
              </Link>
            </li>
          ))}

          <li
            className={cn(
              'pagination__item pagination__item--rigth',
              { pagination__disabled: currentPage === totalPages },
            )}
          >
            <Link
              className="pagination__link"
              data-cy="paginationRight"
              to={`${currentPage + 1}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
            >
              {currentPage === totalPages ? (
                <ArrowRight color="#b4bdc3" />
              ) : (
                <ArrowRight />
              )}
            </Link>
          </li>
        </>
      </ul>
    </>
  );
};
