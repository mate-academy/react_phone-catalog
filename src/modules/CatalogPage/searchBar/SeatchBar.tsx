import { useSearchParams } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';

interface SearchParams {
  [key: string]: string | string[] | null;
}

export const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const isDark = useAppSelector(state => state.boolean.isDark);

  function getSearchWith(
    currentParams: URLSearchParams,
    paramsToUpdate: SearchParams,
  ): URLSearchParams {
    const newParams = new URLSearchParams(currentParams.toString());

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    return newParams;
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedParams = getSearchWith(searchParams, {
      query: event.target.value,
    });

    const params = new URLSearchParams();

    params.set('query', event.target.value);

    setSearchParams(updatedParams);
  };

  return (
    <div className={styles.ssearchBar}>
      {isDark ? (
        <img
          className={styles.searchIco}
          src="./icons/dark-theme-icons/search-ico.svg"
          alt="search"
        />
      ) : (
        <img
          className={styles.searchIco}
          src="./icons/search-ico.svg"
          alt="search"
        />
      )}
      <input
        value={query}
        type="search"
        className={`${styles.searchField} ${isDark && styles.darkSearchField}`}
        placeholder="Search"
        onChange={handleQueryChange}
      />
    </div>
  );
};
