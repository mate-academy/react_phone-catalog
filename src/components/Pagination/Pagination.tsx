import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import './pagination.scss';

export type Props = {
  total: number,
  itemsOnPage: number,
  currentPage: number,
};

const DEFAULT_VISIBLE_PAGES = 4;

export const Pagination: React.FC<Props> = ({
  total,
  itemsOnPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const lastPage = Math.ceil(total / itemsOnPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    const adjacentPages = Math.round(DEFAULT_VISIBLE_PAGES / 2);
    let startPage = Math.max(1, currentPage - adjacentPages);
    let endPage = Math.min(lastPage, currentPage + adjacentPages);

    while (endPage - startPage < DEFAULT_VISIBLE_PAGES) {
      if (startPage > 1) {
        startPage -= 1;
      } else if (endPage < lastPage) {
        endPage += 1;
      } else {
        break;
      }
    }

    const numberOfPages = [...Array(endPage - startPage + 1)]
      .map((_, index) => startPage + index);

    setVisiblePages(numberOfPages);
  }, [currentPage, lastPage]);

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
        {visiblePages.map(pageNumber => (
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
