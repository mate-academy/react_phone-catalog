/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import styles from './CatalogFilters.module.scss';

interface Props {
  sort: string;
  itemsPerPage: number;
  query: string;
  onSortChange: (value: string) => void;
  onItemsPerPageChange: (value: number) => void;
  onQueryChange: (value: string) => void;
}

export const CatalogFilters = ({
  sort,
  itemsPerPage,
  query,
  onSortChange,
  onItemsPerPageChange,
  onQueryChange,
}: Props) => {
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== query) {
        onQueryChange(searchValue);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, query, onQueryChange]);

  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label htmlFor="search">Search</label>

        <input
          id="search"
          type="search"
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="sort-by">Sort by</label>

        <select
          id="sort-by"
          value={sort}
          onChange={event => onSortChange(event.target.value)}
        >
          <option value="newest">Newest</option>

          <option value="alphabetically">Alphabetically</option>

          <option value="cheapest">Cheapest</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="items-per-page">Items on page</label>

        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={event => onItemsPerPageChange(Number(event.target.value))}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={0}>All</option>
        </select>
      </div>
    </div>
  );
};
