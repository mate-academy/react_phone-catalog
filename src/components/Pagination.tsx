// import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from './Context';

export const Pagination = () => {
  const { getPhone } = useAppContext();
  const { itemsOnPage } = useAppContext();
  const { currentPage, setCurrentPage } = useAppContext();

  let totalPageCount = 0;

  if (getPhone && itemsOnPage) {
    totalPageCount = Math.ceil(getPhone.length / itemsOnPage);
  }

  const pageNumber: number[] = [];

  for (let i = 1; i <= totalPageCount; i += 1) {
    pageNumber.push(i);
  }

  const onNext = () => {
    if (currentPage !== (pageNumber.length)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== pageNumber[0]) {
      setCurrentPage(currentPage - 1);
    }
  };

  return pageNumber.length > 1 ? (
    <>
      <ul className="pagination">
        <li className={`pagination__page-item ${currentPage === pageNumber[0] && 'disabled'}`}>
          <a
            className="pagination__page-item__link"
            href="#prev"
            aria-disabled={
              currentPage === (pageNumber.length - 1)
            }
            onClick={onPrevious}
          >
            «
          </a>
        </li>

        {pageNumber.map(number => (
          <li className="pagination__page-item" key={number}>
            <NavLink
              className={`pagination__page-item__link ${currentPage === number && 'pagination__page-item__link--active'}`}
              to={`#${number}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </NavLink>
          </li>
        ))}

        <li className={`pagination__page-item ${currentPage === pageNumber.length && 'disabled'}`}>
          <a
            className="pagination__page-item__link"
            href="#next"
            aria-disabled={
              currentPage === (pageNumber.length - 1)
            }
            onClick={() => onNext()}
          >
            »
          </a>
        </li>
      </ul>
    </>
  ) : null;
};
