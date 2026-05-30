/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [theme, setIsSwitched] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.themeswitcher} ref={switcherRef}>
        <button className={styles.button} onClick={prev => setIsOpened(!prev)}>
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
                setIsSwitched(false);
              }}
            >
              White
            </li>
            <li
              onClick={() => {
                setIsSwitched(true);
              }}
            >
              Black
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
