import React from 'react';
import styles from './PageSort.module.scss';
type Props = {
  sort: string;
  perPage: string;
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
};

export const PageFilter: React.FC<Props> = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
}) => {
  return (
    <div className={styles.filter}>
      <div className={styles.filter__sortBy}>
        <p>Sort by</p>
        <select
          className={styles.filter__select}
          value={sort}
          onChange={e => onSortChange(e.target.value)}
        >
          <option value="year">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>
      <div>
        <p>Items on page</p>
        <select
          value={perPage}
          onChange={e => onPerPageChange(e.target.value)}
          className={styles.filter__itemPages}
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
