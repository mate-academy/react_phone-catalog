import React, { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/getSearchWith';
import { getNumbers } from '../../helpers/getNumbers';
import './Pagination.scss';

type Props = {
  pages: number,
};

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = +(searchParams.get('page') || 1);
  const pagesArray = getNumbers(pages);

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
        {pagesArray.map(currPage => (
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
        ))}
      </ul>

      <button
        type="button"
        aria-label="Next page"
        data-cy="paginationRight"
        className="button button--next"
        disabled={selectedPage === pagesArray.length}
        onClick={handleNextPage}
      />
    </div>
  );
};
