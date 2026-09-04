import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchField.module.scss';

type Props = {
  id: string;
  placeholder: string;
};

export const SearchField = ({ id, placeholder }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(prev => {
        const currentQuery = prev.get('query') || '';

        if (currentQuery === value) {
          return prev;
        }

        const next = new URLSearchParams(prev);

        if (value) {
          next.set('query', value);
        } else {
          next.delete('query');
        }

        next.delete('page');

        return next;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [value, setSearchParams]);

  return (
    <div className={styles.wrapper}>
      <input
        id={id}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={event => setValue(event.target.value)}
      />

      {value && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={() => setValue('')}
        >
          ✕
        </button>
      )}
    </div>
  );
};
