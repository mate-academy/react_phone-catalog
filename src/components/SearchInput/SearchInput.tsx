import React from 'react';
import styles from './SearchInput.module.scss';
import { useSearchParams } from 'react-router-dom';

export const SearchInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const text = event.target.value;

    if (text.trim() === '') {
      nextParams.delete('query');
    } else {
      nextParams.set('query', text);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  return (
    <div className={styles.search}>
      <div className={styles.search__wrapper}>
        <img
          src="/react_phone-catalog/img/icons/icon-search.svg"
          alt="Search icon"
          className={styles.search__icon}
        />
        <input
          type="text"
          id="search-input"
          className={styles.search__input}
          placeholder="Type here..."
          value={query}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};
