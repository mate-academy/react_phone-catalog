import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './SearchField.module.scss';

export const SearchField = ({ category }: { category: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setValue(query), [query]);

  useEffect(() => {
    if (value === query) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams);

      if (value.trim()) {
        next.set('query', value);
      } else {
        next.delete('query');
      }

      next.delete('page');
      setSearchParams(next, { replace: true });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [value, query, searchParams, setSearchParams]);

  return (
    <div className={styles.search}>
      <label className="visually-hidden" htmlFor="catalog-search">
        Search {category}
      </label>
      <input
        ref={inputRef}
        id="catalog-search"
        type="search"
        placeholder={`Search ${category}...`}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue('');
            inputRef.current?.focus();
          }}
        >
          <Icon name="close" />
        </button>
      ) : (
        <Icon name="search" />
      )}
    </div>
  );
};
