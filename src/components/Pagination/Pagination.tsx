import React from 'react';
import classNames from '../../utils/classNames';
import { IconButton } from '../IconButton';
import './Pagination.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  sticky?: boolean;
}

function getVisiblePages(current: number, total: number): (number | 'gap')[] {
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages]
    .filter(page => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const result: (number | 'gap')[] = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - (sorted[index - 1] as number) > 1) {
      result.push('gap');
    }

    result.push(page);
  });

  return result;
}

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
  sticky = false,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      className={classNames('pagination', { 'pagination--sticky': sticky })}
      aria-label="Pagination"
    >
      <IconButton
        icon="chevron-left"
        ariaLabel="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <ul className="pagination__list">
        {pages.map((page, index) =>
          page === 'gap' ? (
            <li key={`gap-${index}`} className="pagination__gap">
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={classNames('pagination__page', {
                  'pagination__page--active': page === currentPage,
                })}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ),
        )}
      </ul>

      <IconButton
        icon="chevron-right"
        ariaLabel="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
};
