import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

export const Search: React.FC = () => {
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const updateSearchQuery = (value: string) => {
    const trimmedValue = value.trim();
    const newQuery = new URLSearchParams(searchParams.toString());

    if (trimmedValue) {
      newQuery.set('query', trimmedValue);
    } else {
      newQuery.delete('query');
    }

    setSearchParams(newQuery);
  };

  const debouncedUpdateSearchQuery = debounce(updateSearchQuery, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    debouncedUpdateSearchQuery(inputValue);
    setQuery(inputValue);
  };

  const isHidden =
    pathname === '/' ||
    pathname === '/favorites' ||
    pathname === '/cart' ||
    pathname === '/products' ||
    pathname.startsWith('/products/');

  return (
    <div className={classNames(styles.search, { [styles.hidden]: isHidden })}>
      <input
        id="search"
        type="search"
        value={query}
        onChange={handleSearchChange}
        placeholder={`Search in ${pathname.replace('/', '')}...`}
        className={styles.searchInput}
      />
    </div>
  );
};
