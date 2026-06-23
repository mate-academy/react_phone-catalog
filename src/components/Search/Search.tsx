import { useEffect, useState, useMemo } from 'react';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchIcon } from '../ui/SearchIcon';
import { CloseIcon } from '../ui/CloseIcon';
import { PathType } from '../../types/Types';
import styles from './Search.module.scss';

const SEARCHABLE_PATHS = [
  PathType.PHONES,
  PathType.TABLETS,
  PathType.ACCESSORIES,
  PathType.FAVOURITES,
];

export const Search: React.FC = () => {
  const { query, handleQueryChange } = useCatalogParams();
  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery, 500);
  const location = useLocation();

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery !== query) {
      handleQueryChange(debouncedQuery);
    }
  }, [debouncedQuery, handleQueryChange, query]);

  const showSearch = SEARCHABLE_PATHS.includes(location.pathname as PathType);

  const pageTitle = useMemo(() => {
    const pathname = location.pathname.replace('/', '');

    if (!pathname) {
      return null;
    }

    return pathname.charAt(0).toUpperCase() + pathname.slice(1);
  }, [location.pathname]);

  if (!showSearch) {
    return null;
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.search__input}
        placeholder={`Search in ${pageTitle}...`}
        value={localQuery}
        onChange={event => setLocalQuery(event.target.value)}
        aria-label={`Search in ${pageTitle}`}
      />
      {localQuery ? (
        <button
          type="button"
          className={styles.search__button}
          onClick={() => setLocalQuery('')}
          aria-label="Clear search"
        >
          <CloseIcon />
        </button>
      ) : (
        <button
          className={styles.search__button}
          type="button"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
};
