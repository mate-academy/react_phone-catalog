import React from 'react';
import styles from './ProductFilter.module.scss';

interface ProductFilterProps {
  sort: string;
  itemsPerPage: number;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  sort,
  itemsPerPage,
  onSortChange,
  onItemsPerPageChange,
}) => (
  <div className={styles.blocks}>
    <div className={styles.sorting}>
      <p className={styles.sorting__label}>Sort by</p>
      <div className={styles.sorting__selectContainer}>
        <select
          className={styles.sorting__select}
          id="sort-select"
          value={sort}
          onChange={onSortChange}
        >
          <option className={styles.sorting__option} value="age">
            Newest
          </option>
          <option className={styles.sorting__option} value="title">
            Alphabetically
          </option>
          <option className={styles.sorting__option} value="price">
            Cheapest
          </option>
        </select>
      </div>
    </div>

    <div className={styles.itemsPerPage}>
      <p className={styles.itemsPerPage__label}>Items on page</p>
      <div className={styles.itemsPerPage__selectContainer}>
        <select
          id="per-page"
          className={styles.itemsPerPage__select}
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          aria-label="Select number of items per page"
        >
          <option className={styles.itemsPerPage__option} value={4}>
            4
          </option>
          <option className={styles.itemsPerPage__option} value={8}>
            8
          </option>
          <option className={styles.itemsPerPage__option} value={16}>
            16
          </option>
          <option
            className={styles.itemsPerPage__option}
            value={Number.MAX_SAFE_INTEGER}
          >
            All
          </option>
        </select>
      </div>
    </div>
  </div>
);
