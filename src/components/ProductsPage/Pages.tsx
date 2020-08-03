/* eslint-disable no-plusplus */
import React from 'react';

interface Props {
  length: number;
  perPage: string;
  setPage: (value: string, option: string) => (void);
  changePage: (option: string) => (void);
  page: string;
}

export const Pages: React.FC<Props> = ({
  length, perPage, setPage, page, changePage,
}) => {
  const pages = [];
  const numberOfPages = Math.ceil(length / +perPage);

  for (let i = 1; i < numberOfPages + 1; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            onClick={() => changePage('back')}
            disabled={+page === 1}
            type="button"
            className="pagination__button button"
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.47136 0.528636C5.21101 0.268287 4.7889 0.268287 4.52855 0.528636L0.528555 4.52864C0.268205 4.78899 0.268205 5.2111 0.528555 5.47145L4.52855 9.47145C4.7889 9.7318 5.21101 9.7318 5.47136 9.47145C5.73171 9.2111 5.73171 8.78899 5.47136 8.52864L1.94277 5.00004L5.47136 1.47145C5.73171 1.2111 5.73171 0.788986 5.47136 0.528636Z"
                fill={+page === 1 ? '#B4BDC4' : 'black'}
              />
            </svg>
          </button>
        </li>
        {
          pages.map(number => (
            <li className="pagination__item" key={number}>
              <button
                className={number === +page ? 'activePage pagination__button button' : 'non-activePage pagination__button button'}
                type="button"
                onClick={() => setPage(`${number}`, 'page')}
              >
                {number}
              </button>
            </li>
          ))
        }
        <li className="pagination__item">
          <button
            onClick={() => changePage('forward')}
            disabled={+page === pages.length}
            type="button"
            className="button pagination__button"
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528636 0.528636C0.788986 0.268287 1.2111 0.268287 1.47145 0.528636L5.47145 4.52864C5.73179 4.78899 5.73179 5.2111 5.47145 5.47145L1.47145 9.47145C1.2111 9.7318 0.788986 9.7318 0.528636 9.47145C0.268287 9.2111 0.268287 8.78899 0.528636 8.52864L4.05723 5.00004L0.528636 1.47145C0.268287 1.2111 0.268287 0.788986 0.528636 0.528636Z"
                fill={+page === pages.length ? '#B4BDC4' : 'black'}
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};
