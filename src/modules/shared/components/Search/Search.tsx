import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchIcon, CloseIcon } from '../Icons/Icons';
import styles from './Search.module.scss';

const DEBOUNCE_DELAY = 500;

/** Pages that render a ProductsList, so a search field makes sense there. */
const searchablePages: Record<string, string> = {
  '/phones': 'phones',
  '/tablets': 'tablets',
  '/accessories': 'accessories',
  '/favorites': 'favorites',
};

export const Search = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get('query') || '');

  const searchTarget = searchablePages[pathname];

  useEffect(() => {
    if (!searchTarget) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      if (value === (searchParams.get('query') || '')) {
        return;
      }

      const next = new URLSearchParams(searchParams);

      if (value.trim()) {
        next.set('query', value);
      } else {
        next.delete('query');
      }

      next.delete('page');
      setSearchParams(next, { replace: true });
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timerId);
  }, [value, searchTarget, searchParams, setSearchParams]);

  if (!searchTarget) {
    return null;
  }

  return (
    <div className={styles.search}>
      <SearchIcon size={16} className={styles.icon} />

      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder={`Search in ${searchTarget}...`}
        aria-label={`Search in ${searchTarget}`}
        onChange={event => setValue(event.target.value)}
      />

      {value && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={() => setValue('')}
        >
          <CloseIcon size={14} />
        </button>
      )}
    </div>
  );
};
