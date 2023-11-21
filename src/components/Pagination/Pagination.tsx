import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { ICONS } from '../../icons';
import { SearchLink } from '../SearchLink';
import { getNumbers } from '../../helpers/getNumbers';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = React.memo(({
  total,
  perPage,
  currentPage,
}) => {
  const pagesCount
    = Math.ceil((total > 0 && perPage > 0) ? (total / perPage) : 1);
  const pages = getNumbers(1, pagesCount);
  const prevLinkDisabled = currentPage === 1;
  const nextLinkDisabled = currentPage === pagesCount;

  return (
    <ul className="pagination">
      <li>
        <SearchLink
          data-cy="prevLink"
          params={
            !prevLinkDisabled ? { page: (currentPage - 1).toString() } : {}
          }
          className={cn('pagination__link', {
            'pagination__link--disabled': prevLinkDisabled,
          })}
          aria-disabled={prevLinkDisabled}
        >
          <img
            src={ICONS.arrow}
            alt="arrow left"
            className="icon icon--left"
          />
        </SearchLink>
      </li>

      <div className="pagination__numbers">
        {pages.map(cellNumber => (
          <li
            key={cellNumber}
          >
            <SearchLink
              data-cy="pageLink"
              className={cn('pagination__link pagination__link--number', {
                'pagination__link--selected': cellNumber === currentPage,
              })}
              params={{ page: cellNumber.toString() }}
            >
              {cellNumber}
            </SearchLink>
          </li>
        ))}
      </div>

      <li>
        <SearchLink
          data-cy="nextLink"
          className={cn('pagination__link', {
            'pagination__link--disabled': nextLinkDisabled,
          })}
          params={
            !nextLinkDisabled ? { page: (currentPage + 1).toString() } : {}
          }
          aria-disabled={nextLinkDisabled}
        >
          <img
            src={ICONS.arrow}
            alt="arrow left"
            className="icon icon--right"
          />
        </SearchLink>
      </li>
    </ul>
  );
});
