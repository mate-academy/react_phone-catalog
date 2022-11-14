/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  itemsPerPage: number,
  totalItems: number,
  paginate: (arg: number) => void,
  nextPage: () => void,
  prevPage: () => void,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  totalItems,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const pageNumbers = [];

  const [activeItem, setActiveItem] = useState(1);

  for (let i = 1; i <= (Math.ceil(totalItems / itemsPerPage)); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination" data-cy="pagination">
        <li className={classNames(
          'pagination__item',
          { 'pagination__item--disabled': currentPage === 1 },
        )}
        >
          <button
            data-cy="paginationLeft"
            className="pagination__link pagination__item--1"
            disabled={currentPage === 1}
            onClick={() => {
              prevPage();
              setActiveItem(activeItem + 1);
            }}
          >
            <img src="img/svg/arrow-left-black.svg" alt="Arrow left" />

          </button>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            className={classNames(
              'pagination__item',
              { 'pagination__item--active': pageNumber === activeItem },
            )}
            key={activeItem}
          >
            <button
              data-cy="pageLink"
              className={classNames(
                'pagination__link',
                'button-text',
                { 'pagination__link--active': pageNumber === activeItem },
              )}
              onClick={() => {
                paginate(pageNumber);
                setActiveItem(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className={classNames(
          'pagination__item pagination__item--2',
          { 'pagination__item--disabled': currentPage === Math.ceil(totalItems / itemsPerPage) },
        )}
        >
          <button
            data-cy="PaginationRight"
            className="pagination__link"
            disabled={Math.ceil(totalItems / itemsPerPage) === currentPage}
            onClick={() => {
              nextPage();
              setActiveItem(activeItem + 1);
            }}
          >
            <img src="img/svg/arrow-right-black.svg" alt="Arrow right" />
          </button>
        </li>
      </ul>
    </>
  );
};
