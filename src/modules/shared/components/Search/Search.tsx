import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('query') || '';

  const [value, setValue] = useState(queryFromUrl);

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (value.trim()) {
        params.set('query', value);
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, setSearchParams, searchParams]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search..."
        className={styles.search__input}
      />

      {value && (
        <button
          className={styles.search__clear}
          onClick={() => setValue('')}
          type="button"
        >
          <img
            src={`${import.meta.env.BASE_URL}img/icons/close.svg`}
            alt="Clear"
          />
        </button>
      )}
    </div>
  );
};
