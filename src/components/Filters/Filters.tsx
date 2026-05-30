import { Select } from '../Select';
import { SelectOptionPerPage } from '../Select/SelectOptionsItemPerPage';
import { SelectOptionSortBy } from '../Select/SelectOptionsSortBy';
import './Filters.scss';
import React from 'react';

type Props = {
  sortBy: string;
  itemPerPage: number;
  onSortChange: (value: string) => void;
  onItemsChange: (value: string) => void;
};

export const Filters: React.FC<Props> = ({
  sortBy,
  itemPerPage,
  onSortChange,
  onItemsChange,
}) => {
  return (
    <>
      <div className="filter__variation">
        <label
          className="text__body--small filter__variation-label"
          htmlFor="Sort"
        >
          Sort by
        </label>

        <Select
          id="Sort"
          selectedValue={sortBy}
          options={SelectOptionSortBy}
          onChange={onSortChange}
        />
      </div>
      <div className="filter__variation filter__variation--small">
        <label
          className="text__body--small filter__variation-label"
          htmlFor="Items"
        >
          Items on page
        </label>

        <Select
          id="Item"
          selectedValue={String(itemPerPage)}
          options={SelectOptionPerPage}
          onChange={onItemsChange}
        />
      </div>
    </>
  );
};
