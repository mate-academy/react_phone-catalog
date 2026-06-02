/* eslint-disable padding-line-between-statements */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

import { useSearchParams } from 'react-router-dom';

import { PerPageType, SortType } from '../../../../shared/utils/types';
import {
  PER_PAGE_OPTIONS,
  SORT_OPTIONS,
} from '../../../../shared/utils/constants';

import styles from './ProductPageFilters.module.scss';
import { CustomDropdown } from './components/CustomDropdown';

const { filtersContainer } = styles;

export const ProductPageFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortType) || SortType.Age;
  const perPage =
    (searchParams.get('perPage') as PerPageType) || PerPageType.All;

  const handleSortChange = (newValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newValue);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (newValue: string) => {
    const newPageSize = new URLSearchParams(searchParams);
    newPageSize.set('perPage', newValue);
    newPageSize.set('page', '1');
    setSearchParams(newPageSize);
  };

  return (
    <div className={filtersContainer}>
      <CustomDropdown
        label="Sort By"
        value={sortBy}
        options={SORT_OPTIONS}
        onChange={handleSortChange}
      />

      <CustomDropdown
        label="Items on page"
        value={perPage}
        options={PER_PAGE_OPTIONS}
        onChange={handlePerPageChange}
      />
    </div>
  );
};
