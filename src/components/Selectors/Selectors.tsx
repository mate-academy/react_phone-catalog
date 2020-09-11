import React, { useState } from 'react';
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
  const [isCheckedSortDropdown, setCheckedSort] = useState<boolean>(false);
  const [isCheckedPaginationDropdown, setCheckedPagination] = useState<boolean>(false);

  return (
    <div className="selectors">
      <div className="selectors__item">
        <Dropdown
          dropdownItems={selectSortBy}
          dropdownLabel="Sort by"
          id="sort"
          isCheckedSortDropdown={isCheckedSortDropdown}
          isCheckedPaginationDropdown={isCheckedPaginationDropdown}
          setChecked={setCheckedSort}
        />
      </div>
      <div className="selectors__item">
        <Dropdown
          dropdownItems={pagination}
          dropdownLabel="Items on page"
          id="pagination"
          isCheckedSortDropdown={isCheckedSortDropdown}
          isCheckedPaginationDropdown={isCheckedPaginationDropdown}
          setChecked={setCheckedPagination}
        />
      </div>
    </div>
  );
};

export default Selectors;
