import React from 'react';
import './Selectors.scss';
import Dropdown from '../Dropdown/Dropdown';

const selectSortBy = [
  'Newest',
  'Alphabetically',
  'Cheapest',
];

const selectPerPage = [
  'All',
  '4',
  '8',
  '16',
];

const Selectors = () => {
  return (
    <div className="selectors">
      <div className="selectors__item">
        <Dropdown
          dropdownItems={selectSortBy}
          dropdownLabel="Sort by"
        />
      </div>
      <div className="selectors__item">
        <Dropdown
          dropdownItems={selectPerPage}
          dropdownLabel="Items on page"
        />
      </div>
    </div>
  );
};

export default Selectors;
