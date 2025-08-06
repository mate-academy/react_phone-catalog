import React from 'react';
import './paginationControls.scss';
import cn from 'classnames';

type Props = {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationControls: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = 4;

  let startPage = 1;

  if (currentPage <= visiblePages) {
    startPage = 1;
  } else if (currentPage > totalPages - visiblePages + 1) {
    startPage = Math.max(1, totalPages - visiblePages + 1);
  } else {
    startPage = currentPage - visiblePages + 1;
  }

  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="pagination">
      <button
        className={cn('pagination-step-button p-buttons', {
          'not-active': currentPage === 1,
        })}
        onClick={() => {
          onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img src="./img/icons/ArrowLeft.svg" alt="arrow left" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={cn('paginations-page-button p-buttons', {
            'is-active': page === currentPage,
          })}
        >
          {page}
        </button>
      ))}

      <button
        className={cn('pagination-step-button p-buttons', {
          'not-active': currentPage === totalPages,
        })}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });

          setTimeout(() => {
            onPageChange(
              currentPage + 1 < totalPages ? currentPage + 1 : totalPages,
            );
          }, 250);
        }}
      >
        <img src="./img/icons/ArrowRight.svg" alt="arrow right" />
      </button>
    </div>
  );
};
