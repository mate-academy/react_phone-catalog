import React, { useState } from 'react';
import { SortBy } from '../../types/Sort';

export const Dropdowns = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);
  const [sortValue, setSortValue] = useState<number>(16);

  const getSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortBy);
  };

  const getSortValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(+e.target.value);
  };

  return (
    <div className="catalog__dropdowns">
      <div className="catalog__dropdown">
        <label
          htmlFor="catalog__sortby"
          className="catalog__sortby_label label"
        >
          Sort by
        </label>
        <select
          id="catalog__sortby"
          className="catalog__sortby select"
          onChange={getSortBy}
        >
          <option value="newest">Newest</option>
          <option value="name">Name</option>
          <option value="cheaper">Cheaper</option>
        </select>
      </div>
      <div className="catalog__dropdown">
        <label htmlFor="catalog__items" className="catalog__items_label label">
          Items on page
        </label>
        <select
          id="catalog__items"
          className="catalog__items select"
          onChange={getSortValue}
        >
          <option value="16">16</option>
          <option value="24">24</option>
          <option value="32">32</option>
        </select>
      </div>
    </div>
  );
};
