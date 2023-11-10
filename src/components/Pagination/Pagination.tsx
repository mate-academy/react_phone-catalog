import React, { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/getSearchWith';
import './Pagination.scss';
import { usePagination } from '../../hooks/usePagination';

type Props = {
  pages: number,
};

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = +(searchParams.get('page') || 1);
  const pagesArray = usePagination(pages, 1, selectedPage);

  const handlePrevPage = useCallback(() => {
    const currentPage = +(searchParams.get('page') || 1);

    setSearchParams(
      getSearchWith(searchParams, { page: (currentPage - 1).toString() }),
    );
  }, [searchParams, setSearchParams]);

  const handleNextPage = useCallback(() => {
    const currentPage = +(searchParams.get('page') || 1);

    setSearchParams(
      getSearchWith(searchParams, { page: (currentPage + 1).toString() }),
    );
  }, [searchParams, setSearchParams]);

  return (
    <div
      className="Pagination"
      data-cy="pagination"
    >
      <button
        type="button"
        data-cy="paginationLeft"
        aria-label="Prev page"
        className="button button--prev"
        disabled={selectedPage === 1}
        onClick={handlePrevPage}
      />

      <ul className="Pagination__list">
        {pagesArray.map(currPage => {
          if (currPage === 'DOTS') {
            return (
              <li className="Pagination__item">...</li>
            );
          }

          return (
            <Link
              to={{
                search: getSearchWith(
                  searchParams, { page: currPage.toString() },
                ).toString(),
              }}
              className={classNames('Pagination__link', {
                'Pagination__link--active': selectedPage === currPage,
              })}
              key={currPage}
            >
              <li
                className={classNames('Pagination__item button', {
                  'Pagination__item--active': selectedPage === currPage,
                })}
              >
                {currPage}
              </li>
            </Link>
          );
        })}
      </ul>

      <button
        type="button"
        aria-label="Next page"
        data-cy="paginationRight"
        className="button button--next"
        disabled={selectedPage === pagesArray[pagesArray.length - 1]}
        onClick={handleNextPage}
      />
    </div>
  );
};
