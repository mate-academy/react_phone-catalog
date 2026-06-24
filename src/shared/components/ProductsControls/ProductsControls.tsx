import React from 'react';
import {
  SORT,
  SortBy,
  ITEMS_PER_PAGE_OPTIONS,
  ItemsPerPage,
} from '../../constants';
import styles from './ProductsControls.module.scss';

type Props = {
  sortBy: SortBy;
  setSortBy: (value: SortBy) => void;

  itemsPerPage: ItemsPerPage;
  setItemsPerPage: (value: ItemsPerPage) => void;
};

export const ProductsControls: React.FC<Props> = ({
  sortBy,
  setSortBy,
  itemsPerPage,
  setItemsPerPage,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.selectGroup}>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortBy)}
          className={styles.select}
        >
          <option value={SORT.NEWEST}>Newest</option>
          <option value={SORT.ALPHA}>Alphabetically</option>
          <option value={SORT.CHEAPEST}>Cheapest</option>
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label htmlFor="perPage">Items on page:</label>
        <select
          id="perPage"
          value={itemsPerPage}
          onChange={event =>
            setItemsPerPage(
              event.target.value === 'all'
                ? 'all'
                : (Number(event.target.value) as ItemsPerPage),
            )
          }
          className={styles.select}
        >
          {ITEMS_PER_PAGE_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
