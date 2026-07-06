//#region imports
import { SortParams } from '../types/SortParams';
import { useTranslation } from 'react-i18next';
import { useUrlParam } from './useUrlParam';
//#endregion

export function useSortByParam() {
  const { t } = useTranslation('productPage');

  const options = t('sortOptions', {
    returnObjects: true,
  }) as Record<string, string>;
  const { newest, alphabetically, cheapest } = options;

  const sortOptions = [
    { param: 'age', label: newest },
    { param: 'title', label: alphabetically },
    { param: 'price', label: cheapest },
  ];

  const { value: sortBy, setValue: setSortBy } = useUrlParam<SortParams>(
    'sort',
    'age',
    true,
  );

  return {
    sortBy,
    sortOptions,
    setSortBy,
  };
}
