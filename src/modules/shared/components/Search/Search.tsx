import React, { useState } from 'react';
import styles from './Search.module.scss';
import { useSearchParams } from 'react-router-dom';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [value, setValue] = useState(query);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setValue(newValue);

    const params = new URLSearchParams(searchParams);

    if (newValue) {
      params.set('query', newValue);
    } else {
      params.delete('query');
    }

    params.delete('page');
    setSearchParams(params);
  };

  return (
    <div className={styles.search}>
      <span className={styles.searchIcon} aria-hidden="true" />

      <input
        type="search"
        value={value}
        className={styles.searchInput}
        onChange={handleQueryChange}
        placeholder="Search"
        aria-label="Search"
        name="query"
      />
    </div>
  );
};
