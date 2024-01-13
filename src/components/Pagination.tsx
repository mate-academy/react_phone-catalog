/* eslint-disable max-len */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../helpers/utils';
import { getSearchWith } from '../helpers/searchHelper';

type Props = {
  total: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || '');
  const numPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numPages).map(n => n);

  function setSearchWith(params: any) {
    const s = getSearchWith(searchParams, params);

    setSearchParams(s);
  }

  const savePage = (value: number) => {
    setSearchWith({ page: value || null });
  };

  return (
    <ul className="pagination">
      <li className={+currentPage === 1
        ? 'pagination-item disabled'
        : 'pagination-item'}
      >
        <button
          className="pagination__link pagination__link--arrow"
          type="button"
          disabled={currentPage === 1}
          onClick={() => {
            return (+currentPage === 1
              ? null
              : savePage(+currentPage - 1));
          }}
          aria-label="previous"
        >
          <svg className="pageSection__button-arrow" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.47136 0.528606C5.21101 0.268256 4.7889 0.268256 4.52855 0.528606L0.528555 4.52861C0.268205 4.78896 0.268205 5.21107 0.528555 5.47141L4.52855 9.47141C4.7889 9.73176 5.21101 9.73176 5.47136 9.47141C5.73171 9.21107 5.73171 8.78896 5.47136 8.52861L1.94277 5.00001L5.47136 1.47141C5.73171 1.21107 5.73171 0.788955 5.47136 0.528606Z" />
          </svg>
        </button>
      </li>
      {pages.map(num => (
        <li
          key={num}
          className={+currentPage === num
            ? 'pagination-item pagination-item--active'
            : 'pagination-item'}
        >
          <button
            className="pagination__link"
            onClick={() => savePage(num)}
            type="button"
            disabled={currentPage === num}
          >
            {num}
          </button>
        </li>
      ))}
      <li className={+currentPage === numPages
        ? 'pagination-item disabled'
        : 'pagination-item'}
      >
        <button
          className="pagination__link pagination__link--arrow"
          type="button"
          aria-label="next"
          disabled={currentPage === numPages}
          onClick={() => {
            return (currentPage === numPages
              ? null
              : savePage(+currentPage + 1));
          }}
        >
          <svg width="6" className="pageSection__button-arrow" height="10" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" />
          </svg>
        </button>
      </li>
    </ul>
  );
};
