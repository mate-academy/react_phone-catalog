import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { generatePageNumbers } from '../../helpers/generatePageNumbers';
import { getSearchWith } from '../../helpers/searchHelper';
import { renderPages } from './renderPages';

import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';
import './Pagination.scss';

type Props = {
  productsLength: number;
  pageSize: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  productsLength,
  pageSize,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();

  const pages = generatePageNumbers(productsLength, pageSize);
  const firstPage = 1;
  const lastPage = pages.length;

  return (
    <div className="Pagination" data-cy="pagination">
      <Link
        className="Pagination__button Pagination__button--prev"
        data-cy="paginationLeft"
        to={{
          search: getSearchWith(searchParams, {
            currentPage: currentPage !== firstPage ? `${currentPage - 1}` : '1',
          }),
        }}
      >
        <img src={arrowLeft} alt="previous page button" />
      </Link>

      <Link
        key={firstPage}
        to={{
          search: getSearchWith(searchParams, {
            currentPage: `${firstPage}`,
          }),
        }}
        className={cn('Pagination__button', 'Pagination__button--page', {
          active: currentPage === firstPage,
        })}
      >
        {1}
      </Link>

      {currentPage > 3 && <div className="Pagination__dots">...</div>}

      {renderPages(pages, currentPage, searchParams)}

      {pages.length - 1 > currentPage && (
        <div className="Pagination__dots">...</div>
      )}

      <Link
        key={lastPage}
        to={{
          search: getSearchWith(searchParams, {
            currentPage: `${lastPage}`,
          }),
        }}
        className={cn('Pagination__button', 'Pagination__button--page', {
          active: currentPage === lastPage,
        })}
      >
        {lastPage}
      </Link>

      <Link
        className="Pagination__button Pagination__button--next"
        data-cy="paginationRight"
        to={{
          search: getSearchWith(searchParams, {
            currentPage:
              currentPage !== lastPage ? `${currentPage + 1}` : `${lastPage}`,
          }),
        }}
      >
        <img src={arrowRight} alt="next page button" />
      </Link>
    </div>
  );
};
