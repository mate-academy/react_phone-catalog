/* eslint-disable max-len */
import classNames from 'classnames';
import leftArrow from '../../assets/l_arrow.svg';
import rightArrow from '../../assets/r_arrow.svg';
import { getNumbers } from '../../helpers/pagination';

import './Pagination.scss';

type PaginationProps = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const numberOfPages = perPage === 'all' ? 1 : Math.ceil(total / +perPage);

  const pages = getNumbers(1, numberOfPages);

  return (
    <ul key={currentPage} className="pagination">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination__button"
          type="button"
          disabled={currentPage === 1}
        >
          <img
            className="pagination__icon"
            src={leftArrow}
            alt="Sliders left arrow button"
          />
        </button>
      </li>

      <li>
        <ul className="pagination__pages-container">
          {pages.map((page) => (
            <li key={page} className="pagination__page">
              <button
                type="button"
                className={classNames(
                  'pagination__button',
                  'pagination__button--color',
                  { 'pagination__button--active': page === currentPage },
                )}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </li>

      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination__button"
          type="button"
          disabled={currentPage === numberOfPages}
        >
          <img
            className="pagination__icon"
            src={rightArrow}
            alt="Sliders right arrow button"
          />
        </button>
      </li>
    </ul>
  );
};
