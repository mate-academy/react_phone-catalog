import React from 'react';
import { Phones } from '../../types/Phones';
import './pagination.scss';

type Props = {
  itemsPerPage: number,
  currentPage: number,
  dataPhones: Phones[],

  onPageChange: (number: number) => void,
  setCurrentPage: (cb: (currentPage: number) => number) => void
};

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  currentPage,
  dataPhones,

  onPageChange,
  setCurrentPage,
}) => {
  // const indexOflastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOflastItem - itemsPerPage;
  // const currentItem = dataPhones.slice(indexOfFirstItem, indexOflastItem);

  // const lastItem = Math.min(itemsPerPage * currentPage, dataPhones.length);
  // const firstItem = itemsPerPage * (currentPage - 1) + 1;

  const pageNumbers = [];
  const numberOfPages = Math.ceil(dataPhones.length / itemsPerPage);

  for (let i = 1; i <= Math.ceil(dataPhones.length / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage((prev: number) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // const range = (start: number, end: number) => {
  //   return [...Array(end).keys()].map((el) => el + start);
  // };

  // const pagesCount = Math.ceil(total / itemsPerPage);
  // const pages = range(1, pagesCount);
  // const liClasses = classNames({
  //   "page-item": true,
  //   active: page === currentPage,
  // });

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="pagination__page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={prevPage}
          >
            «
          </a>
        </li>
        {pageNumbers.map(number => (
          <li className={`pagination__page-item ${currentPage === number ? 'active' : ''}`} key={number}>
            <a
              className="pagination__page-link"
              href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}

        <li className={`pagination__page-item ${currentPage === numberOfPages ? 'disabled' : ''}`}>
          <a
            className="pagination__page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages ? 'true' : 'false'}
            onClick={nextPage}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
