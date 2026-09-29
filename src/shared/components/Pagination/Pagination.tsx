import React from 'react';
import { getMobilePaginationPages, DOTS } from './getMobilePaginationPages';

import { IconButton } from '@/shared/components/Buttons/components/IconButton';
import { ArrowIcon } from '@/shared/assets/icons';

import cn from 'classnames';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const visiblePages = getMobilePaginationPages(totalPages, currentPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <IconButton
        type="button"
        className={cn('pagination__button', 'pagination__button--prev', {
          'pagination__button--disabled': currentPage === 1,
        })}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ArrowIcon className="pagination__arrow pagination__arrow--prev" />
      </IconButton>

      <ul className="pagination__list">
        {visiblePages.map((page, index) => {
          if (page === DOTS) {
            return (
              <li key={`dots-${index}`} className="pagination__item">
                <span className="pagination__dots">&#8230;</span>
              </li>
            );
          }

          const pageNumber = page as number;

          return (
            <li key={pageNumber} className="pagination__item">
              <IconButton
                type="button"
                className={cn('pagination__button', {
                  'pagination__button--active': pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
              >
                {pageNumber}
              </IconButton>
            </li>
          );
        })}
      </ul>

      <IconButton
        type="button"
        className={cn('pagination__button', 'pagination__button--next', {
          'pagination__button--disabled': currentPage === totalPages,
        })}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ArrowIcon className="pagination__arrow pagination__arrow--next" />
      </IconButton>
    </nav>
  );
};
