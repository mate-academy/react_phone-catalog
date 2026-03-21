import React from 'react';
import styles from './CatalogFilters.module.scss';
import { Dropdown } from '../Dropdown';
import { useTranslation } from 'react-i18next';

interface Props {
  sort: string;
  perPage: string;
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
}

const sortOptions = [
  { label: 'catalog.sortOptions.newest', value: 'age' },
  { label: 'catalog.sortOptions.alphabetically', value: 'title' },
  { label: 'catalog.sortOptions.cheapest', value: 'cheapest' },
];

const perPageOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];


export const CatalogFilters: React.FC<Props> = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
}) => {
  const { t } = useTranslation();

  const translatedSortOptions = sortOptions.map(option => ({
    ...option,
    label: t(option.label),
  }));


  const translatedPerPageOptions = perPageOptions.map(option => ({
    ...option,
    label: option.value === 'all' ? t('catalog.sortOptions.all') : option.label,
  }));

  return (
    <div className={styles.filters}>
      <Dropdown
        label={t('catalog.sortBy')}
        options={translatedSortOptions}
        value={sort}
        onChange={onSortChange}
      />

      <Dropdown
        label={t('catalog.itemsOnPage')}
        options={translatedPerPageOptions}
        value={perPage}
        onChange={onPerPageChange}
        variant="perPage"
      />
    </div>
  );
};
