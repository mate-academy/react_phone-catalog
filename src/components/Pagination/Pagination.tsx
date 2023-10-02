import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { useSearchParams, Link } from 'react-router-dom';
import { generatePageQuantity } from '../../helpers/generatePageQuantity';
import { getSearchWith } from '../../helpers/getSearch';
import { PageNumber } from './RenderPageNumbers';

type Props = {
  productsLength: number,
  pageSize: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  productsLength,
  pageSize,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();

  const pages = generatePageQuantity(productsLength, pageSize);
  const firstPage = 1;
  const lastPage = pages.length - 1;

  return (
    <div className="pagination">
      <Link
        className="pagination__button pagination__button--prev"
        to={{
          search: getSearchWith(searchParams, {
            currentPage: currentPage !== firstPage ? `${currentPage - 1}` : '1',
          }),
        }}
      >
        <div className="pagination__arrow pagination__arrow--left" />
      </Link>

      <Link
        to={{
          search: getSearchWith(searchParams, {
            currentPage: `${firstPage}`,
          }),
        }}
        className={cn('pagination__button', 'pagination__button--page', {
          active: currentPage === firstPage,
        })}
        key={firstPage}
      >
        {1}
      </Link>

      {currentPage > 3 && <div className="pagination__dots">...</div>}

      {PageNumber(pages, currentPage, searchParams)}

      {pages.length - 1 > currentPage
        && <div className="pagination__dots">...</div>}

      <Link
        key={lastPage}
        to={{
          search: getSearchWith(searchParams, {
            currentPage: `${lastPage}`,
          }),
        }}
        className={cn('pagination__button', 'pagination__button--page', {
          active: currentPage === lastPage,
        })}
      >
        {lastPage}
      </Link>

      <Link
        to={{
          search: getSearchWith(searchParams, {
            currentPage:
              currentPage !== lastPage ? `${currentPage + 1}` : `${lastPage}`,
          }),
        }}
        className="pagination__button pagination__button--next"
      >
        <div className="pagination__arrow pagination__arrow--right" />
      </Link>
    </div>
  );
};
