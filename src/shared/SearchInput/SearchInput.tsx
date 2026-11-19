import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './SearchInput.module.scss';

const DEBOUNCE_DELAY = 300;

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [value, setValue] = useState<string>(searchParams.get('query') ?? '');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const trimmedValue = value.trim();

      if (trimmedValue) {
        params.set('query', trimmedValue);
      } else {
        params.delete('query');
      }

      setSearchParams(params, { replace: true });
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timer);
  }, [value, location.search, setSearchParams]);

  useEffect(() => {
    setValue(searchParams.get('query') ?? '');
  }, [searchParams]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <i className="fas fa-search" />
      <input
        className={styles.input}
        type="search"
        name="search"
        placeholder="Search products"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
