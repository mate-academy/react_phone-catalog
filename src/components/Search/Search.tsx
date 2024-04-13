import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';
import classNames from 'classnames';

export const Search: React.FC = () => {
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const updateSearchQuery = (value: string) => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      currentSearchParams.set('query', value);
    } else {
      currentSearchParams.delete('query');
    }

    setSearchParams(currentSearchParams);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(event.target.value);
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
        type="search"
        value={query}
        onChange={handleSearchChange}
        placeholder={`Search in ${pathname.replace('/', '')}...`}
        className={styles.searchInput}
      />
    </div>
  );
};
