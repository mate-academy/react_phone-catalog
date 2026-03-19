import React from 'react';
import styles from './CatalogFilters.module.scss';
import { SortType } from '../../helpers/sorting';

interface Props {
  sort: string;
  perPage: string;
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
}

export const CatalogFilters: React.FC<Props> = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterBlock}>
        <span className={styles.label}>Sort by</span>
        <select
          className={styles.select}
          value={sort}
          onChange={e => onSortChange(e.target.value)}
        >
          <option value={SortType.AGE}>Newest</option>
          <option value={SortType.TITLE}>Alphabetically</option>
          <option value={SortType.PRICE}>Cheapest</option>
        </select>
      </div>

      <div className={styles.filterBlock}>
        <span className={styles.label}>Items on page</span>
        <select
          className={styles.select}
          value={perPage}
          onChange={e => onPerPageChange(e.target.value)}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>
  );
};
