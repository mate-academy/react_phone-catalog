/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { FilterType } from '../../types';
import { getSearchWith } from '../../utils';
import { SearchParamsNames } from '../../constants';

import { Icon } from '../Icon';

import './PagePagination.scss';

export type Props = {
  productsCount: number,
  currentPage: number,
  filterValue: FilterType,
};

const getPages = (
  productsCount: number,
  filterValue: FilterType,
) => (
  Array.from(
    { length: +filterValue ? Math.ceil(productsCount / +filterValue) : 1 },
    (_, i) => i + 1,
  )
);

export const PagePagination: React.FC<Props> = ({
  productsCount,
  currentPage,
  filterValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = getPages(productsCount, filterValue);
  const isPrevButtonDisabled = currentPage <= 1;
  const isNextButtonDisabled = currentPage >= pages.length;

  const handleSetParams = useCallback((
    paramValue: string,
  ) => {
    const newParams = getSearchWith(
      { [SearchParamsNames.page]: paramValue || null },
      searchParams,
    );

    setSearchParams(newParams);
  }, [setSearchParams, searchParams]);

  const handlePrevClick = () => {
    if (currentPage <= 1) {
      return;
    }

    handleSetParams(String(currentPage - 1));
  };

  const handleNextClick = () => {
    if (isNextButtonDisabled) {
      return;
    }

    handleSetParams(String(currentPage + 1));
  };

  return (
    <div className="page-pagination" data-cy="pagination">
      <button
        type="button"
        className={cn(
          'page-pagination__button',
          'page-pagination__arrow-button',
          { 'page-pagination__arrow-button--disabled': isPrevButtonDisabled },
        )}
        onClick={() => handlePrevClick()}
      >
        <Icon
          iconName="arrowLeft"
        />
      </button>

      <ul className="page-pagination__buttons-list">
        {pages.map(page => (
          <li key={page}>
            <Link
              to={{
                search: getSearchWith({
                  [SearchParamsNames.page]: page || null,
                }, searchParams),
              }}
              key={page}
              className={cn(
                'page-pagination__button',
                'page-pagination__page-button',
                {
                  'page-pagination__page-button--active': page === currentPage,
                },
              )}
              data-cy="paginationLeft"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn(
          'page-pagination__button',
          'page-pagination__arrow-button',
          { 'page-pagination__arrow-button--disabled': isNextButtonDisabled },
        )}
        data-cy="paginationRight"
        onClick={() => handleNextClick()}
      >
        <Icon
          iconName="arrowRight"
        />
      </button>
    </div>
  );
};
