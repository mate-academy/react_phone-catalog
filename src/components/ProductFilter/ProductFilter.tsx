import React from 'react';
import './ProductFilter.scss';

export const ProductFilter = () => {
  return (
    <div className="filter">
      <div>
        <p className="filter__title">Sort By</p>
        <select value="" className="filter__select">
          <option value="newest" className="filter__option">
            Newest
          </option>
          <option value="alphabetically" className="filter__option">
            Alphabetically
          </option>
          <option value="cheapest" className="filter__option">
            Cheapest
          </option>
        </select>
      </div>

      <div>
        <p className="filter__title">Items on page</p>
        <select value="" className="filter__select">
          <option value="4" className="filter__option">
            4
          </option>
          <option value="8" className="filter__option">
            8
          </option>
          <option value="16" className="filter__option">
            16
          </option>
          <option value="all" className="filter__option">
            All
          </option>
        </select>
      </div>
    </div>
  );
};
