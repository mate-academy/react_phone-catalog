import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchString } from '../../helpers/getSearchString';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();
  const numberOfPages = Math.ceil(total / perPage);
  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === numberOfPages;

  const getCurrentPage = (): number => {
    const page = searchParams.get('page');

    if (page) {
      return +page;
    }

    return 1;
  };

  const getButtons = (): JSX.Element[] => {
    const array: JSX.Element[] = [];
    const startIndex = currentPage - 3 > 0 ? currentPage - 3 : 1;
    const endIndex
      = currentPage + 3 < numberOfPages ? currentPage + 3 : numberOfPages;

    for (let i = startIndex; i <= endIndex; i += 1) {
      array.push((
        (
          <li
            className="pagination__item"
            key={i}
          >
            <Link
              className={cn('simple-button', 'pagination__item-link',
                { active: i === currentPage })}
              to={{ search: getSearchString(searchParams, 'page', `${i}`) }}
            >
              {i}
            </Link>
          </li>
        )
      ));
    }

    if (startIndex > 1) {
      array.unshift((
        <li key={startIndex - 1} className="pagination__item--dots">
          ...
        </li>
      ));
    }

    if (endIndex < numberOfPages) {
      array.push((
        <li key={endIndex + 1} className="pagination__item--dots">
          ...
        </li>
      ));
    }

    return array;
  };

  return (
    <ul className="pagination">
      <li className={cn('pagination__item', { disabled: isPageFirst })}>
        <Link
          className="simple-button pagination__item-link"
          to={{
            search:
              getSearchString(searchParams, 'page', `${getCurrentPage() - 1}`),
          }}
        >
          «
        </Link>
      </li>
      <div className="pagination__numbers">{getButtons()}</div>
      <li className={cn('pagination__item', { disabled: isPageLast })}>
        <Link
          className="simple-button pagination__item-link"
          to={{
            search:
              getSearchString(searchParams, 'page', `${getCurrentPage() + 1}`),
          }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
