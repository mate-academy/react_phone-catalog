import { useMemo } from 'react';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { getPageNumbers } from '../../utils/getPageNumbers';

import './Pagination.scss';

interface Prop {
  total: number,
  perPage: number,
  currentPage: number,
}
export const Pagination: React.FC<Prop> = ({
  total,
  perPage,
  currentPage,
}) => {
  const totalPages = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [total, perPage]);

  const pageNumbers = useMemo(() => {
    return getPageNumbers(1, totalPages);
  }, [totalPages]);

  return (
    <div
      className="Pagination"
      data-cy="pagination"
    >
      <div
        className={cn(
          'Icon',
          'Icon_arrow',
          'Icon_arrow_left',
          { Icon_arrow_disabled: currentPage === 1 },
        )}
      >
        <SearchLink
          className="Pagination-Link"
          data-cy="paginationLeft"
          aria-label="pagination-left"
          params={{ page: `${currentPage - 1}` }}
        />
      </div>

      <ul className="Pagination-List">
        {pageNumbers.map(page => (
          <li
            key={page}
            className={cn(
              'Pagination-Item',
              { 'Pagination-Item_active': currentPage === page },
            )}
          >
            <SearchLink
              className="Pagination-Link"
              params={{ page: `${page}` }}
            >
              {page}
            </SearchLink>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          'Icon',
          'Icon_arrow',
          { Icon_arrow_disabled: currentPage === totalPages },
        )}
      >
        <SearchLink
          className="Pagination-Link"
          data-cy="paginationRight"
          aria-label="pagination-right"
          params={{ page: `${currentPage + 1}` }}
        />
      </div>
    </div>
  );
};
