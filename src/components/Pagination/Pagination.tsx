import React, { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers } from '../../helpers/getNumbers';
import { getSearchWith } from '../../helpers/getSearchWith';
import './Pagination.scss';
import { ICONS } from '../../icons';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = +(searchParams.get('page') || 1);
  const pages = getNumbers(total);

  const handlePreviousPage = useCallback(() => {
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
    <div className="pagination" data-cy="pagination">
      <button
        type="button"
        data-cy="paginationLeft"
        aria-label="prev page"
        className="button button--prev"
        disabled={selectedPage === 1}
        onClick={handlePreviousPage}
      >
        <img src={ICONS.arrowLeft} alt="button left" />
      </button>

      <ul className="pagination__list">
        {pages.map((page) => (
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: page.toString(),
              }).toString(),
            }}
            key={page}
            className={classNames('pagination__link', {
              'pagination__link--active': selectedPage === page,
            })}
          >
            <li
              className={classNames('pagintaion__list-item',
                { 'pagination__list-item--active': selectedPage === page })}
              key={page}
            >
              {page}
            </li>
          </Link>
        ))}
      </ul>

      <button
        type="button"
        data-cy="paginationRight"
        aria-label="next page"
        className="button button--next"
        disabled={selectedPage === pages.length}
        onClick={handleNextPage}
      >
        <img src={ICONS.arrowRight} alt="button right" />
      </button>
    </div>
  );
};
