import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './SearchField.module.scss';

export const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const placeholders: Record<string, string> = {
    '/': 'Search all products...',
    '/search': 'Search all products...',
    '/phones': 'Search phones...',
    '/tablets': 'Search tablets...',
    '/accessories': 'Search accessories...',
  };

  const placeholder = placeholders[pathname] || 'Search products...';
  const query = searchParams.get('query') || '';
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    const normalizedValue = value.trim();

    if (normalizedValue === query) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (pathname === '/') {
        navigate(`/search?query=${encodeURIComponent(normalizedValue)}`);

        return;
      }

      setSearchParams(
        params => {
          const newParams = new URLSearchParams(params);

          if (normalizedValue) {
            newParams.set('query', normalizedValue);
          } else {
            newParams.delete('query');
          }

          newParams.delete('page');

          return newParams;
        },
        { replace: true },
      );
    }, 300);

    return () => window.clearTimeout(timer);
  }, [value, query, pathname, navigate, setSearchParams]);

  return (
    <input
      ref={inputRef}
      className={styles.input}
      type="search"
      value={value}
      onChange={event => setValue(event.target.value)}
      placeholder={placeholder}
      aria-label="Search products"
    />
  );
};
