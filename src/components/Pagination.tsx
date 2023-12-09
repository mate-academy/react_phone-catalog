import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowButton } from './ArrowButton';
import { getSearchWith } from '../helpers/searchHelper';

type Props = {
  total: number,
  perPage: number,
  currPage: number,
};

export const Pagination: React.FC<Props> = ({ total, perPage, currPage }) => {
  const [currentPage, setCurrentPage] = useState(currPage || 1);
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });

  const totalPages = Math.ceil(total / perPage);
  const visiblePages: number[] = [];

  useEffect(() => {
    setCurrentPage(currPage || 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currPage]);

  if (totalPages <= 1) {
    return null;
  }

  if (currPage > totalPages) {
    setSearchParams({ page: '1' });
  }

  for (let i = 1; i <= totalPages; i += 1) {
    visiblePages.push(i);
  }

  const leftHandler = () => {
    setSearchParams({ page: `${currentPage - 1}` });
  };

  const rightHandler = () => {
    setSearchParams({ page: `${currentPage + 1}` });
  };

  let currentVisiblePages: number[];

  if (currentPage > 3) {
    currentVisiblePages = visiblePages.slice(currentPage - 3, currentPage + 1);
  } else {
    currentVisiblePages = visiblePages.slice(0, 4);
  }

  return (
    <div className="pagination">
      <Link
        to={{
          search: getSearchWith(searchParams, { page: `${currentPage - 1}` }),
        }}
      >
        <ArrowButton
          direction="left"
          handler={leftHandler}
          disabledButton={currentPage === 1}
        />
      </Link>

      <ul className="pagination__list">
        {currentVisiblePages.map(number => (
          <li
            key={number}
            className={classNames('pagination__item', {
              current: currentPage === number,
            })}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, { page: `${number}` }),
              }}
              className={classNames('pagination__link', {
                current: currentPage === number,
              })}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to={{
          search: getSearchWith(searchParams, { page: `${currentPage + 1}` }),
        }}
      >
        <ArrowButton
          direction="right"
          handler={rightHandler}
          disabledButton={currentPage === totalPages}
        />
      </Link>
    </div>
  );
};
