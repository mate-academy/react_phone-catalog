import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';

import './ProductFilters.scss';

const sortByParams = [
  {
    key: 'Nevest',
    value: 'age',
  },
  {
    key: 'Alphabetically',
    value: 'name',
  },
  {
    key: 'Cheapest',
    value: 'price',
  },
];

const sortByItems = ['all', '4', '8', '16'];

export const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'Nevest';
  const perPage = searchParams.get('perPage') || 'all';

  function setSearchWith(params: SearchParams) {
    const search: string = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleChangeSort(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({ sort: event.target.value || '' });
    searchParams.set('sort', event.target.value);
  }

  function handlePerPage(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('page', '1');

    setSearchWith({ perPage: event.target.value || '' });
    searchParams.set('perPage', event.target.value);
  }

  return (
    <section className="filter">
      <div className="container">
        <div className="filter__content">
          <div className="filter__wrap">
            <p className="filter__title">
              Sort by
            </p>

            <select
              className="filter__sort-by"
              value={sort}
              onChange={handleChangeSort}
            >
              {sortByParams.map(param => (
                <option
                  className="filter__option"
                  key={param.key}
                  value={param.value}
                >
                  {param.key}
                </option>
              ))}
            </select>
          </div>

          <div className="filter__wrap">
            <p className="filter__title">
              Items on page
            </p>

            <select
              className="filter__sort-items"
              value={perPage}
              onChange={handlePerPage}
            >
              {sortByItems.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};
