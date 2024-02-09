/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './Pagination.scss';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers } from '../../services/getNumbers';
import { getSearchWith } from '../../services/searchHelper';

type Props = {
  total: number,
  perPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
}) => {
  const [searchParams] = useSearchParams();
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage)
    .map(n => `${n}`);

  const pageNumber = +(searchParams.get('page') || 1);

  const handlePageChande = (mode: string) => {
    if (mode === 'prev' && pageNumber > 1) {
      return getSearchWith({ page: `${pageNumber - 1}` }, searchParams);
    }

    if (mode === 'next' && pageNumber < total) {
      return getSearchWith({ page: `${pageNumber + 1}` }, searchParams);
    }

    return '';
  };

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <Link
          data-cy="prevLink"
          className={classNames(
            'pagination__link',
            'pagination__link--arrow',
            pageNumber === 1 ? 'pagination__link--arrow-disabled' : '',
          )}
          to={{ search: handlePageChande('prev') }}
        />
      </li>
      {pages.map((p) => {
        const isSelected = pageNumber === +p;

        return (
          <li
            className={classNames('pagination__item',
              isSelected ? 'active' : '')}
            key={p}
          >
            <Link
              data-cy="pageLink"
              className={classNames(
                'pagination__link',
                isSelected ? 'pagination__link--active' : '',
              )}
              to={{
                search: getSearchWith({ page: p }, searchParams),
              }}
            >
              {p}
            </Link>
          </li>
        );
      })}
      <li className="pagination__item">
        <Link
          data-cy="nextLink"
          className={classNames(
            'pagination__link',
            'pagination__link--arrow',
            'pagination__link--arrow-right',
            pageNumber === lastPage ? 'pagination__link--arrow-disabled' : '',
          )}
          to={{ search: handlePageChande('next') }}
        />
      </li>
    </ul>
  );
};
