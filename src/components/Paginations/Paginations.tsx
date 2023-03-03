import React from 'react';
import classNames from 'classnames';
import './Paginations.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void,
};

export const Paginations: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];
  const numberOfPages = Math.ceil(total / perPage);

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="paginations" data-cy="pagination">
      <ul className="paginations__list">
        <li className="paginations__item" data-cy="paginationLeft">
          <button
            type="button"
            className="paginations__button"
            onClick={handlePrevPage}
          >
            {'<'}
          </button>
        </li>

        {pages.map(item => (
          <li
            key={item}
            className="paginations__item"
          >
            <button
              type="button"
              className={classNames(
                'paginations__button',
                {
                  'paginations__button--active': item === currentPage,
                },
              )}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </button>
          </li>
        ))}

        <li className="paginations__item" data-cy="paginationRight">
          <button
            type="button"
            className="paginations__button"
            onClick={handleNextPage}
          >
            {'>'}
          </button>
        </li>
      </ul>
    </div>
  );
};
