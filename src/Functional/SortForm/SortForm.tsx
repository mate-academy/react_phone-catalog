import './SortForm.scss';
import { useState } from 'react';

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onItemsPerPageChange?: (value: number) => void;
};

export function SortForm({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onItemsPerPageChange,
}: Props) {
  const [itemsPerPage, setItemsPerPage] = useState(8);

  return (
    <div className="sort-form">
      <div className="sort-form__top">
        <div className="sort-form__group">
          <label htmlFor="search" className="sort-form__label">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="sort-form__input"
          />
        </div>
      </div>

      <div className="sort-form__bottom">
        <div className="sort-form__group">
          <label htmlFor="sort" className="sort-form__label">
            Sort by
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="sort-form__select"
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        <div className="sort-form__group">
          <label htmlFor="perPage" className="sort-form__label">
            Items per page
          </label>
          <select
            id="perPage"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(Number(e.target.value));
              onItemsPerPageChange?.(Number(e.target.value));
            }}
            className="sort-form__select"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={0}>All</option>
          </select>
        </div>
      </div>
    </div>
  );
}
