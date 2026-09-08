/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [setIsOpened]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <div className={styles.themeswitcher} ref={switcherRef}>
        <button
          className={styles.button}
          onClick={() => setIsOpened(prev => !prev)}
        >
          Theme
          <img
            src={
              isOpened
                ? 'images/Chevron (Arrow Up).svg'
                : 'images/Chevron (Arrow Down).svg'
            }
            alt="arr"
          />
        </button>

        {isOpened && (
          <ul className={styles.select}>
            <li
              onClick={() => {
                setTheme('light');
              }}
            >
              Light
            </li>
            <li
              onClick={() => {
                setTheme('dark');
              }}
            >
              Dark
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
