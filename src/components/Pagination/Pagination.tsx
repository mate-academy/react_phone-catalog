/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */

import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  total: number,
  perPage: number
  arrOfPages: number[],
};

export const Pagination: React.FC<Props> = ({
  arrOfPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const handlePageChange = (num: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: num.toString() }),
    );
  };

  const rightArrowHandler = () => {
    if (+page < arrOfPages[arrOfPages.length - 1]) {
      handlePageChange(+page + 1);
    }
  };

  const leftArrowHandler = () => {
    if (+page > 1) {
      handlePageChange(+page - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'pagination__item', {
          'pagination__item--disabled': +page === 1,
        },
      )}
      >
        <Link
          data-cy="paginationLeft"
          className={classNames(
            'pagination__link pagination__item-arrow', {
              'pagination__link--disabled': +page === 1,
            },
          )}
          to={{
            pathname: './',
            search: searchParams.toString(),
          }}
          aria-disabled={+page === 1 && 'true'}
          onClick={(event) => {
            leftArrowHandler();
            event.preventDefault();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill={+page === 1 ? 'rgba(226, 230, 233, 1)' : '#313237'} />
          </svg>
        </Link>
      </li>
      {arrOfPages.map(num => (
        <li
          className={classNames(
            'pagination__item', { 'pagination__item--active': num === +page },
          )}
          key={num}
        >
          <Link
            className="pagination__link"
            onClick={(event) => {
              event.preventDefault();
              handlePageChange(num);
            }}
            to={{
              pathname: './',
              search: searchParams.toString(),
            }}
          >
            {num}
          </Link>
        </li>
      ))}
      <li className={classNames(
        'pagination__item', {
          'pagination__item--disabled': +page === arrOfPages.length,
        },
      )}
      >
        <Link
          data-cy="paginationRight"
          className={classNames(
            'pagination__link pagination__item-arrow', {
              'pagination__link--disabled': +page === arrOfPages.length,
            },
          )}
          to={{
            pathname: './',
            search: searchParams.toString(),
          }}
          aria-disabled={+page === arrOfPages.length && 'true'}
          onClick={(event) => {
            event.preventDefault();
            rightArrowHandler();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill={+page === arrOfPages.length ? 'rgba(226, 230, 233, 1)' : '#313237'} />
          </svg>
        </Link>
      </li>
    </ul>
  );
};
