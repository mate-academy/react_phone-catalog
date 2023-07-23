import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import './pagination.scss';

export type Props = {
  total: number,
  itemsOnPage: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsOnPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const lastPage = Math.ceil(total / itemsOnPage);
  const numberOfPages = new Array(lastPage)
    .fill(1).map((_, index) => (index + 1));

  useEffect(() => {
    if (currentPage > lastPage) {
      setSearchParams((params) => {
        params.set('page', '1');

        return params;
      });
    }
  }, [currentPage, lastPage, setSearchParams]);

  return (
    <div data-cy="pagination" className="pagination">
      <Link
        data-cy="paginationLeft"
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage - 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__arrow pagination__arrow_prev',
          { disabled: currentPage === 1 },
        )}
      />

      <ul className="pagination__list">
        {numberOfPages.map(pageNumber => (
          <li key={pageNumber} className="pagination__item">
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  page: pageNumber.toString(),
                }),
              }}
              className={classNames(
                'pagination__link',
                { active: pageNumber === currentPage },
              )}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        data-cy="paginationRight"
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage + 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__arrow pagination__arrow_next',
          { disabled: currentPage === lastPage },
        )}
      />
    </div>
  );
};
