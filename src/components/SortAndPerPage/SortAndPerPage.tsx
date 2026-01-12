import React from 'react';
import styles from './SortAndPerPage.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  sortValue: string;
  onSortChange: (value: string) => void;
  sortOptions: Option[];
  perPageValue: string | number;
  onPerPageChange: (value: string) => void;
  perPageOptions: Option[];
}

export const SortAndPerPage: React.FC<Props> = ({
  sortValue,
  onSortChange,
  sortOptions,
  perPageValue,
  onPerPageChange,
  perPageOptions,
}) => (
  <div className={styles.sortControls}>
    <div className={styles.sortControls__group}>
      <label htmlFor="sort-select" className={styles.sortControls__label}>
        Sort by
      </label>
      <div className={styles.sortControls__selectWrapper}>
        <select
          id="sort-select"
          className={styles.sortControls__select}
          value={sortValue}
          onChange={e => onSortChange(e.target.value)}
          aria-label="Sort by"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className={styles.sortControls__selectArrow}>
          <img src="/icons/Chevron (Arrow Down).svg" alt="down" />
        </div>
      </div>
    </div>
    <div className={styles.sortControls__group}>
      <label htmlFor="per-page-select" className={styles.sortControls__label}>
        Items on page
      </label>
      <div className={styles.sortControls__selectWrapper}>
        <select
          id="per-page-select"
          className={styles.sortControls__select}
          value={perPageValue}
          onChange={e => onPerPageChange(e.target.value)}
          aria-label="Items on page"
        >
          {perPageOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className={styles.sortControls__selectArrow}>
          <img src="/icons/Chevron (Arrow Down).svg" alt="down" />
        </div>
      </div>
    </div>
  </div>
);
