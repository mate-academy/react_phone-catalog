import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Pagination.scss';

type Props = {
  numberOfPages: number,
  currentPage: number,
  setCurrentPage: (x: number) => void,
};

export const Pagination: React.FC<Props> = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}) => {
  const nPages = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    nPages.push(i);
  }

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ul className="pagination" data-cy="pagination">
      <Link
        to="/phones"
        aria-disabled={currentPage === 1}
        onClick={prevPage}
      >
        <li className="pagination__item pagination__item-arrow">
          <span className="icon icon--arrow icon--back" />
        </li>
      </Link>

      {nPages.map(p => (
        <Link
          key={p}
          to="/phones"
          onClick={() => setCurrentPage(p)}
        >
          <li
            className={classNames('pagination__item',
              {
                'pagination__item-active': currentPage === p,
              })}
          >
            {p}
          </li>
        </Link>
      ))}

      <Link
        to="/phones"
        onClick={nextPage}
      >
        <li className="pagination__item pagination__item-arrow">
          <span className="icon icon--arrow icon--next" />
        </li>
      </Link>
    </ul>
  );
};
