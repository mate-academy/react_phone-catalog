import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/serchWith';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams('');
  const lastPage = Math.ceil(total / perPage);
  const numberOfPages = [];

  for (let n = 1; n <= lastPage; n += 1) {
    numberOfPages.push(n);
  }

  return (
    <div className="pagination">
      <Link
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage - 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__arrow',
          {
            'pagination__arrow-left--disabled':
              currentPage === numberOfPages[0],
          },
        )}
      >
        <img src="img/mine/icons/Arrow Left.svg" alt="arrowLeft" />
      </Link>

      <ul className="pagination__list">
        {numberOfPages.map((n) => {
          const numberPage = n.toString();

          return (
            <li key={numberPage} className="pagination__item">
              <Link
                to={{
                  search: getSearchWith(searchParams, { page: numberPage }),
                }}
                className={classNames(
                  'pagination__link',
                  {
                    'pagination__link--active': currentPage === n,
                  },
                )}
              >
                {numberPage}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage + 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__arrow',
          {
            'pagination__arrow-right--disabled':
            currentPage === numberOfPages[numberOfPages.length - 1],
          },
        )}
      >
        <img src="img/mine/icons/Arrow Right.svg" alt="arrowRigth" />
      </Link>
    </div>
  );
};
