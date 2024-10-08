import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PagesPath } from '../../../types/PagesPath';

type PageLink = { name: string; path: string };

const pages: PageLink[] = [
  { name: 'Home', path: PagesPath.Home },
  { name: 'Phones', path: PagesPath.Phones },
  { name: 'Tablets', path: PagesPath.Tablets },
  { name: 'Accessories', path: PagesPath.Accessories },
];

function getClass({ isActive }: { isActive: boolean }) {
  return classNames(styles.menuLink, { [styles.menuLink_active]: isActive });
}

export const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleResize = () => {
      if (window.innerWidth > 639 && isMenuActive) {
        setIsMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuActive]);

  return (
    <header
      className={classNames(styles.header, {
        [styles.header_overflowMenu]: isMenuActive,
      })}
    >
      <div className={styles.content_top}>
        <Link to={PagesPath.Home} className={styles.logo}>
          <img src="/public/icons/logo.svg" alt="Logo" />
        </Link>

        <nav className={styles.menu}>
          {pages.map(page => (
            <NavLink key={page.path} to={page.path} className={getClass}>
              {page.name}
            </NavLink>
          ))}
        </nav>

        <div className={styles.buttons}>
          <NavLink
            to="/"
            className={`${styles.button} ${styles.button_favourites}`}
          />
          <NavLink
            to="/"
            className={`${styles.button} ${styles.button_cart}`}
          />
        </div>

        {isMenuActive ? (
          <button
            className={`${styles.button} ${styles.button_closeMenu}`}
            onClick={() => setIsMenuActive(false)}
          />
        ) : (
          <button
            className={`${styles.button} ${styles.button_burgerMenu}`}
            onClick={() => setIsMenuActive(true)}
          />
        )}
      </div>

      <div
        className={classNames(styles.content_bottom, {
          [styles.content_bottom_active]: isMenuActive,
        })}
      >
        <nav className={`${styles.phoneMenu}`}>
          {pages.map(page => (
            <NavLink
              key={page.path}
              to={page.path}
              className={getClass}
              onClick={() => setIsMenuActive(false)}
            >
              {page.name}
            </NavLink>
          ))}
        </nav>

        <div className={styles.buttons_phoneMenu}>
          <NavLink
            to="/"
            className={`${styles.button} ${styles.button_favourites}`}
            style={{ width: '50%', height: '64px' }}
            onClick={() => setIsMenuActive(false)}
          />
          <NavLink
            to="/"
            className={`${styles.button} ${styles.button_cart}`}
            style={{ width: '50%', height: '64px' }}
            onClick={() => setIsMenuActive(false)}
          />
        </div>
      </div>
    </header>
  );
};
