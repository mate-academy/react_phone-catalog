import React from 'react';
import { ItemsPerPage } from '../../modules/shared/types/ItemsPerPage';
import { SortType } from '../../modules/shared/types/SortType';
import styles from './ProductFilter.module.scss';

type Props = {
  sortBy: SortType;
  onSortChange: (value: SortType) => void;
  itemsPerPage: ItemsPerPage;
  onItemsPerPageChange: (value: ItemsPerPage) => void;
};

export const ProductFilter: React.FC<Props> = ({
  sortBy,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className={styles.filtersContainer}>
      <div className={`${styles.filterGroup} ${styles.filterGroupSort}`}>
        <div className={styles.filterText}>Sort by</div>
        <select
          className={styles.select}
          value={sortBy}
          onChange={e => onSortChange(e.target.value as SortType)}
        >
          <option value="newest" selected className={styles.selected}>
            Newest
          </option>
          <option value="cheapest">Cheapest</option>
          <option value="alphabetically">Alphabetically</option>
        </select>
      </div>
      <div className={`${styles.filterGroup} ${styles.filterGroupItems}`}>
        <div className={styles.filterText}>Items on page</div>
        <select
          className={styles.select}
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(e.target.value as ItemsPerPage)}
        >
          <option value="4" selected className={styles.selected}>
            4
          </option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>
  );
};
