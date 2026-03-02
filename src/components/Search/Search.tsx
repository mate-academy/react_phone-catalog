import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const applyQuery = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }

      params.delete('page');

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyQuery(inputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, applyQuery]);

  const handleClear = () => {
    setInputValue('');
    applyQuery('');
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {inputValue ? (
        <button type="button" className={styles.icon} onClick={handleClear}>
          <img src="/img/icons/close.svg" alt="Clear" />
        </button>
      ) : (
        <span className={styles.icon}>
          <img src="/img/icons/search.svg" alt="Search" />
        </span>
      )}
    </div>
  );
};
