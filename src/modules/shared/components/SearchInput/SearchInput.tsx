import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import styles from './SearchInput.module.scss';

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export const SearchInput: React.FC<Props> = ({
  onSearch,
  placeholder = 'Search...'
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const [inputValue, setInputValue] = useState(queryParam);
  const isFirstRender = useRef(true);

  // Initialize from URL on mount
  useEffect(() => {
    if (isFirstRender.current) {
      setInputValue(queryParam);
      onSearch(queryParam);
      isFirstRender.current = false;
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      onSearch(inputValue);

      // Update URL
      const newParams = new URLSearchParams(searchParams);
      if (inputValue) {
        newParams.set('query', inputValue);
      } else {
        newParams.delete('query');
      }
      setSearchParams(newParams, { replace: true });
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className={styles['search-input']}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={styles['search-input__field']}
      />

      {inputValue ? (
        <button
          type="button"
          onClick={handleClear}
          className={styles['search-input__clear']}
          aria-label="Clear search"
        >
          <Icon name="close" />
        </button>
      ) : (
        <div className={styles['search-input__icon']}>
          <Icon name="search" />
        </div>
      )}
    </div>
  );
};
