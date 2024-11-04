import React from 'react';

interface ProductFilterProps {
  sort: string;
  itemsPerPage: number;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  sort,
  itemsPerPage,
  onSortChange,
  onItemsPerPageChange,
}) => (
  <div className='blocks'>
    <div className='sorting'>
      <p className='sorting__label'>Sort by</p>
      <div className='sorting__select-container'>
        <select
          className='sorting__select'
          id="sort-select"
          value={sort}
          onChange={onSortChange}>
          <option className='sorting__option' value="age">Newest</option>
          <option className='sorting__option' value="title">Alphabetically</option>
          <option className='sorting__option' value="price">Cheapest</option>
        </select>
      </div>
    </div>

    <div className='items-per-page'>
      <p className='items-per-page__label'>Items on page</p>
      <div className='items-per-page__select-container'>
        <select
          id='per-page'
          className='items-per-page__select'
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          aria-label='Select number of items per page'>
          <option className='items-per-page__option' value={4}>4</option>
          <option className='items-per-page__option' value={8}>8</option>
          <option className='items-per-page__option' value={16}>16</option>
          <option className='items-per-page__option' value={Number.MAX_SAFE_INTEGER}>All</option>
        </select>
      </div>
    </div>
  </div>
);

