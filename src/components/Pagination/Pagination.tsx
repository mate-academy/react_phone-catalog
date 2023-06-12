/* eslint-disable max-len */
import classNames from 'classnames';

import { getNumbers } from '../../helpers/pagination';
import { Button } from '../Button/Button';

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
    <ul key={currentPage} className="pagination" data-cy="pagination">
      <li>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          size="small"
          arrow="left"
          data-cy="paginationLeft"
          alt="Pagination left arrow button"
        />
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
        <Button
          data-cy="paginationRight"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === numberOfPages}
          size="small"
          arrow="right"
          alt="Pagination right arrow button"
        />
      </li>
    </ul>
  );
};
