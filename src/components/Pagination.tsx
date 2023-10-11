import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';
import { getNumbers } from '../helpers/getNumbers';

type Props = {
  quantity: number,
  perPage: number,
  page: string,
};

export const Pagination: React.FC<Props> = ({
  quantity,
  perPage,
  page,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const endPage = Math.ceil(quantity / perPage);
  const pages = getNumbers(1, endPage);

  const handlerPreviousButton = () => {
    if (page !== '1') {
      setSearchParams(
        getSearchWith(searchParams, { page: String(+page - 1) }),
      );
    }
  };

  const handlerOnClickPage = (currentPage: number) => () => {
    if (currentPage !== +page) {
      setSearchParams(
        getSearchWith(searchParams, { page: String(currentPage) }),
      );
    }
  };

  const handlerNextButton = () => {
    if (page !== String(endPage)) {
      setSearchParams(
        getSearchWith(searchParams, { page: String(+page + 1) }),
      );
    }
  };

  return (
    <ul className="pagination" data-cy="pagination">
      <li className="pagination__item">
        <button
          type="button"
          className="button"
          data-cy="paginationLeft"
          onClick={handlerPreviousButton}
          disabled={page === '1'}
        >
          <span
            className={
              `icon ${page === '1' ? 'icon--left-disabled' : 'icon--left'}`
            }
          />
        </button>
      </li>
      {pages.map(pageNumber => (
        <li className="pagination__item" key={pageNumber}>
          <button
            type="button"
            className={classNames(
              'button',
              { 'button--selected': pageNumber === +page },
            )}
            onClick={handlerOnClickPage(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li className="pagination__item">
        <button
          type="button"
          className="button"
          data-cy="paginationRight"
          onClick={handlerNextButton}
          disabled={page === String(endPage)}
        >
          <span
            className={
              `icon ${page === String(endPage) ? 'icon--right-disabled' : 'icon--right'}`
            }
          />
        </button>
      </li>
    </ul>
  );
};
