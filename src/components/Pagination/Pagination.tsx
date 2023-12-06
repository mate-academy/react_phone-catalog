/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './Pagination.scss';
import { getNumbers } from '../../helpers/utils/getNumbers';

type Props = {
  totalItems: number,
  onPage: number,
};

export const Pagination: React.FC<Props> = ({ totalItems, onPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  const numberOfPages = Math.ceil(totalItems / onPage) || 1;
  const currentPage = Number(page) || 1;

  const pageItems = getNumbers(1, numberOfPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      searchParams.set('page', (currentPage - 1).toString());
      setSearchParams(searchParams);
    }
  };

  const handlePageChange = (selectedPage: number) => {
    searchParams.set('page', selectedPage.toString());
    setSearchParams(searchParams);
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      searchParams.set('page', (currentPage + 1).toString());
      setSearchParams(searchParams);
    }
  };

  return (
    <ul data-cy="pagination" className="Pagination">
      <li className="Pagination__item">
        <button
          data-cy="paginationLeft"
          type="button"
          className={classNames('Pagination__arrow Pagination__arrow--left', {
            'Pagination__arrow--disabled': isFirstPage,
          })}
          onClick={handlePreviousPage}
          disabled={isFirstPage}
        />
      </li>

      {pageItems.map(pageItem => (
        <li key={pageItem} className="Pagination__item">
          <button
            type="button"
            className={classNames('Pagination__link', {
              'Pagination__link--active': pageItem === currentPage,
            })}
            onClick={() => handlePageChange(pageItem)}
          >
            {pageItem}
          </button>
        </li>
      ))}

      <li className="Pagination__item">
        <button
          data-cy="paginationRight"
          type="button"
          className={classNames('Pagination__arrow', {
            'Pagination__arrow--disabled': isLastPage,
          })}
          onClick={handleNextPage}
          disabled={isLastPage}
        />
      </li>
    </ul>
  );
};
