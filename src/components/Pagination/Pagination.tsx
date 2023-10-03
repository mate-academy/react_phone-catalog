import React, { useEffect } from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import {
  ReactComponent as ArrowLeft,
} from '../../images/icons/arrow_left.svg';
import {
  ReactComponent as ArrowRigth,
} from '../../images/icons/arrow_rigth.svg';

import { defaultSearchParams } from '../../data/defaultSearchParams';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  pageData: number[];
  fullPageCount: number;
};

export const Pagination: React.FC<Props> = ({ pageData, fullPageCount }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || defaultSearchParams.page;
  const pageToScroll = searchParams.get('page') || '';

  useEffect(() => {
    if (pageToScroll) {
      const products = document.getElementById('products-list');

      products?.scrollIntoView();
    }
  }, [pageToScroll]);

  function getPageLink(value: string) {
    return (
      {
        search: getSearchWith(
          searchParams, {
            page: value || null,
          },
        ),
      }
    );
  }

  function getPrevPage() {
    const newPage = +page > 1 ? `${+page - 1}` : '1';

    return (
      {
        search: getSearchWith(
          searchParams, {
            page: newPage || null,
          },
        ),
      }
    );
  }

  function getNextPage() {
    const newPage = +page < fullPageCount
      ? `${+page + 1}`
      : `${fullPageCount}`;

    return (
      {
        search: getSearchWith(
          searchParams, {
            page: newPage || null,
          },
        ),
      }
    );
  }

  return (
    <div className="pagination" data-cy="pagination">
      <Link
        data-cy="paginationLeft"
        className={cn('pagination__button button button__nav',
          { 'button__nav--pagination--disabled': page === '1' })}
        to={getPrevPage()}
      >
        <ArrowLeft />
      </Link>
      <div className="pagination__links">
        {pageData.map(pageNumber => (
          <Link
            key={pageNumber}
            className={cn(
              'pagination__button button button__nav button__nav--pagination',
              { 'button__nav--pagination--active': +page === pageNumber },
            )}
            to={getPageLink(`${pageNumber}`)}
          >
            {pageNumber}
          </Link>
        ))}
      </div>
      <Link
        data-cy="paginationRight"
        className={cn('pagination__button button button__nav',
          { 'button__nav--pagination--disabled': +page === fullPageCount })}
        to={getNextPage()}
      >
        <ArrowRigth />
      </Link>
    </div>
  );
};
