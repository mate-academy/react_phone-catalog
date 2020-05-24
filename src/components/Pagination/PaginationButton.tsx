import React from 'react';
import cn from 'classnames';

type Props = {
  page: number,
  activePage: number,
  text?: string,
  onPageChange: (page: number) => void,
}

export const PaginationButton: React.FC<Props> = ({
  page,
  activePage,
  text = '',
  onPageChange,
}) => (
  <li>
    <button
      type="button"
      className={cn('pagination-link', {'is-current': page === activePage})}
      aria-label={`Goto page ${page}`}
      onClick={() => onPageChange(page)}
    >
      {text || page}
    </button>
  </li>
);
