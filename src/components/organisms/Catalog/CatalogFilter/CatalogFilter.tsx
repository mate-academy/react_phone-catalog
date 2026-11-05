import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '@/components/molecules';

import {
  CATALOG_PAGE_SIZE_OPTIONS,
  CATALOG_SORT_OPTIONS,
} from './CatalogFilter.constants';

import styles from './CatalogFilter.module.scss';

export const CatalogFilter = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy =
    CATALOG_SORT_OPTIONS.find(
      (option) => option === searchParams.get('sort'),
    ) ?? CATALOG_SORT_OPTIONS[0];

  const itemsPerPage =
    CATALOG_PAGE_SIZE_OPTIONS.find(
      (option) => option === searchParams.get('perPage'),
    ) ?? CATALOG_PAGE_SIZE_OPTIONS[0];

  const updateSearchParam = (key: string, value: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      nextParams.set(key, value);
      nextParams.set('page', '1');

      return nextParams;
    });
  };

  return (
    <div className={styles.container}>
      <Dropdown
        className={classNames(styles.sortBy, styles.dropdown)}
        options={[...CATALOG_SORT_OPTIONS]}
        optionLabels={{
          'Newest': t('sortNewest'),
          'Cheapest': t('sortCheapest'),
          'Most expensive': t('sortMostExpensive'),
          'Highest rated': t('sortHighestRated'),
          'Lowest rated': t('sortLowestRated'),
          'Top sales': t('sortTopSales'),
        }}
        description={t('sortBy')}
        value={sortBy}
        onChange={(value) => updateSearchParam('sort', value)}
      />

      <Dropdown
        className={classNames(styles.itemsOnPage, styles.dropdown)}
        options={[...CATALOG_PAGE_SIZE_OPTIONS]}
        description={t('itemsOnPage')}
        value={itemsPerPage}
        onChange={(value) => updateSearchParam('perPage', value)}
      />
    </div>
  );
};
