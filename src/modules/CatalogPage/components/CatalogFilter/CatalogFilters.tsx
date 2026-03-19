import React from 'react';
import styles from './CatalogFilters.module.scss';
import { Dropdown } from '../Dropdown';

interface Props {
  sort: string;
  perPage: string;
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
}

const sortOptions = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'cheapest' },
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
  return (
    <div className={styles.filters}>
      <Dropdown
        label="Sort by"
        options={sortOptions}
        value={sort}
        onChange={onSortChange}
      />

      <Dropdown
        label="Items on page"
        options={perPageOptions}
        value={perPage}
        onChange={onPerPageChange}
        variant="perPage"
      />
    </div>
  );
};
