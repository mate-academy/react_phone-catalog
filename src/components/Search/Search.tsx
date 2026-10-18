import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';
import React from 'react';

interface Props {
  placeholder?: string;
}

const SEARCH_PATH =
  'M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 ' +
  '7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 ' +
  '4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z';

export const Search: React.FC<Props> = ({ placeholder = 'Search...' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(initialQuery);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    const timer = setTimeout(() => {
      const currentUrlQuery = searchParams.get('query') || '';

      if (query !== currentUrlQuery) {
        const newParams = new URLSearchParams(searchParams);

        // Проверяем, не состоит ли строка только из пробелов
        if (query.trim() !== '') {
          // ПЕРЕДАЕМ ЗНАЧЕНИЕ БЕЗ .trim(), ЧТОБЫ НЕ УДАЛЯТЬ ПРОБЕЛ ВО ВРЕМЯ ПЕЧАТИ
          newParams.set('query', query);
        } else {
          newParams.delete('query');
        }

        newParams.set('page', '1');
        setSearchParams(newParams);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchParams, setSearchParams]);

  const clearSearch = () => setQuery('');

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {query ? (
        <button className={styles.iconBtn} onClick={clearSearch}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12"
              stroke="var(--c-icons)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 4L12 12"
              stroke="var(--c-icons)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <div className={styles.iconBtn}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={SEARCH_PATH}
              stroke="var(--c-icons)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 14L11.1 11.1"
              stroke="var(--c-icons)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
