import React from 'react';
import { SortType } from '../../utils/types';
import styles from './SortProducts.module.scss';

type Props = {
  selectedSortType: string;
  searchParams: URLSearchParams;
  setSearchParams: (value: URLSearchParams) => void;
  itemsOnPage: string;
};
export const SortProducts: React.FC<Props> = ({
  selectedSortType,
  searchParams,
  setSearchParams,
  itemsOnPage,
}) => {
  const handleSortTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', event.target.value);
    setSearchParams(params);
  };

  const handlePagesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', event.target.value);
    setSearchParams(params);
  };

  return (
    <div className={styles.selects}>
      <div className={styles.selects__select}>
        <label htmlFor="sortField" className={styles.selects__label}>
          Sort by
        </label>
        <select
          value={selectedSortType}
          name="sortBy"
          id="sortField"
          className={styles.selects__field}
          onChange={handleSortTypeChange}
        >
          <option value={SortType.newest}>Newest</option>
          <option value={SortType.alpha}>Alphabetically</option>
          <option value={SortType.cheapest}>Cheapest</option>
        </select>
      </div>
      <div className={styles.selects__select}>
        <label htmlFor="itemsOnPage" className={styles.selects__label}>
          Items on page
        </label>
        <select
          value={itemsOnPage}
          name="itemsOnPage"
          id="itemsOnPage"
          className={styles.selects__field}
          onChange={handlePagesChange}
        >
          <option value={'all'}>all</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
        </select>
      </div>
    </div>
  );
};
