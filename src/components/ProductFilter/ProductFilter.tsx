import React from 'react';
import './ProductFilter.scss';

const options = [4, 8, 16, 'All'];

type Props = {
  handlePerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
};

export const ProductFilter: React.FC<Props> = ({
  handlePerChange,
  itemsPerPage,
}) => {
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
        <select
          value={options.includes(itemsPerPage) ? itemsPerPage : 'All'}
          className="filter__select"
          onChange={handlePerChange}
        >
          {options.map(v => (
            <option value={v} key={v} className="filter__option">
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
