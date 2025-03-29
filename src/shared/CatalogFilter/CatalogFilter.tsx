import classNames from 'classnames';
import s from './CatalogFilter.module.scss';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { ItemsQuantity, SortBy } from '../../types/enums/Page.quantity';

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

function getSearchWith(params: Params, search?: string | URLSearchParams) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}

export const CatalogFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsQuantity = searchParams.get('quantity') || '';
  const sortBy = searchParams.get('sort') || '';

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const sortFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({ quantity: +event.target.value || null });
  };

  const sortedBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({ sort: event.target.value || null });
  };

  return (
    <div className={classNames(s.sort__wrapper, 'container')}>
      <div className={s.sort}>
        <div className={s.sort__by}>
          <label htmlFor="sort_by" className={s.sort__by_title}>
            Sort by
          </label>
          <select
            id="sort_by"
            className={s.sort__by_select}
            onChange={sortedBy}
            value={sortBy || 'newest'}
          >
            <option value={SortBy.newest}>Newest</option>
            <option value={SortBy.alphabetically}>Alphabetically</option>
            <option value={SortBy.cheapest}>Cheapest</option>
          </select>
        </div>
        <div className={s.sort__page}>
          <label htmlFor="page_quantity" className={s.sort__title}>
            Items on page
          </label>
          <select
            id="page_quantity"
            className={s.sort__page_select}
            onChange={sortFilter}
            value={itemsQuantity || ItemsQuantity.all}
          >
            {Object.values(ItemsQuantity).map(value => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
