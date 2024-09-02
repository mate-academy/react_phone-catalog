import React from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const visiblePages = [];
  let startPage = currentPage - 2;
  let endPage = currentPage + 1;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(4, totalPages);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - 3);
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return visiblePages;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = getVisiblePages(currentPage, totalPages);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className={cn('pagination__item', { disabled: currentPage === 1 })}>
          <button
            type="button"
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className="pagination__btn pagination__btn--arrow"
            disabled={currentPage === 1}
          >
            <Icon iconName="icon-arrow-left" />
          </button>
        </li>
        {pageNumbers.map(page => (
          <li key={page} className="pagination__item">
            <button
              type="button"
              onClick={() => onPageChange(page)}
              className={cn('pagination__btn', {
                'pagination__btn--active': page === currentPage,
              })}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={cn('pagination__item', {
            disabled: currentPage === Math.ceil(total / perPage),
          })}
        >
          <button
            type="button"
            onClick={() => {
              if (currentPage !== Math.ceil(total / perPage)) {
                onPageChange(currentPage + 1);
              }
            }}
            className="pagination__btn pagination__btn--arrow"
            disabled={currentPage === Math.ceil(total / perPage)}
          >
            <Icon iconName="icon-arrow-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};
