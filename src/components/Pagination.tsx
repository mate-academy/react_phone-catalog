/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
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
  const [activeItem, setActiveItem] = useState(1);

  const pageNumbers = [];

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
              setActiveItem(activeItem - 1);
            }}
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.47136 0.528514C5.21101 0.268165 4.7889 0.268165 4.52855 0.528514L0.528555 4.52851C0.268205 4.78886 0.268205 5.21097 0.528555 5.47132L4.52855 9.47132C4.7889 9.73167 5.21101 9.73167 5.47136 9.47132C5.73171 9.21097 5.73171 8.78886 5.47136 8.52851L1.94277 4.99992L5.47136 1.47132C5.73171 1.21097 5.73171 0.788864 5.47136 0.528514Z" fill="#313237" />
            </svg>

          </button>
        </li>

        {pageNumbers.map(num => (
          <li
            className={classNames(
              'pagination__item',
              { 'pagination__item--active': num === activeItem },
            )}
            key={num}
          >
            <button
              data-cy="pageLink"
              className={classNames(
                'pagination__link',
                'button-text',
                { 'pagination__link--active': num === activeItem },
              )}
              onClick={() => {
                paginate(num);
                setActiveItem(num);
              }}
            >
              {num}
            </button>
          </li>
        ))}
        <li className={classNames(
          'pagination__item pagination__item--2',
          { 'pagination__item--disabled': currentPage === Math.ceil(totalItems / itemsPerPage) },
        )}
        >
          <button
            data-cy="paginationRight"
            className="pagination__link"
            disabled={Math.ceil(totalItems / itemsPerPage) === currentPage}
            onClick={() => {
              nextPage();
              setActiveItem(activeItem + 1);
            }}
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528514C0.788986 0.268165 1.2111 0.268165 1.47145 0.528514L5.47145 4.52851C5.73179 4.78886 5.73179 5.21097 5.47145 5.47132L1.47145 9.47132C1.2111 9.73167 0.788986 9.73167 0.528636 9.47132C0.268287 9.21097 0.268287 8.78886 0.528636 8.52851L4.05723 4.99992L0.528636 1.47132C0.268287 1.21097 0.268287 0.788864 0.528636 0.528514Z" fill="#313237" />
            </svg>

          </button>
        </li>
      </ul>
    </>
  );
};
