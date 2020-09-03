import React from 'react';
import './Selectors.scss';
import Dropdown from '../Dropdown/Dropdown';

const selectSortBy = [
  'Newest',
  'Alphabetically',
  'Cheapest',
];

const pagination = [
  'All',
  '4',
  '8',
  '12',
];

const Selectors = () => {
  return (
    <div className="selectors">
      <div className="selectors__item">
        <Dropdown
          dropdownItems={selectSortBy}
          dropdownLabel="Sort by"
          id="sort"
        />
      </div>
      <div className="selectors__item">
        <Dropdown
          dropdownItems={pagination}
          dropdownLabel="Items on page"
          id="pagination"
        />
      </div>
    </div>
  );
};

export default Selectors;
