import React from 'react';
import pagination from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const VISIBLE_COUNT = 4;

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const half = Math.floor(VISIBLE_COUNT / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + VISIBLE_COUNT - 1);

  start = Math.max(1, end - VISIBLE_COUNT + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className={pagination.pagination}>
      <ul className={pagination.pagination__list}>
        <li
          className={`${pagination.pagination__item} ${pagination['pagination__item--prev']} ${currentPage === 1 ? pagination['pagination__item--prev--disabled'] : ''}`}
        >
          <button
            className={`${pagination.pagination__link} ${pagination['pagination__link--prev']}`}
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            <span
              className={`${pagination.pagination__icon} ${pagination['pagination__icon--prev']} ${currentPage === 1 ? pagination['pagination__icon--prev--disabled'] : ''}`}
            ></span>
          </button>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`${pagination.pagination__item} ${currentPage === page ? `${pagination['pagination__item--active']}` : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.pagination__item} ${pagination['pagination__item--next']} ${currentPage === totalPages ? pagination['pagination__item--next--disabled'] : ''}`}
        >
          <button
            className={`${pagination.pagination__link} ${pagination['pagination__link--next']}`}
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            <span
              className={`${pagination.pagination__icon} ${pagination['pagination__icon--next']} ${currentPage === totalPages ? pagination['pagination__icon--next--disabled'] : ''}`}
            ></span>
          </button>
        </li>
      </ul>
    </div>
  );
};
