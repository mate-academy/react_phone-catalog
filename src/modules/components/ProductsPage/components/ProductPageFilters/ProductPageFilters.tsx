/* eslint-disable import/extensions */
/* eslint-disable padding-line-between-statements */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { PerPageType, SortType } from '@/modules/shared/utils/types';
import {
  getSortOptions,
  getPerPageOptions,
} from '@/modules/shared/utils/constants';

import { CustomDropdown } from '@/modules/shared/components/ui/CustomDropdown';

import styles from './ProductPageFilters.module.scss';
//#endregion

//#region STYLES
const { productPageFilters } = styles;
//#endregion

export const ProductPageFilters = () => {
  //#region STATE_&_HOOKS
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortType) || SortType.Age;
  const perPage =
    (searchParams.get('perPage') as PerPageType) || PerPageType.All;
  //#endregion

  //#region FILTER_OPTIONS
  const sortOptions = useMemo(() => getSortOptions(t), [t]);
  const perPageOptions = useMemo(() => getPerPageOptions(t), [t]);
  //#endregion

  //#region HANDLERS
  const handleSortChange = (newValue: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (newValue === SortType.Age) {
      newParams.delete('sort');
    } else {
      newParams.set('sort', newValue);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (newValue: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (newValue === PerPageType.All) {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', newValue);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };
  //#endregion

  //#region RENDER
  return (
    <div className={productPageFilters}>
      <CustomDropdown
        label={t('filters.sort.title')}
        value={sortBy}
        options={sortOptions}
        onChange={handleSortChange}
      />

      <CustomDropdown
        label={t('filters.perPage.title')}
        value={perPage}
        options={perPageOptions}
        onChange={handlePerPageChange}
      />
    </div>
  );
  //#endregion
};
