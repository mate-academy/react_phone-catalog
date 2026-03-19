import React from 'react';
import styles from './CatalogFilters.module.scss';
import ArrowDown from '@/assets/icons/ArrowDown.svg?react';

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
      <div className={styles.filters__group}>
        <label htmlFor="sort-select" className={styles.filters__label}>
          Sort by
        </label>
        <div className={styles.filters__wrapper}>
          <select
            id="sort-select"
            className={styles.filters__select}
            value={sort}
            onChange={e => onSortChange(e.target.value)}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
          <ArrowDown className={styles.selectIcon} />
        </div>
      </div>

      <div className={styles.filters__group}>
        <label htmlFor="per-page-select" className={styles.filters__label}>
          Items on page
        </label>
        <div className={styles.filters__wrapper}>
          <select
            id="per-page-select"
            className={styles.filters__select}
            value={perPage}
            onChange={e => onPerPageChange(e.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
          <ArrowDown className={styles.selectIcon} />
        </div>
      </div>
    </div>
  );
};
