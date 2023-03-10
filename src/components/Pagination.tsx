import classNames from 'classnames';
import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: FC<Props> = ({ total, perPage, currentPage }) => {
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
        className={classNames('pagination__item', {
          'pagination__item--disabled': currentPage === numberOfPages[0],
        })}
      >
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="currenColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M5.47136 0.528514C5.21101 0.268165 4.7889 0.268165 4.52855 0.528514L0.528555 4.52851C0.268205 4.78886 0.268205 5.21097 0.528555 5.47132L4.52855 9.47132C4.7889 9.73167 5.21101 9.73167 5.47136 9.47132C5.73171 9.21097 5.73171 8.78886 5.47136 8.52851L1.94277 4.99992L5.47136 1.47132C5.73171 1.21097 5.73171 0.788864 5.47136 0.528514Z"
            fill="currenColor"
          />
        </svg>
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
                className={classNames('pagination__link', {
                  'pagination__link--active': currentPage === n,
                })}
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
        className={classNames('pagination__item', {
          'pagination__item--disabled':
            currentPage === numberOfPages[numberOfPages.length - 1],
        })}
      >
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="currenColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M0.528636 0.528514C0.788986 0.268165 1.2111 0.268165 1.47145 0.528514L5.47145 4.52851C5.73179 4.78886 5.73179 5.21097 5.47145 5.47132L1.47145 9.47132C1.2111 9.73167 0.788986 9.73167 0.528636 9.47132C0.268287 9.21097 0.268287 8.78886 0.528636 8.52851L4.05723 4.99992L0.528636 1.47132C0.268287 1.21097 0.268287 0.788864 0.528636 0.528514Z"
            fill="currenColor"
          />
        </svg>
      </Link>
    </div>
  );
};
