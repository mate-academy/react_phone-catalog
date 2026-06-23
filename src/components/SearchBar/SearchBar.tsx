import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebouncedValue } from '../../modules/shared/hooks';
import styles from './SearchBar.module.scss';

interface Props {
  placeholder: string;
}

export const SearchBar = ({ placeholder }: Props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') ?? '');
  const debouncedValue = useDebouncedValue(value);
  const inputId = 'catalog-search';

  useEffect(() => {
    setValue(searchParams.get('query') ?? '');
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedValue.trim()) {
      params.set('query', debouncedValue.trim());
      params.delete('page');
    } else {
      params.delete('query');
    }

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [debouncedValue, searchParams, setSearchParams]);

  return (
    <label className={styles.search} htmlFor={inputId}>
      <i className={`fa-solid fa-magnifying-glass ${styles.icon}`} />
      <input
        id={inputId}
        className={styles.input}
        type="search"
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </label>
  );
};
