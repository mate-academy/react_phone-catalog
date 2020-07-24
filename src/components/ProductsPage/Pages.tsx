/* eslint-disable no-plusplus */
import React from 'react';

interface Props {
  length: number;
  perPage: string;
  setPage: (value: string) => (void);
  page: string;
}

export const Pages: React.FC<Props> = ({
  length, perPage, setPage, page,
}) => {
  const pages = [];
  const numberOfPages = Math.ceil(length / +perPage);
  console.log(length, "length")
  for (let i = 1; i < numberOfPages + 1; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button type="button" className="pagination__button"> &#60;</button>
        </li>
        {
          pages.map(number => (
            <li className="pagination__item" key={number}>
              <button
                className={number === +page ? 'activePage pagination__button' : 'non-activePage pagination__button'}
                type="button"
                onClick={() => setPage(`${number}`)}
              >
                {number}
              </button>
            </li>
          ))
        }
        <li className="pagination__item">
          <button type="button" className="pagination__button"> &#62;</button>
        </li>
      </ul>
    </div>
  );
};
