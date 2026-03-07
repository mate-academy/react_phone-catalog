import { useEffect, useState } from 'react';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchIcon } from '../ui/SearchIcon';
import { CloseIcon } from '../ui/CloseIcon';
import styles from './Search.module.scss';

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

  const showSearch = ['/phones', '/tablets', '/accessories'].includes(
    location.pathname,
  );

  if (!showSearch) {
    return null;
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.search__input}
        placeholder={`Search in ${location.pathname.replace('/', '')}...`}
        value={localQuery}
        onChange={event => setLocalQuery(event.target.value)}
      />
      {localQuery ? (
        <button
          className={styles.search__button}
          onClick={() => setLocalQuery('')}
        >
          <CloseIcon />
        </button>
      ) : (
        <button className={styles.search__button}>
          <SearchIcon />
        </button>
      )}
    </div>
  );
};
