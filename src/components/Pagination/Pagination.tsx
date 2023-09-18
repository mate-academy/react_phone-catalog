import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import './Pagination.scss';
import {
  ReactComponent as ArrowLeft,
} from '../../assets/icons/Chevron(ArrowLeft).svg';
import {
  ReactComponent as ArrowRight,
} from '../../assets/icons/Chevron(ArrowRight).svg';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  total: number,
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage')
    || 4;
  const page = searchParams.get('page')
    || 1;

  const pageNumbers = useMemo(() => {
    const numbers = [];

    for (let i = 1; i <= Math.ceil(total / +perPage); i += 1) {
      numbers.push(i);
    }

    return numbers;
  }, [total, perPage]);

  const lastPage = pageNumbers[pageNumbers.length - 1];

  const checkPrevPage = +page === 1
    ? '1'
    : (+page - 1).toString();

  const checkNextPage = +page === lastPage
    ? lastPage.toString()
    : (+page + 1).toString();

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  if (pageNumbers.length <= 1) {
    return null;
  }

  return (
    <>
      <ul className="pagination" data-cy="pagination">
        <li
          className={classNames(
            'pagination__item',
            'pagination__item--prev',
            {
              'pagination__item--disabled': +page === 1,
            },
          )}
          data-cy="paginationLeft"
        >
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: checkPrevPage,
              }),
            }}
            data-cy="prevLink"
            className="pagination__link pagination__link--prev"
            onClick={handleClick}
          >
            <ArrowLeft />
          </Link>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            className={classNames(
              'pagination__item',
              {
                'pagination__item--active': +page === pageNumber,
              },
            )}
            key={pageNumber}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  page: pageNumber.toString(),
                }),
              }}
              data-cy="pageLink"
              className="pagination__link"
              onClick={handleClick}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        <li
          className={classNames(
            'pagination__item',
            'pagination__item--next',
            {
              'pagination__item--disabled': +page === lastPage,
            },
          )}
          data-cy="paginationRight"
        >
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: checkNextPage,
              }),
            }}
            data-cy="nextLink"
            className="pagination__link pagination__link--next"
            onClick={handleClick}
          >
            <ArrowRight />
          </Link>
        </li>
      </ul>
    </>
  );
};
