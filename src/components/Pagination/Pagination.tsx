import React from 'react';
import {
  Link,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import './Pagination.scss';
import { getNumber, getSearchWith } from '../../helpers/helper';
import arrowLeft from '../../image/arrow-left.svg';
import arrowLeftDisabled from '../../image/arrow-left-disabled.svg';
import arrowRight from '../../image/arrow-right.svg';
import arrowRightDisabled from '../../image/arrow-right-disabled.svg';

const defaultPage = '1';

type Props = {
  countPagination: number;
};

export const Pagination: React.FC<Props> = React.memo(({ countPagination }) => {
  const [searchParams] = useSearchParams();

  const selectedPage = searchParams.get('page') || defaultPage;
  const isDisabledPrev = selectedPage === defaultPage;
  const isDisabledNext = selectedPage
    === countPagination.toString();

  const togglePage = (value: string) => {
    const currentPage = searchParams.get('page');
    const count = currentPage && +currentPage ? +currentPage : +defaultPage;

    switch (value) {
      case 'prev':
        return getSearchWith(searchParams, { page: (count - 1).toString() });

      case 'next':
        return getSearchWith(searchParams, { page: (count + 1).toString() });

      default:
        return searchParams;
    }
  };

  return (
    <div className="pagination">
      <Link
        to={{
          search: togglePage('prev').toString(),
        }}
        className={classNames(
          'icon',
          { 'icon--disabled': isDisabledPrev },
        )}
        onClick={(e) => (
          isDisabledPrev && e.preventDefault()
        )}
        data-cy="paginationLeft"
      >
        {isDisabledPrev ? (
          <img
            src={arrowLeftDisabled}
            alt="arrow"
            className="icon__arrow"
          />
        ) : (
          <img
            src={arrowLeft}
            alt="arrow"
            className="icon__arrow"
          />
        )}
      </Link>

      {getNumber(
        1, countPagination,
      )
        .map(number => (
          <Link
            to={{
              search: getSearchWith(
                searchParams,
                { page: number.toString() },
              ),
            }}
            key={number}
            className={classNames(
              'pagination__icon',
              {
                'pagination__icon--selected':
                selectedPage === number.toString(),
              },
            )}
          >
            {number}
          </Link>
        ))}

      <Link
        to={{
          search: togglePage('next').toString(),
        }}
        className={classNames(
          'icon', { 'icon--disabled': isDisabledNext },
        )}
        onClick={(e) => (
          isDisabledNext && e.preventDefault()
        )}
        data-cy="paginationRight"
      >
        {isDisabledNext ? (
          <img
            src={arrowRightDisabled}
            alt="arrow"
            className="icon__arrow"
          />
        ) : (
          <img
            src={arrowRight}
            alt="arrow"
            className="icon__arrow"
          />
        )}
      </Link>
    </div>
  );
});
