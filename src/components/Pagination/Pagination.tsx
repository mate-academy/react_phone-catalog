import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../helpers/getNumbers';
import { getSearchWith } from '../../helpers/getSearchWith';
import './Pagination.scss';
import { ICONS } from '../../icons';

type Props = {
  total: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = getNumbers(total);

  const handlePreviousPage = useCallback(() => {
    const page = +(searchParams.get('page') || 1);

    setSearchParams(
      getSearchWith(searchParams, { page: (page - 1).toString() }),
    );
  }, [searchParams, setSearchParams]);

  const handleNextPage = useCallback(() => {
    const page = +(searchParams.get('page') || 1);

    setSearchParams(
      getSearchWith(searchParams, { page: (page + 1).toString() }),
    );
  }, [searchParams, setSearchParams]);

  const firstPage = 1;
  const lastPage = pages.length;

  const maxPages = 3;

  const startIndex = currentPage <= maxPages
    ? 1
    : currentPage - (maxPages - 1);
  const lastIndex = Math.min(startIndex + maxPages, lastPage);

  const dots = <div className="pagination__dots">...</div>;

  return (
    <div className="pagination">
      <button
        type="button"
        data-cy="paginationLeft"
        aria-label="prev page"
        className="button button--prev"
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
      >
        <img src={ICONS.arrowLeft} alt="button left" />
      </button>

      <ul className="pagination__list">
        {pages.length > 2 && (
          <>
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  page: firstPage.toString(),
                }),
              }}
              className={classNames(
                'pagination__link', {
                  'pagination__link--active': currentPage === firstPage,
                },
              )}
            >
              <li
                className={classNames('pagination__list-item', {
                  'pagination__list-item--active':
                  currentPage === firstPage,
                })}
              >
                {firstPage}
              </li>
            </Link>
            {currentPage > 3 && dots}
          </>
        )}

        {pages.slice(startIndex, lastIndex).map((page) => (
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: page.toString(),
              }).toString(),
            }}
            key={page}
            className={classNames('pagination__link', {
              'pagination__link--active': currentPage === page,
            })}
          >
            <li
              className={classNames('pagination__list-item',
                { 'pagination__list-item--active': currentPage === page })}
            >
              {page}
            </li>
          </Link>
        ))}

        {lastIndex < lastPage && dots}

        {pages.length - 1 > currentPage && (
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: lastPage.toString(),
              }),
            }}
            className={classNames(
              'pagination__link', {
                'pagination__link--active': currentPage === lastPage,
              },
            )}
          >
            <li
              className={classNames('pagination__list-item',
                { 'pagination__list-item--active': currentPage === lastPage })}
            >
              {lastPage}
            </li>
          </Link>
        )}
      </ul>

      <button
        type="button"
        data-cy="paginationRight"
        aria-label="next page"
        className="button button--next"
        disabled={currentPage === lastPage}
        onClick={handleNextPage}
      >
        <img src={ICONS.arrowRight} alt="button right" />
      </button>
    </div>
  );
};
