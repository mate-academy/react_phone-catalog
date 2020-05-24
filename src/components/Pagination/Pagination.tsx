import React from 'react';
import {
  useLocation,
  Redirect,
  useHistory,
} from 'react-router-dom';
import cn from 'classnames';

import './Pagination.scss';

type Props = {
  qty: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({ qty, perPage }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get('page'));
  const currentSort = searchParams.get('sortBy');
  const pages = Array(Math.ceil(qty / Number(perPage))).fill(0, 0, qty).map((p, i) => p + i + 1);

  const handleClick = (page: number) => {
    currentSort && searchParams.set('sortBy', currentSort);
    searchParams.set('page', `${page}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  if (currentPage <= 0) {
    return (
      <Redirect
        to={{
          pathname: `${location.pathname}`,
          search: `?page=1&perPage=${perPage}`,
        }}
      />
    );
  }

  if (currentPage > pages.length) {
    return (
      <Redirect
        to={{
          pathname: `${location.pathname}`,
          search: `?page=${pages.length}&perPage=${perPage}`,
        }}
      />
    );
  }

  const getArrow = (type: string) => {
    if (type === 'prev' && currentPage > 1) {
      return (
        <button
          type="button"
          className="Pagination__Button Pagination__Button--arrow-left"
          onClick={() => handleClick(currentPage - 1)}
        />
      );
    }

    if (type === 'prev') {
      return (
        <div className="
          Pagination__Button
          Pagination__Button--arrow-left
          Pagination__Button--disabled"
        />
      );
    }

    if (type === 'next' && currentPage < pages.length) {
      return (
        <button
          type="button"
          className="Pagination__Button Pagination__Button--arrow-right"
          onClick={() => handleClick(currentPage + 1)}
        />
      );
    }

    if (type === 'next') {
      return (
        <div className="
          Pagination__Button
          Pagination__Button--arrow-right
          Pagination__Button--disabled"
        />
      );
    }

    return '';
  };

  return (
    <nav className="Pagination">
      <ul className="Pagination__List">
        <li className="Pagination__Item">
          {getArrow('prev')}
        </li>
        {pages.map(page => (
          <li className="Pagination__Item" key={page}>
            <button
              type="button"
              className={cn({
                Pagination__Button: true,
                'Pagination__Button--active': page === currentPage,
              })}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className="Pagination__Item">
          {getArrow('next')}
        </li>
      </ul>
    </nav>
  );
};
