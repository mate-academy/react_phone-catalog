/* eslint-disable max-len */
import {
  Link,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
// import { useState } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../helpers/getNumbers';
import { Phone } from '../../types/phone';
import { ProductsList } from '../ProductsList';
import './style.scss';

type Props = {
  items: Phone[],
  itemsPerPage: number;
};
// type Props = {
//   // total: number,
//   // perPage: number,
//   numberOfPages: number,
//   currentPage: number,
//   // onPageChange: (page:number) => void,
//   getSearchWith: (params: {
//     [key: string]: string | string[] | null;
//   }) => string
// };

export const Pagination: React.FC<Props> = ({ items, itemsPerPage }) => {
  const itemsPerPageReal = !itemsPerPage ? items.length : itemsPerPage;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const currentPage = +(searchParams.get('page') || '1');
  const totalPages = Math.ceil(items.length / itemsPerPageReal);
  const indexOfLastItem = currentPage * itemsPerPageReal;
  const indexOfFirstItem = indexOfLastItem - itemsPerPageReal;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    mod: 'next' | 'prev',
  ) => {
    event.preventDefault();
    let pageNumber = currentPage;

    switch (mod) {
      case 'prev':
        pageNumber -= 1;
        break;
      case 'next':
      default:
        pageNumber += 1;
        break;
    }

    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  };

  const handlePageLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    const pageNumber = +(event.currentTarget.innerHTML);

    if (pageNumber === currentPage) {
      return;
    }

    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  };

  const buttons = getNumbers(0, totalPages - 1);

  return (
    <div className="pagination">
      <ProductsList data={currentItems} />

      {!!itemsPerPage && (
        <ul className="pagination__links">
          <li
            className={classNames(
              'pagination__itemLi',
              { 'pagination__itemLi--disabled': currentPage === 1 },
            )}
            data-cy="paginationLeft"
          >
            <Link
              to={`${location.pathname}?${searchParams.toString()}`}
              className="pagination__link pagination__link--prev"
              onClick={(event) => handlePageChange(event, 'prev')}
              aria-disabled={currentPage === 1}
            >
              {'<'}
            </Link>
          </li>
          {buttons.map((number) => (
            <li
              className={classNames(
                'pagination__itemLi',
                { 'pagination__itemLi--active': number + 1 === currentPage },
              )}
              key={number}
            >
              <Link
                className="pagination__link"
                to={`${location.pathname}?${searchParams.toString()}`}
                onClick={(event) => handlePageLink(event)}
              >
                {number + 1}
              </Link>
            </li>
          ))}
          <li
            className={classNames(
              'pagination__itemLi',
              { 'pagination__itemLi--disabled': currentPage === totalPages },
            )}
            data-cy="paginationRight"
          >
            <Link
              to={`${location.pathname}?${searchParams.toString()}`}
              className="pagination__link pagination__link--next"
              onClick={(event) => handlePageChange(event, 'next')}
            >
              {'>'}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
