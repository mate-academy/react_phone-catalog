import React from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { CartIcon, HeartIcon } from '../Icons';
import { CATEGORIES } from '../../constants/categories';

interface NavLinkItem {
  title: string;
  navTitle?: string;
  path: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { title: 'Home', navTitle: 'Home', path: '/' },
  ...CATEGORIES,
];

const getNavLinkClass = (isActive: boolean) =>
  classNames(styles.nav__link, { [styles.active]: isActive });

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <NavLink to="/" className={styles.logo} aria-label="Go to home page">
            <span className={styles.logoText}>Nice Gadgets</span>
          </NavLink>

          <nav className={styles.nav}>
            {NAV_LINKS.map(({ title, navTitle, path }) => (
              <NavLink
                key={path}
                to={path}
                className={state => getNavLinkClass(state.isActive)}
              >
                {navTitle || title}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.actions__link, { [styles.active]: isActive })
            }
          >
            <HeartIcon />
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.actions__link, { [styles.active]: isActive })
            }
          >
            <CartIcon />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
