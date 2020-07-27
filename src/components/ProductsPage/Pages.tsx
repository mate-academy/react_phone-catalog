/* eslint-disable no-plusplus */
import React from 'react';

interface Props {
  length: number;
  perPage: string;
  setPage: (value: string) => (void);
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
            &#60;
          </button>
        </li>
        {
          pages.map(number => (
            <li className="pagination__item" key={number}>
              <button
                className={number === +page ? 'activePage pagination__button button' : 'non-activePage pagination__button button'}
                type="button"
                onClick={() => setPage(`${number}`)}
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
            &#62;
          </button>
        </li>
      </ul>
    </div>
  );
};
