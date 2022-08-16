import React, { useState } from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  handlerClick: (currentPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  handlerClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(total / perPage);
  const arrPages = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="Pagination">
      <button
        type="button"
        className="Pagination__button"
        disabled={currentPage === 1}
        onClick={
          () => {
            setCurrentPage(currentPage - 1);
            handlerClick(currentPage - 1);
          }
        }
      >
        &#60;
      </button>
      <ul
        className="Pagination__pages"
      >
        {arrPages.map(number => (
          <li
            key={number}
            className="Pagination__select-li"
          >
            <button
              type="button"
              className={classNames(`Pagination__select-item + ${currentPage === number
                ? 'Pagination__select-item--selected' : ''
              }`)}
              onClick={() => {
                setCurrentPage(number);
                handlerClick(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="Pagination__button"
        disabled={currentPage === arrPages.length}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          handlerClick(currentPage + 1);
        }}
      >
        &#62;
      </button>
    </div>
  );
};
