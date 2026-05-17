import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchInput.module.scss';

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setValue(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchParams(prev => {
        const currentQuery = (prev.get('query') || '').trim();
        const nextQuery = value.trim();

        if (currentQuery === nextQuery) {
          return prev;
        }

        const next = new URLSearchParams(prev);

        if (nextQuery) {
          next.set('query', nextQuery);
        } else {
          next.delete('query');
        }

        next.delete('page');

        return next;
      });
    }, 350);

    return () => clearTimeout(timerId);
  }, [value, setSearchParams]);

  return (
    <input
      type="search"
      className={styles.input}
      placeholder="Search"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  );
};
