import { useEffect, useState } from 'react';
import styles from './ColorChange.module.scss';
import classNames from 'classnames';

enum ColorScheme {
  Dark = 'Dark',
  Light = 'Light',
}

export const ColorChange = () => {
  const [colorTheme, setColorTheme] = useState(ColorScheme.Dark);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const pages = document.getElementsByClassName('page');

    Array.from(pages).forEach(page => {
      if (colorTheme === ColorScheme.Light) {
        page.classList.add('page-light');
      } else {
        page.classList.remove('page-light');
      }
    });
  }, [colorTheme]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = document.querySelector(`.${styles.colorChange}`);

      if (element && !element.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div
      className={classNames(styles.colorChange, {
        [styles['colorChange-active']]: isOpen,
      })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className={styles.colorChange__name}>{`${colorTheme} mode`}</span>
      <span
        className={classNames(styles.colorChange__arrow, {
          [styles['colorChange__arrow-active']]: isOpen,
        })}
      />

      {isOpen && (
        <div className={styles.colorChange__list}>
          <span
            onClick={() => setColorTheme(ColorScheme.Dark)}
            className={styles.colorChange__value}
          >{`${ColorScheme.Dark} mode`}</span>
          <span
            onClick={() => setColorTheme(ColorScheme.Light)}
            className={styles.colorChange__value}
          >{`${ColorScheme.Light} mode`}</span>
        </div>
      )}
    </div>
  );
};
