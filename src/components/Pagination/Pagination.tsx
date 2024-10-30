import React from 'react';
import { SearchLink } from '../SearchLink/SearchLink';
import './Pagination.scss';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const paginationPageCount = Math.ceil(total / +perPage);
  const paginationPageCountArray = Array.from(
    { length: paginationPageCount },
    (_, i) => i + 1,
  );

  const allItems = [];
  const allItemsPerPage = [];

  for (let i = 1; i < total; i++) {
    allItems.push(`item ${i}`);
  }

  for (let j = 0; j < allItems.length; j += +perPage) {
    allItemsPerPage.push(allItems.slice(j, j + +perPage));
  }

  const prevLinkHandler = () => {
    if (currentPage !== 1) {
      return currentPage - 1;
    }

    return '1';
  };

  const nextLinkHandler = () => {
    if (currentPage !== paginationPageCount) {
      return currentPage + 1;
    }

    return '1';
  };

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <SearchLink
          className="pagination__link"
          newParams={{ page: prevLinkHandler().toString() }}
        >
          «
        </SearchLink>
      </li>
      {paginationPageCountArray.map(el => (
        <li
          key={el}
          className={classNames('pagination__item', {
            'pagination__item--active': currentPage === el,
          })}
        >
          <SearchLink
            className="pagination__link"
            newParams={{ page: el.toString() }}
          >
            {el}
          </SearchLink>
        </li>
      ))}
      <li className="pagination__item">
        <SearchLink
          className="pagination__link"
          newParams={{ page: nextLinkHandler().toString() }}
        >
          »
        </SearchLink>
      </li>
    </ul>
  );
};
