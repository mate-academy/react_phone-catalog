import React from 'react';
import './Pagination.scss';
import cn from 'classnames';
import { ArrowIcon } from '../Icons/ArrowIcon';
import { NavLink, useLocation } from 'react-router-dom';
import { getPaginationLinks } from '../../utils/paginationHelper';

type Props = {
  total: number;
  itemsPerPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
}) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pageCount = Math.ceil(total / itemsPerPage);
  const pageNumbers = getPaginationLinks(pageCount, currentPage);

  const isHandlePrev = currentPage === 1;
  const isHandleNext = currentPage === pageCount;

  const getPrevSearch = () => {
    params.set('page', String(currentPage - 1));

    return params.toString();
  };

  const getNextSearch = () => {
    params.set('page', String(currentPage + 1));

    return params.toString();
  };

  const getSearchPage = (page: number) => {
    params.set('page', String(page));

    return params.toString();
  };

  const getBackSearchPage = () => {
    params.set('page', String(currentPage - 2));

    return params.toString();
  };

  const getForwardSearchPage = () => {
    params.set('page', String(currentPage + 2));

    return params.toString();
  };

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <NavLink
          className={cn('pagination__link  pagination__link--prev', {
            'pagination__link--disabled': isHandlePrev,
          })}
          to={{ search: getPrevSearch() }}
        >
          <ArrowIcon disabled={isHandlePrev} />
        </NavLink>
      </li>

      {pageNumbers.map(page => {
        if (page === -1) {
          return (
            <li key={-1} className="pagination__item">
              <NavLink
                className={'pagination__link'}
                to={{ search: getBackSearchPage() }}
              >
                ...
              </NavLink>
            </li>
          );
        }

        if (page === 0) {
          return (
            <li key={0} className="pagination__item">
              <NavLink
                className={'pagination__link'}
                to={{ search: getForwardSearchPage() }}
              >
                ...
              </NavLink>
            </li>
          );
        }

        return (
          <li key={page} className="pagination__item">
            <NavLink
              className={cn('pagination__link', {
                'pagination__link--active': currentPage === page,
              })}
              to={{ search: getSearchPage(page) }}
            >
              {page}
            </NavLink>
          </li>
        );
      })}

      <li className="pagination__item">
        <NavLink
          className={cn('pagination__link pagination__link--next', {
            'pagination__link--disabled': isHandleNext,
          })}
          to={{ search: getNextSearch() }}
        >
          <ArrowIcon disabled={isHandleNext} />
        </NavLink>
      </li>
    </ul>
  );
};
