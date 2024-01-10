import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/serchWith';
import './Pagination.scss';
import { goTop } from '../../helpers/goTop';

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
  const pages = [];

  for (let n = 1; n <= lastPage; n += 1) {
    pages.push(n);
  }

  let visiblePages;

  if (pages.length <= 5) {
    visiblePages = pages;
  } else if (currentPage < 3) {
    visiblePages = [...pages.slice(0, 3), ...pages.slice(-1)];
  } else if (currentPage > pages.length - 2) {
    visiblePages = [...pages.slice(0, 1), ...pages.slice(-3)];
  } else {
    visiblePages = [
      ...pages.slice(0, 1),
      ...pages.slice(currentPage - 2, currentPage + 1),
      ...pages.slice(-1),
    ];
  }

  useEffect(() => {
    goTop();
  }, [currentPage]);

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
              currentPage === pages[0],
          },
        )}
      >
        <img src="img/mine/icons/Arrow Left.svg" alt="arrowLeft" />
      </Link>

      <ul className="pagination__list">
        {visiblePages.map((n) => {
          const numberPage = n.toString();

          return (
            <>
              {n === pages.length
                && currentPage < pages.length - 2
                && pages.length > 5
                && (
                  <span className="pagination__dots">...</span>
                )}

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

              {n === 1
                && currentPage > 3
                && pages.length > 5
                && (
                  <span className="pagination__dots">...</span>
                )}
            </>
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
            currentPage === pages[pages.length - 1],
          },
        )}
      >
        <img src="img/mine/icons/Arrow Right.svg" alt="arrowRigth" />
      </Link>
    </div>
  );
};
