import React, { useMemo } from 'react';
// import { Phones } from '../../types/Phones';
import './pagination.scss';

type Props = {
  itemsPerPage: number,
  currentPage: number,
  countDatas: number,

  onPageChange: (number: number) => void,
  setCurrentPage: (cb: (currentPage: number) => number) => void,

};

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  currentPage,
  countDatas,

  onPageChange,
  setCurrentPage,

}) => {
  const pagesNumbers = useMemo(() => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(countDatas / itemsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [countDatas, itemsPerPage]);

  const numberOfPages = Math.ceil(countDatas / itemsPerPage);

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

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="pagination__page-link"
            // href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={prevPage}
          >
            «
          </button>
        </li>
        {pagesNumbers.map(number => (
          <li className={`pagination__page-item ${currentPage === number ? 'active' : ''}`} key={number}>
            <button
              type="button"
              className="pagination__page-link"
              // href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}

        <li className={`pagination__page-item ${currentPage === numberOfPages ? 'disabled' : ''}`}>
          <button
            type="button"
            className="pagination__page-link"
            // href="#next"
            aria-disabled={currentPage === numberOfPages ? 'true' : 'false'}
            onClick={nextPage}
          >
            »
          </button>
        </li>
      </ul>
    </div>
  );
};
