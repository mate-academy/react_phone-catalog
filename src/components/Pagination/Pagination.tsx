import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { generatePageNumbers } from '../../helpers/generatePageNumbers';
import { getSearchWith } from '../../helpers/searchHelper';

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

  return (
    <div className="Pagination" data-cy="pagination">
      <Link
        className="Pagination__button Pagination__button--prev"
        data-cy="paginationLeft"
        to={{
          search: getSearchWith(searchParams, { currentPage: currentPage !== 1 ? `${currentPage - 1}` : '1' }),
        }}
      >
        <img src={arrowLeft} alt="previous page button" />
      </Link>
      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          to={{
            search: getSearchWith(searchParams, { currentPage: `${pageNumber}` }),
          }}
          className={cn('Pagination__button', 'Pagination__button--page', {
            active: currentPage === pageNumber,
          })}
        >
          {pageNumber}
        </Link>
      ))}
      <Link
        className="Pagination__button Pagination__button--next"
        data-cy="paginationRight"
        to={{
          search: getSearchWith(searchParams, { currentPage: currentPage !== pages.length ? `${currentPage + 1}` : `${pages.length}` }),
        }}
      >
        <img src={arrowRight} alt="next page button" />
      </Link>
    </div>
  );
};
