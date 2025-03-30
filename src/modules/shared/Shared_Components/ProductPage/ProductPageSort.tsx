import classNames from 'classnames';
import React, { useState } from 'react';
import { PaginationValues, SortValues } from './types/types';
import { SearchLink } from '../SearchLink/SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from './utils/getSearchWith';

interface Props {
  pageTitle: string;
  isLoading: boolean;
}

export const ProductPageSort: React.FC<Props> = ({ pageTitle, isLoading }) => {
  const normalizedPageTitle = pageTitle.split(' ').join('-');

  const arrayOfSortOptions = Object.values(SortValues);
  const arrayOfPaginationOptions = Object.values(PaginationValues);

  const [isOpenedSelect, setIsOpenedSelect] = useState({
    sort: false,
    pagination: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || ``;
  const perPage = searchParams.get('perPage') || PaginationValues.All;
  const query = searchParams.get('query') || 'Find Me!';

  function setNewQuery(value: string) {
    setSearchParams(value);
  }

  const sortInput =
    sortField === 'age'
      ? SortValues.Newest
      : sortField === 'price'
        ? SortValues.Cheapest
        : sortField === 'title'
          ? SortValues.Alphabetically
          : 'Unset';

  return (
    <div className="product-page__sort">
      <div className="product-page__select-container">
        <div className="product-page__select">
          <label
            htmlFor={`product-sort__${normalizedPageTitle}`}
            className="product-page__text"
          >
            Sort by
          </label>

          <div
            tabIndex={0}
            id={`product-sort__${normalizedPageTitle}`}
            className={classNames('product-page__options', {
              'product-page__options--disabled': isLoading,
            })}
            onClick={() =>
              isOpenedSelect.sort
                ? setIsOpenedSelect({ ...isOpenedSelect, sort: false })
                : setIsOpenedSelect({ ...isOpenedSelect, sort: true })
            }
          >
            {sortInput}
            <div
              className={classNames('product-page__arrow', {
                'product-page__arrow--is-Active': isOpenedSelect.sort,
              })}
            />
          </div>

          {isOpenedSelect.sort && (
            <ul className="product-page__options-list">
              {arrayOfSortOptions.map(item => (
                <SearchLink
                  key={item}
                  params={{
                    sort:
                      item === SortValues.Newest
                        ? 'age'
                        : item === SortValues.Cheapest
                          ? 'price'
                          : item === SortValues.Alphabetically
                            ? 'title'
                            : null,
                  }}
                  onClick={() => {
                    setIsOpenedSelect({ ...isOpenedSelect, sort: false });
                  }}
                  className={classNames('product-page__link', {
                    'product-page__link--is-Active': item === sortInput,
                  })}
                >
                  <li className="product-page__option">{item}</li>
                </SearchLink>
              ))}
            </ul>
          )}
        </div>

        <div className="product-page__select">
          <label
            htmlFor={`product-pagination__${normalizedPageTitle}`}
            className="product-page__text"
          >
            Items on page
          </label>

          <div
            tabIndex={0}
            id={`product-pagination__${normalizedPageTitle}`}
            className={classNames(
              'product-page__options product-page__options--pagination',
              {
                'product-page__options--disabled': isLoading,
              },
            )}
            onClick={() =>
              isOpenedSelect.pagination
                ? setIsOpenedSelect({ ...isOpenedSelect, pagination: false })
                : setIsOpenedSelect({ ...isOpenedSelect, pagination: true })
            }
          >
            {perPage}

            <div
              className={classNames('product-page__arrow', {
                'product-page__arrow--is-Active': isOpenedSelect.pagination,
              })}
            />
          </div>

          {isOpenedSelect.pagination && (
            <ul className="product-page__options-list">
              {arrayOfPaginationOptions.map(item => (
                <SearchLink
                  key={item}
                  params={{ perPage: item === 'All' ? null : item, page: null }}
                  className={classNames('product-page__link', {
                    'product-page__link--is-Active': item === perPage,
                  })}
                  onClick={() => {
                    setIsOpenedSelect({ ...isOpenedSelect, pagination: false });
                  }}
                >
                  <li className="product-page__option">{item}</li>
                </SearchLink>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="product-page__select product-page__select--input">
        <label
          htmlFor={`product-query__${normalizedPageTitle}`}
          className="product-page__text"
        >
          Search for items
        </label>

        <input
          id={`product-query__${normalizedPageTitle}`}
          type="text"
          placeholder={query}
          className="product-page__input"
          disabled={isLoading}
          onChange={event => {
            const input = !event.target.value ? null : event.target.value;

            setNewQuery(
              getSearchWith(
                { query: input, perPage: null, sort: null, page: null },
                searchParams,
              ),
            );
          }}
        />
      </div>
    </div>
  );
};
