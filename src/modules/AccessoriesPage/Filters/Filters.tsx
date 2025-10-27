import React from 'react';
import { SortBy, ItemsPerPage } from '../../../types';
import {
  SORT_OPTIONS,
  ITEMS_PER_PAGE_OPTIONS,
} from '../../shared/constants/sortOptions';
import styles from './Filters.module.scss';

interface Props {
  sortBy: SortBy;
  itemsPerPage: ItemsPerPage;
  onSortChange: (sortBy: SortBy) => void;
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void;
  totalItems: number;
  className?: string;
}

export const Filters: React.FC<Props> = ({
  sortBy,
  itemsPerPage,
  onSortChange,
  onItemsPerPageChange,
  totalItems,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__item}>
        <label htmlFor="sort-select" className={styles.filters__label}>
          Sort by
        </label>
        <select
          id="sort-select"
          className={styles.filters__select}
          value={sortBy}
          onChange={e => onSortChange(e.target.value as SortBy)}
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filters__item}>
        <label htmlFor="items-select" className={styles.filters__label}>
          Items per page
        </label>
        <select
          id="items-select"
          className={styles.filters__select}
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(e.target.value as ItemsPerPage)}
        >
          {ITEMS_PER_PAGE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filters__count}>{totalItems} items</div>
    </div>
  );
};
