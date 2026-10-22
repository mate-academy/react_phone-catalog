import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './SearchField.module.scss';
import { asset } from '../../../../helper';

export const SearchField: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    setSearchParams(params);
  };

  const handleCancelSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('search');
    setSearchParams(params);
  };

  return (
    <div className={styles['search-field-wrapper']}>
      <img
        src={asset('img/magnifying-glass.svg')}
        className={styles.icon}
        alt="Search"
      />
      <input
        type="text"
        value={search}
        className={styles['search-field']}
        onChange={handleSearch}
        placeholder="Search..."
      />

      {search && (
        <button
          type="button"
          className={styles['cancel-button']}
          onClick={handleCancelSearch}
        >
          <img
            src={asset('img/close-secondary.svg')}
            className={styles['cancel-icon']}
            alt="Cancel"
          />
        </button>
      )}
    </div>
  );
};
