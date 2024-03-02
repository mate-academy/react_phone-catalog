import React from 'react';
import './Pagination.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import {
  getCountPages,
  getFirstIndex,
  getLastIndex,
  getNumbers,
} from '../../api';
import { getSearchWith } from '../../utils/search';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  searchParams: URLSearchParams,
  setSearchParams: (param: URLSearchParams) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  searchParams,
  setSearchParams,
}) => {
  const listPages = getNumbers(1, getCountPages(total, perPage));

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const togglePage = (page: string) => {
    setSearchWith({ page: page || null });
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          listPages.length > 3 && (
            <li
              role="presentation"
              className={cn(
                'pagination__page-item pagination__page-item--arrow', {
                  disabled: currentPage === 1,
                },
              )}
              key={currentPage - 1}
            >
              <Link
                className="pagination__page-link"
                to={{
                  search: getSearchWith(
                    { page: currentPage - 1 }, searchParams,
                  ).toString(),
                }}
                aria-disabled={currentPage === 1}
                onClick={() => togglePage((currentPage - 1).toString())}
              >
                <span className={cn('icon', {
                  'icon--arrow-left-chevron': currentPage === 1,
                  'icon--arrow-left': currentPage !== 1,
                })}
                />
              </Link>
            </li>
          )
        }

        {
          listPages.length < 5 && (
            listPages.map(num => (
              <li
                key={num}
                role="presentation"
                className={cn('pagination__page-item', {
                  active: num === currentPage,
                })}
              >
                <Link
                  className="pagination__page-link"
                  to={{
                    search: getSearchWith(
                      { page: num }, searchParams,
                    ).toString(),
                  }}
                  onClick={() => togglePage(num.toString())}
                >
                  {num}
                </Link>
              </li>
            )))
        }

        {
          listPages.length >= 5 && currentPage >= 3 && (
            <>
              <li
                key={1}
                role="presentation"
                className={cn('pagination__page-item', {
                  active: currentPage === 1,
                })}
              >
                <Link
                  className="pagination__page-link"
                  to={{
                    search: getSearchWith(
                      { page: 1 }, searchParams,
                    ).toString(),
                  }}
                  onClick={() => togglePage('1')}
                >
                  1
                </Link>
              </li>
              <li
                role="presentation"
                className="pagination__page-item"
                key={currentPage - 3}
              >
                <Link
                  className="pagination__page-link"
                  to={{
                    search: getSearchWith({
                      page: currentPage - 3 <= 0
                        ? 1
                        : currentPage - 3,
                    }, searchParams).toString(),
                  }}
                  onClick={() => togglePage((currentPage - 3).toString())}
                >
                  ...
                </Link>
              </li>
            </>
          )
        }

        {
          listPages.length >= 5
          && listPages.slice(
            getFirstIndex(currentPage, listPages.length),
            getLastIndex(currentPage, listPages.length),
          )
            .map(num => (
              <li
                key={num}
                role="presentation"
                className={cn('pagination__page-item', {
                  active: num === currentPage,
                })}
              >
                <Link
                  className="pagination__page-link"
                  to={{
                    search: getSearchWith(
                      { page: num }, searchParams,
                    ).toString(),
                  }}
                  onClick={() => togglePage(num.toString())}
                >
                  {num}
                </Link>
              </li>
            ))
        }

        {
          (listPages.length >= 5 && currentPage < listPages.length - 3) && (
            <>
              <li
                role="presentation"
                className="pagination__page-item"
                key={currentPage + 3}
              >
                <Link
                  className="pagination__page-link"
                  to={{
                    search: getSearchWith({
                      page: currentPage + 3,
                    }, searchParams).toString(),
                  }}
                  onClick={() => togglePage((currentPage + 3).toString())}
                >
                  ...
                </Link>
              </li>

              <li
                key={listPages.length}
                role="presentation"
                className={cn('pagination__page-item', {
                  active: currentPage === listPages.length,
                })}
              >
                <Link
                  className="pagination__page-link"
                  to={{
                    search: getSearchWith(
                      { page: listPages.length }, searchParams,
                    ).toString(),
                  }}
                  onClick={() => togglePage((listPages.length).toString())}
                >
                  {listPages.length}
                </Link>
              </li>
            </>
          )
        }

        {
          listPages.length > 3 && (
            <li
              role="presentation"
              className={cn(
                'pagination__page-item pagination__page-item--arrow', {
                  disabled: currentPage === listPages.length,
                },
              )}
            >
              <Link
                className="pagination__page-link"
                to={{
                  search: getSearchWith(
                    { page: currentPage + 1 }, searchParams,
                  ).toString(),
                }}
                onClick={() => togglePage((currentPage + 1).toString())}
                aria-disabled={currentPage === getCountPages(total, perPage)}
              >
                <span className={cn('icon', {
                  'icon--arrow-right-chevron':
                    currentPage === getCountPages(total, perPage),
                  'icon--arrow-right':
                    currentPage !== getCountPages(total, perPage),
                })}
                />
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  );
};
