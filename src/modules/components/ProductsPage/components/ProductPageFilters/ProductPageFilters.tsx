/* eslint-disable import/extensions */
/* eslint-disable padding-line-between-statements */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useSearchParams } from 'react-router-dom';

import { PerPageType, SortType } from '@/modules/shared/utils/types';
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from '@/modules/shared/utils/constants';

import { CustomDropdown } from '@/modules/shared/components/ui/CustomDropdown';

import styles from './ProductPageFilters.module.scss';
//#endregion

//#region STYLES
const { productPageFilters } = styles;
//#endregion

export const ProductPageFilters = () => {
  //#region STATE_&_CONSTANTS
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortType) || SortType.Age;
  const perPage =
    (searchParams.get('perPage') as PerPageType) || PerPageType.All;
  //#endregion

  //#region HANDLERS
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
  //#endregion

  //#region RENDER
  return (
    <div className={productPageFilters}>
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
  //#endregion
};

