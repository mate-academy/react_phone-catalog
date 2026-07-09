import React from 'react';
import { Select } from '../../../shared/components/Select';
import styles from './CatalogControls.module.scss';

interface Props {
  sort: string;
  perPage: string;
  onParamChange: (name: string, value: string) => void;
}

export const CatalogControls: React.FC<Props> = ({
  sort,
  perPage,
  onParamChange,
}) => {
  const sortOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'title', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const perPageOptions = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'all' },
  ];

  return (
    <div className={styles.container}>
      <Select
        id="sort"
        label="Sort by"
        value={sort}
        options={sortOptions}
        onChange={e => onParamChange('sort', e.target.value)}
        containerClass={styles.sortSelect}
      />

      <Select
        id="perPage"
        label="Items per page"
        value={perPage}
        options={perPageOptions}
        onChange={e => onParamChange('perPage', e.target.value)}
        containerClass={styles.perPageSelect}
      />
    </div>
  );
};
