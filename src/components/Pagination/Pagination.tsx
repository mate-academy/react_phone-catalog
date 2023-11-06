/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import { Product } from '../../types/Product';

import './Pagination.scss';

type Props = {
  allProducts: Product[];
};

export const Pagination: React.FC<Props> = ({
  allProducts,
}) => {
  const total = allProducts.length;

  const navigate = useNavigate();
  let totalPaginationPages: number;

  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');

  const getNumbers = (start: number, end: number) => {
    const returnedList = [];

    for (let i = start; i <= end; i += 1) {
      returnedList.push(i);
    }

    return returnedList;
  };

  if (perPage) {
    const perPageNum = +perPage;

    totalPaginationPages = Math.ceil(total / perPageNum);
  } else {
    totalPaginationPages = 0;
  }

  const totalPaginationList = getNumbers(1, totalPaginationPages);

  const handlePaginateClick = (item: number) => {
    if (page === item.toString()) {
      return;
    }

    const newParams = getSearchWith(searchParams, {
      page: item.toString(),
    });

    navigate({ search: newParams });
  };

  const handlePaginationButtonClick = (direction: string) => {
    const pageNum = page ? +page : null;

    if (direction === 'prev' && pageNum) {
      if (pageNum === 1) {
        return;
      }

      const newParams = getSearchWith(searchParams, {
        page: (pageNum - 1).toString(),
      });

      navigate({ search: newParams });
    }

    if (direction === 'next' && pageNum) {
      if (pageNum === totalPaginationPages) {
        return;
      }

      const newParams = getSearchWith(searchParams, {
        page: (pageNum + 1).toString(),
      });

      navigate({ search: newParams });
    }
  };

  return (
    <ul
      data-cy="pagination"
      className={classNames('pagination', {
        'pagination--is-hidden': !totalPaginationPages
          || totalPaginationPages === 1,
      })}
    >
      <button
        type="button"
        className="pagination__button"
        onClick={() => handlePaginationButtonClick('prev')}
        disabled={page === '1'}
        data-cy="paginationLeft"
      >
        <img
          src={page === '1'
            ? 'img/icons/prev-arrow-disabled.svg'
            : 'img/icons/prev-arrow.svg'}
          alt="prev-arrow"
        />
      </button>

      <div className="pagination__list">
        {totalPaginationList.map(item => (
          <li
            key={item}
            className={classNames('pagination__item', {
              'pagination__item--is-active': page ? +page === item : false,
            })}
            onClick={() => handlePaginateClick(item)}
          >
            {item}
          </li>
        ))}
      </div>

      <button
        type="button"
        className="pagination__button"
        onClick={() => handlePaginationButtonClick('next')}
        disabled={page === totalPaginationPages.toString()}
        data-cy="paginationRight"
      >
        <img
          src={page === totalPaginationPages.toString()
            ? 'img/icons/next-arrow-disabled.svg'
            : 'img/icons/next-arrow.svg'}
          alt="next-arrow"
        />
      </button>

    </ul>
  );
};
