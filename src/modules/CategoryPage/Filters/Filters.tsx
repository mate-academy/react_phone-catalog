import React from 'react';

import styles from './Filters.module.scss';

import Select from 'react-select';
import { reactSelectStyles } from '../../../utils/reactSelectStyles';

import { SearchParams } from '../../../utils/searchHelper';

type SelectValue = 'All' | '4' | '8' | '16';
type SortValue = 'Newest' | 'Alphabetical' | 'Cheapest';

interface FiltersProps {
  selectedValue: SelectValue;
  selectedSort: SortValue;
  onChange: (params: SearchParams) => void;
}

const pageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'All', label: 'All' },
];

const sortOptions = [
  { value: 'Newest', label: 'Newest' },
  { value: 'Alphabetical', label: 'Alphabetical' },
  { value: 'Cheapest', label: 'Cheapest' },
];

export const Filters: React.FC<FiltersProps> = ({
  selectedValue,
  selectedSort,
  onChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePerPageChange = (option: any) => {
    onChange({
      page: null,
      perPage: option?.value === 'All' ? null : option.value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortChange = (option: any) => {
    onChange({
      page: null,
      sort: option?.value === 'Newest' ? null : option.value,
    });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__sort}>
        <p className={styles.filters__text}>Sort by</p>
        <Select
          isSearchable={false}
          styles={reactSelectStyles}
          value={{ value: selectedSort, label: selectedSort }}
          onChange={handleSortChange}
          options={sortOptions}
        />
      </div>
      <div className={styles.filters__items}>
        <p className={styles.filters__text}>Items on page</p>
        <Select
          isSearchable={false}
          styles={reactSelectStyles}
          value={{ value: selectedValue, label: selectedValue }}
          onChange={handlePerPageChange}
          options={pageOptions}
        />
      </div>
    </div>
  );
};
