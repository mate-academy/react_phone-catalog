import './Pagination.scss';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams } from '../../types/SearchParams';
import { ITEMS_PER_PAGE } from '../../helpers/constants';
import { getPages } from '../../helpers/pages';
import { getSearchWith } from '../../helpers/searchHelper';

interface Props {
  length: number;
}

export const Pagination: React.FC<Props> = ({ length }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get(SearchParams.PerPage) || ITEMS_PER_PAGE.All;
  const currentPage = +(searchParams.get(SearchParams.Page) || '1');
  const pagesNumber = perPage === ITEMS_PER_PAGE.All
    ? 1
    : Math.ceil(length / +perPage);
  const pages = getPages(pagesNumber);
  const param = SearchParams.Page;
  const leftButtonSearchParams = getSearchWith(
    { [param]: (currentPage - 1).toString() }, searchParams,
  );
  const rightButtonSearchParams = getSearchWith(
    { [param]: (currentPage + 1).toString() }, searchParams,
  );
  const buttonSearchParams = (num: number) => {
    return getSearchWith(
      { [param]: num.toString() }, searchParams,
    );
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesNumber;

  return (
    <div className="pagination">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <Link
        to={{ search: leftButtonSearchParams }}
        className={classNames('pagination__button pagination__button--side', {
          'button--disabled': isFirstPage,
        })}
      >
        {isFirstPage
          ? <i className="icon icon--arrow-left-grey" />
          : <i className="icon icon--arrow-left" />}
      </Link>

      <div className="pagination__pages">
        {pages.map(page => (
          <Link
            to={{ search: buttonSearchParams(page) }}
            className={classNames('pagination__button', {
              'pagination__button--active': currentPage === page,
            })}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <Link
        to={{ search: rightButtonSearchParams }}
        className={classNames('pagination__button pagination__button--side', {
          'button--disabled': isLastPage,
        })}
      >
        {isLastPage
          ? <i className="icon icon--arrow-right-grey" />
          : <i className="icon icon--arrow-right" />}
      </Link>
    </div>
  );
};
