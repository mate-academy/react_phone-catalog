/* eslint-disable max-len */
import { FC, useEffect, useRef, useState } from 'react';
import { useSearchParamsState } from '../../../CategoryPage/hooks/useSearchParamsState';
import { debounce } from '../../utils';
import s from './SearchBar.module.scss';

export const SearchBar: FC = () => {
  const { query, setQuery } = useSearchParamsState();
  const [localValue, setLocalValue] = useState(query);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // store timer to cancel debounce on unmount
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setQuery(value);
    }, 500),
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setLocalValue(value);

    debounceTimer.current = debouncedSetQuery(value);
  };

  const clearSearch = () => {
    setLocalValue('');
    setQuery('');
    inputRef.current?.focus();
  };

  // Sync UI when URL query changes externally
  useEffect(() => {
    setLocalValue(query);
  }, [query]);

  // Cancel pending debounce when component unmounts
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <span className={s.iconSearch}></span>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className={s.input}
        value={localValue}
        onChange={handleChange}
      />

      {localValue && (
        <button className={s.clearBtn} onClick={clearSearch}>
          ×
        </button>
      )}
    </div>
  );
};
