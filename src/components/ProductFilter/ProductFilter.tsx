import React from 'react';
import './ProductFilter.scss';

const optionsItemsPerPage = [4, 8, 16, 'All'];

const optionsForSort = [
  {
    label: 'Newest',
    value: 'age',
  },
  {
    label: 'Alphabetically',
    value: 'title',
  },
  {
    label: 'Cheapest',
    value: 'price',
  },
];

type Props = {
  itemsPerPage: number;
  handlePerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortField: string | null;
  handleSortField: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const ProductFilter: React.FC<Props> = ({
  itemsPerPage,
  handlePerChange,
  sortField,
  handleSortField,
}) => {
  return (
    <div className="filter">
      <div>
        <p className="filter__title">Sort By</p>
        <select
          value={sortField !== null ? sortField : 'Newest'}
          className="filter__select"
          onChange={handleSortField}
        >
          {optionsForSort.map(option => (
            <option
              value={option.value}
              key={option.label}
              className="filter__option"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="filter__title">Items on page</p>
        <select
          value={
            optionsItemsPerPage.includes(itemsPerPage) ? itemsPerPage : 'All'
          }
          className="filter__select"
          onChange={handlePerChange}
        >
          {optionsItemsPerPage.map(v => (
            <option value={v} key={v} className="filter__option">
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
