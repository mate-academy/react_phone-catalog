import { useEffect, useState } from 'react';
import styles from './Preferences.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';

export const Preferences = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') || '';
  const showSearch =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';
  const [inputValue, setInputValue] = useState(query);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (!showSearch || isMobile) {
    return null;
  }

  return (
    <div className={styles.preferences}>
      {showSearch && (
        <div className={styles.control}>
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
