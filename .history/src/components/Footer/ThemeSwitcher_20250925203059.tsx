/* eslint-disable max-len */
import React, { useState } from "react";
import styles from './_variables.scss';

export const ThemeSwitcherProvider = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleSwitchTheme = () => {
    setIsSwitched(prev => !prev);
  }; const containerRef = useRef<HTMLDivElement>(null);

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
      <div className={styles.first}>
        <span className={styles.title}>Sort by</span>
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

      <div className={styles.second}>
        <span className={styles.title}>Items on page</span>
        <button
          className={styles.button}
          onClick={() => setOpenItem(!openItem)}
        >
          {item}
          <img
            src={
              openItem
                ? 'images/Chevron (Arrow Up).svg'
                : 'images/Chevron (Arrow Down).svg'
            }
            alt="arr"
          />
        </button>

        {openItem && (
          <ul className={styles.select}>
            <li
              onClick={() => {
                setItem('4');
                setPerPage(4);
                setOpenItem(!openItem);
              }}
            >
              4
            </li>
            <li
              onClick={() => {
                setItem('8');
                setPerPage(8);
                setOpenItem(!openItem);
              }}
            >
              8
            </li>
            <li
              onClick={() => {
                setItem('16');
                setPerPage(16);
                setOpenItem(!openItem);
              }}
            >
              16
            </li>
            <li
              onClick={() => {
                setItem('All');
                setPerPage(phones.length);
                setOpenItem(!openItem);
              }}
            >
              All
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
