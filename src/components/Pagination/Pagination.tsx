import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  total: number;
};

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }:
{ pagesCount: number; pagesCutCount: number; currentPage: number }) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);

  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount };
  }

  if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount };
  }

  if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount };
  }

  return { start: currentPage - ceiling + 1, end: currentPage + floor };
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || total;
  const sort = searchParams.get('sort');
  const query = searchParams.get('query');
  const currentPage = +(searchParams.get('page') || '1');
  const totalPages = Math.ceil(total / +perPage);
  const pagesCount = Math.ceil(total / +perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const maxVisiblePages = 5;

  const [start, setStart] = useState(currentPage - 2);
  const [end, setEnd] = useState(currentPage + 2);

  const setPageLimit = () => {
    const pagesCut = getPagesCut({
      pagesCount,
      pagesCutCount: maxVisiblePages,
      currentPage,
    });

    setStart(pagesCut.start);
    setEnd(pagesCut.end);
  };

  useEffect(() => {
    setPageLimit();
  }, [perPage, totalPages, sort, query]);

  useEffect(() => {
    if (currentPage === start || currentPage === end) {
      setPageLimit();
    }
  }, [currentPage]);

  const pages = getNumbers(start, end);

  const onPageChange = (nexPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(nexPage));

    setSearchParams(params);
  };

  return (
    <div className="pagination">
      <div className="pagination__container">
        <ul className="pagination__list">
          <li
            className={cn('pagination__item', {
              'pagination__item--disabled': isFirstPage,
            })}
          >
            <button
              type="button"
              className="pagination__button"
              onClick={() => {
                if (!isFirstPage) {
                  onPageChange(currentPage - 1);
                }
              }}
            >
              <div
                className={cn('icon', 'icon--arrow-left', {
                  'icon--arrow-left-disabled': isFirstPage,
                })}
              />
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={cn('pagination__item', {
                'pagination__item--active': page === currentPage,
              })}
            >
              <button
                type="button"
                className={cn('pagination__button', {
                  'pagination__button--active': page === currentPage,
                })}
                onClick={() => {
                  if (page !== currentPage) {
                    onPageChange(page);
                  }
                }}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={cn('pagination__item', {
              'pagination__item--disabled': isLastPage,
            })}
          >
            <button
              type="button"
              className="pagination__button"
              onClick={() => {
                if (!isLastPage) {
                  onPageChange(currentPage + 1);
                }
              }}
            >
              <div
                className={cn('icon', 'icon--arrow-right', {
                  'icon--arrow-right-disabled': isLastPage,
                })}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
