import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';

const SEARCHABLE_PATHS = ['/phones', '/tablets', '/accessories', '/favourites'];

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(queryParam);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isSearchVisible = SEARCHABLE_PATHS.includes(pathname);

  // Sync internal value when queryParam changes or path changes
  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam, pathname]);

  // Debounced search update to URL
  useEffect(() => {
    if (!isSearchVisible) {
      return;
    }

    const timer = setTimeout(() => {
      const currentQuery = searchParams.get('query') || '';
      const trimmed = inputValue.trim();

      if (trimmed === currentQuery) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);

      if (trimmed) {
        nextParams.set('query', trimmed);
        nextParams.set('page', '1');
      } else {
        nextParams.delete('query');
      }

      setSearchParams(nextParams);
    }, 350);

    return () => clearTimeout(timer);
  }, [inputValue, isSearchVisible, searchParams, setSearchParams]);

  if (!isSearchVisible) {
    return null;
  }

  const getPlaceholder = () => {
    switch (pathname) {
      case '/phones':
        return 'Search in phones...';
      case '/tablets':
        return 'Search in tablets...';
      case '/accessories':
        return 'Search in accessories...';
      case '/favourites':
        return 'Search in favourites...';
      default:
        return 'Search...';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');

    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete('query');
    setSearchParams(nextParams);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.search}>
      <span className={styles.search__icon}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="search"
        className={styles.search__input}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={handleInputChange}
        aria-label="Search items"
      />
      {inputValue.length > 0 && (
        <button
          type="button"
          className={styles.search__clear}
          onClick={handleClear}
          aria-label="Clear search"
          title="Clear search"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};
