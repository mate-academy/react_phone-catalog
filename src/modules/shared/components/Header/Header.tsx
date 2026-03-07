import React from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { CartIcon, HeartIcon } from '../Icons';
import { Category } from '../../../../types/Category';

interface Props {
  categories: Category[];
}

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, { [styles.active]: isActive });

export const Header: React.FC<Props> = ({ categories }) => {
  const navLinks = [
    { title: 'Home', path: '/' },
    ...categories.map(c => ({
      title: c.navTitle || c.title,
      path: c.path,
    })),
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <NavLink to="/" className={styles.logo} aria-label="Go to home page">
            <span className={styles.logoText}>Nice Gadgets</span>
          </NavLink>

          <nav className={styles.nav}>
            {navLinks.map(({ title, path }) => (
              <NavLink key={path} to={path} className={getNavLinkClass}>
                {title}
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
