import classNames from 'classnames';
import s from './CatalogFilter.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
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
  const [itemsQuantityOpen, setItemsQuantityOpen] = useState(false);
  const itemsQuantity = searchParams.get('quantity') || '';
  const [sortByOpen, setSortByOpen] = useState(false);
  const sortBy = searchParams.get('sort') || '';

  const toggleQuantityButton = () => setItemsQuantityOpen(prev => !prev);
  const toggleSortButton = () => setSortByOpen(prev => !prev);

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const sortFilter = (value: string) => {
    setSearchWith({ quantity: +value || null });
  };

  const sortedBy = (value: string) => {
    setSearchWith({ sort: value || null });
  };

  return (
    <div className={classNames(s.sort__wrapper, 'container')}>
      <div className={s.sort}>
        <div className={s.dropdown__wrapper}>
          <label htmlFor="sort_by" className={s.sort__by_title}>
            Sort by
          </label>
          <div className={s.dropdown}>
            <button
              id="sort_by"
              className={s.dropdown__select}
              onClick={toggleSortButton}
            >
              <span className={s.dropdown__select_selected}>
                {sortBy || 'Newest'}
              </span>
              <div
                className={classNames(s.dropdown__select_caret, {
                  [s.rotate]: sortByOpen,
                })}
              >
                <img src="./img/icons/down.png" alt="" />
              </div>
            </button>
            <ul
              className={classNames(s.dropdown__menu, {
                [s.open]: sortByOpen,
              })}
            >
              {Object.values(SortBy).map(value => (
                <li
                  key={value}
                  onClick={() => {
                    sortedBy(value);
                    setSortByOpen(false);
                  }}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={s.dropdown__wrapper}>
          <label htmlFor="page_quantity" className={s.sort__by_title}>
            Items on page
          </label>
          <div className={s.dropdown}>
            <button
              className={s.dropdown__select}
              id="page_quantity"
              onClick={toggleQuantityButton}
            >
              <span className={s.dropdown__select_selected}>
                {itemsQuantity || 'All'}
              </span>
              <div
                className={classNames(s.dropdown__select_caret, {
                  [s.rotate]: itemsQuantityOpen,
                })}
              >
                <img src="./img/icons/down.png" alt="" />
              </div>
            </button>
            <ul
              className={classNames(s.dropdown__menu, {
                [s.open]: itemsQuantityOpen,
              })}
            >
              {Object.values(ItemsQuantity).map(value => (
                <li
                  key={value}
                  onClick={() => {
                    sortFilter(value);
                    setItemsQuantityOpen(false);
                  }}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
