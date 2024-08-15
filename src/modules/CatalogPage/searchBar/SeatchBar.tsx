import { useSearchParams } from 'react-router-dom';
import styles from './SearchBar.scss';
import React from 'react';

interface SearchParams {
  [key: string]: string | string[] | null;
}

export const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

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
    <input
      value={query}
      type="search"
      className={styles.searchBar}
      placeholder="Search"
      onChange={handleQueryChange}
    />
  );
};
