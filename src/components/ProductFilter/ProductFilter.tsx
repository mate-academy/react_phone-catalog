import React, { useState } from 'react';
import './productFilter.scss';
import { useSearchParams } from 'react-router-dom';

type SortKey = keyof typeof filterTypes;

type IsOpen = {
  sortBy: boolean;
  items: boolean;
};

type SortTypes = 'sort' | 'limit';

const filterTypes = {
  newest: 'Newest',
  lowest: 'Price: Lowest',
  highest: 'Price: Highest',
};

const DEFAULT_SORT = 'newest';
const DEFAULT_ITEM = 16;

export const ProductFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState<IsOpen>({
    sortBy: false,
    items: false,
  });

  const sort = searchParams.get('sort') || DEFAULT_SORT;

  const itemsOnPage = +(searchParams.get('limit') || DEFAULT_ITEM);

  function handleSort<T>(e: React.MouseEvent<T>, type: SortTypes) {
    const element = e.target as HTMLElement;
    const value = element.dataset.value;

    const params = new URLSearchParams(searchParams);

    if (!value) {
      return;
    }

    if (value === DEFAULT_SORT) {
      params.delete('sort');

      setSearchParams(params);

      return;
    }

    if (value === `${DEFAULT_ITEM}`) {
      params.delete('limit');
      params.delete('page');

      setSearchParams(params);

      return;
    }

    if (type === 'sort') {
      params.set('sort', value);
    } else {
      params.set('limit', value);
    }

    params.delete('page');

    setSearchParams(params);
  }

  function handleToggleDropdown<T extends HTMLDivElement>(
    e: React.MouseEvent<T>,
  ) {
    const root = e.currentTarget as HTMLDivElement;

    const key = root.dataset.value as keyof IsOpen;

    setIsOpen(c => ({
      ...c,
      [key]: !c[key],
    }));
  }

  return (
    <section className="product-filter product-filter--margin">
      <div
        data-value="sortBy"
        onClick={e => {
          handleToggleDropdown(e);
        }}
        className="filter-item"
      >
        <div className="product-filter__header">
          <span className="product-filter__select product-filter__select--sort">
            {filterTypes[sort as SortKey]}
          </span>
        </div>

        {isOpen.sortBy && (
          <ul
            onClick={e => handleSort(e, 'sort')}
            className="product-filter__list"
          >
            <li data-value={DEFAULT_SORT} className="filter-item__value">
              {filterTypes.newest}
            </li>
            <li data-value="lowest" className="filter-item__value">
              {filterTypes.lowest}
            </li>
            <li data-value="highest" className="filter-item__value">
              {filterTypes.highest}
            </li>
          </ul>
        )}
      </div>

      <div
        data-value="items"
        onClick={e => {
          handleToggleDropdown(e);
        }}
        className="filter-item"
      >
        <div className="product-filter__header">
          <span className="product-filter__select product-filter__select--leng">
            {itemsOnPage}
          </span>
        </div>

        {isOpen.items && (
          <ul
            onClick={e => handleSort(e, 'limit')}
            className="product-filter__list"
          >
            <li data-value={`${DEFAULT_ITEM}`} className="filter-item__value">
              {DEFAULT_ITEM}
            </li>
            <li data-value="8" className="filter-item__value">
              8
            </li>
            <li data-value="4" className="filter-item__value">
              4
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};
