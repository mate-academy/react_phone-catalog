import React from 'react';
import './Pagination.scss';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  // setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  // setCurrentPage,
}) => {
  const paginationPageCount = Math.ceil(total / perPage);
  const paginationPageCountArr = Array.from(
    { length: paginationPageCount },
    (_, i) => i + 1,
  );

  const allItems = [];

  for (let i = 1; i <= total; i += 1) {
    allItems.push(`Item ${i}`);
  }

  const itemsArr = [];

  for (let j = 0; j < allItems.length; j += perPage) {
    itemsArr.push(allItems.slice(j, j + perPage));
  }

  function prevLinkHandler() {
    if (currentPage !== 1) {
      return currentPage - 1;
    }

    return '1';
  }

  function nextLinkHandler() {
    if (currentPage !== paginationPageCount) {
      return currentPage + 1;
    }

    return '1';
  }

  return (
    <>
      <ul className="pagination" data-cy="pagination">
        <li className={cn('pagination__item', { disabled: currentPage === 1 })}>
          <SearchLink
            className="pagination__link"
            params={{ page: prevLinkHandler().toString() }}
            data-cy="paginationLeft"
          >
            «
          </SearchLink>
        </li>

        {paginationPageCountArr.map(el => {
          return (
            <li
              className={cn('pagination__item', { active: currentPage === el })}
              key={el}
            >
              <SearchLink
                className="pagination__link"
                params={{ page: el.toString() }}
              >
                {el}
              </SearchLink>
            </li>
          );
        })}

        <li
          className={cn('pagination__item', {
            disabled: currentPage === paginationPageCount,
          })}
        >
          <SearchLink
            className="pagination__link"
            data-cy="paginationRight"
            params={{ page: nextLinkHandler().toString() }}
          >
            »
          </SearchLink>
        </li>
      </ul>
    </>
  );
};
