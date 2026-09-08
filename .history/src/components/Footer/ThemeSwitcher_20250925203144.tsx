/* eslint-disable max-len */
import React, { useState } from 'react';
import styles from './_variables.scss';

export const ThemeSwitcherProvider = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleSwitchTheme = () => {
    setIsSwitched(prev => !prev);
  };
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenSort(false);
        setOpenItem(false);
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
          {sort}
          <img
            src={
              openSort
                ? 'images/Chevron (Arrow Up).svg'
                : 'images/Chevron (Arrow Down).svg'
            }
            alt="arr"
          />
        </button>

        {openSort && (
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
