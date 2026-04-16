import React, { useEffect, useState } from 'react';
import { themes, useTheme } from '../../../../store/theme/ThemeContext';
import { Theme } from '../../../../types/Theme';
import styles from './Preferences.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';

export const Preferences = () => {
  const { theme, setTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') || '';
  const showSearch =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);

        if (inputValue) {
          params.set('query', inputValue);
        } else {
          params.delete('query');
        }

        return params;
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as Theme);
  };

  return (
    <div className={styles.preferences}>
      {!showSearch && (
        <div className={styles.control}>
          <label htmlFor="theme-select" className={styles.label}>
            Theme
          </label>
          <select
            id="theme-select"
            className={styles.themeSelect}
            value={theme}
            onChange={handleThemeChange}
          >
            {themes.map(item => (
              <option key={item.value} value={item.value} className={styles.a}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
      )}

      {showSearch && (
        <div className={styles.control}>
          <label htmlFor="search" className={styles.labelSearch}>
            Search
          </label>
          <input
            name="search"
            type="search"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search..."
            className={styles.search}
          />
        </div>
      )}
    </div>
  );
};
