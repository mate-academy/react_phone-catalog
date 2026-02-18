import React from 'react';
import './ProductFilter.scss';

const optionItemsPerPage = [4, 8, 16, 'all'] as const;

const optionsForSorting = [
  { label: 'Newest', value: 'year' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'price' },
];

type ItemsPerPageType = number | 'all';

type Props = {
  itemsPerPage: ItemsPerPageType;
  handlePerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortField: string | null;
  handleSortField: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const ProductFilter: React.FC<Props> = ({
  itemsPerPage,
  handlePerPage,
  sortField,
  handleSortField,
}) => {
  return (
    <div className="filters">
      <div className="filter">
        <p className="filter__title">Sort by</p>
        <select
          value={sortField ?? 'year'}
          onChange={handleSortField}
          className="filter__select filter__select--first"
        >
          {optionsForSorting.map(option => (
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

      <div className="filter">
        <p className="filter__title">Items on page</p>
        <select
          value={String(itemsPerPage)}
          onChange={handlePerPage}
          className="filter__select filter__select--second"
        >
          {optionItemsPerPage.map(opt => (
            <option value={String(opt)} key={opt} className="filter__option">
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
