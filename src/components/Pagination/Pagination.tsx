import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Pagination.scss';
import { ArrowRight } from '../../icons/ArrowRight';
import { ArrowLeft } from '../../icons/ArrowLeft';

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
      <ul className="pagination">
        <>
          <li
            className={classNames(
              'pagination__item pagination__item--left',
              { disabled: currentPage <= 1 },
            )}
          >
            <Link
              className={classNames('pagination__link')}
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
              className={classNames('pagination__item')}
            >
              <Link
                className={classNames(
                  'pagination__link',
                  { active: currentPage === number },
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
            className={classNames(
              'pagination__item pagination__item--rigth',
              { disabled: currentPage === totalPages },
            )}
          >
            <Link
              className={
                classNames('pagination__link')
              }
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
