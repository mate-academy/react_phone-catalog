/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import './Pagination.scss';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  setSearchParams: (page: URLSearchParams) => void,
  searchParams: URLSearchParams
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setSearchParams,
  searchParams,
}) => {
  const numberPage: number = Math.ceil(total / perPage);
  const countArr: number[] = [];
  const count = useMemo(() => {
    for (let i = 1; i <= numberPage; i += 1) {
      countArr.push(i);
    }

    return countArr;
  }, [numberPage]);

  function changeCheck(numPage: string) {
    if (+numPage > 0 && +numPage <= numberPage && +numPage !== +currentPage) {
      const newSearchParamsS = getSearchWith(
        searchParams, { page: (numPage || 1).toString() },
      );
      const newSearchParams = new URLSearchParams(newSearchParamsS);

      setSearchParams(newSearchParams);
    }
  }

  const handlePageClick = (item: string) => {
    const newSearchParamsS = getSearchWith(
      searchParams, { page: (item || 1).toString() },
    );
    const newSearchParams = new URLSearchParams(newSearchParamsS);

    setSearchParams(newSearchParams);
  };

  return (
    <ul className="pagination">
      <li
        className={
          classNames('pagination-item', { disabled: +currentPage === 1 })
        }
      >
        <NavLink
          data-cy="paginationLeft"
          className="pagination-link"
          to={
            {
              search: getSearchWith(searchParams,
                { page: (+currentPage - 1).toString() }),
            }
          }
          aria-disabled={+currentPage === 1}
          onClick={() => {
            changeCheck((+currentPage - 1).toString());
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52851C10.211 3.26816 9.7889 3.26816 9.52855 3.52851L5.52855 7.52851C5.26821 7.78886 5.26821 8.21097 5.52855 8.47132L9.52855 12.4713C9.7889 12.7317 10.211 12.7317 10.4714 12.4713C10.7317 12.211 10.7317 11.7889 10.4714 11.5285L6.94277 7.99992L10.4714 4.47132C10.7317 4.21097 10.7317 3.78886 10.4714 3.52851Z" fill="#313237" />
          </svg>
        </NavLink>
      </li>

      {count.map(item => (
        <li
          className="pagination-item"
          key={item}
        >
          <NavLink
            data-cy="pageLink"
            className={classNames('pagination-link', {
              'pagination-link-active': item === currentPage,
            })}
            to={
              { search: getSearchWith(searchParams, { page: item.toString() }) }
            }
            onClick={() => {
              handlePageClick(item.toString());
            }}
          >
            {item}
          </NavLink>
        </li>
      ))}

      <li className={classNames('pagination-item',
        { disabled: +currentPage === numberPage })}
      >
        <NavLink
          data-cy="paginationRight"
          className="pagination-link"
          to={
            {
              search: getSearchWith(searchParams,
                { page: (+currentPage + 1).toString() }),
            }
          }
          aria-disabled={+currentPage === numberPage}
          onClick={() => {
            changeCheck((currentPage + 1).toString());
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52851C5.78899 3.26816 6.2111 3.26816 6.47145 3.52851L10.4714 7.52851C10.7318 7.78886 10.7318 8.21097 10.4714 8.47132L6.47145 12.4713C6.2111 12.7317 5.78899 12.7317 5.52864 12.4713C5.26829 12.211 5.26829 11.7889 5.52864 11.5285L9.05723 7.99992L5.52864 4.47132C5.26829 4.21097 5.26829 3.78886 5.52864 3.52851Z" fill="#313237" />
          </svg>
        </NavLink>
      </li>
    </ul>
  );
};
