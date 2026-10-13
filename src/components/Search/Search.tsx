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

  // Синхронизация с URL при нажатии кнопок браузера Назад/Вперед
  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  // Тот самый Дебаунс (задержка)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    const timer = setTimeout(() => {
      // Смотрим, какой запрос сейчас реально в URL
      const currentUrlQuery = searchParams.get('query') || '';

      // Обновляем параметры ТОЛЬКО если текст в строке поиска реально изменился
      if (query !== currentUrlQuery) {
        const newParams = new URLSearchParams(searchParams);

        if (query.trim()) {
          newParams.set('query', query.trim());
        } else {
          newParams.delete('query');
        }

        // Вот теперь сброс на 1 страницу сработает только при вводе текста!
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
          {/* Иконка крестика */}
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
          {/* Иконка лупы */}
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
