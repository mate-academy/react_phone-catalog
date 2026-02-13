/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const [isSwitched, setIsSwitched] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [setOpenSort, setOpenItem]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.themeswitcher}>
        <span className={styles.title}>Theme</span>
        <button
          className={styles.button}
          onClick={() => setOpenSort(!openSort)}
        >
          {isSwitched ? 'Black': }
          <img
            src={
              openSort
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
                setSort('Newest');
                setOpenSort(!openSort);
              }}
            >
              Newest
            </li>
            <li
              onClick={() => {
                setSort('Alphabetically');
                setOpenSort(!openSort);
              }}
            >
              Alphabetically
            </li>
            <li
              onClick={() => {
                setSort('Cheapest');
                setOpenSort(!openSort);
              }}
            >
              Cheapest
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
