import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchBar.module.scss';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    if (debouncedValue === (searchParams.get('query') || '')) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (debouncedValue) {
      params.set('query', debouncedValue);
    } else {
      params.delete('query');
    }

    params.delete('page');
    setSearchParams(params, { replace: true });
  }, [debouncedValue, searchParams, setSearchParams]);

  return (
    <input
      type="search"
      className={styles.search}
      placeholder="Search"
      aria-label="Search"
      value={value}
      onChange={e => setValue(e.target.value)}
      data-cy="searchInput"
    />
  );
};
