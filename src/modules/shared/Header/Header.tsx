import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import cn from 'classnames';
import { useGlobalState } from '../../../context/store';
import { navLinks } from '../../../constants/navLinks';
import { BurgerMenu } from '../BurgerMenu';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navLink, { [styles.navLinkActive]: isActive });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.iconLink, { [styles.iconLinkActive]: isActive });

export const Header: FC = () => {
  const { toggleMenu, cart, favourites, theme, toggleTheme } = useGlobalState();

  return (
    <div className={styles.content}>
      <Link to="/" className={styles.logoLink}>
        <img
          src={
            theme === 'dark'
              ? '/img/icons/logo.svg'
              : '/img/icons/logo-light-theme.svg'
          }
          alt="logo"
          className={styles.logoImg}
        />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLinks.map(link => (
            <li key={link.title} className={styles.navItem}>
              <NavLink to={link.path} className={getNavLinkClass}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <button onClick={toggleTheme} className={styles.themeSwitcher}>
          {theme === 'dark' ? '🌞' : '🌜'}
        </button>

        <button onClick={toggleMenu} className={styles.buttonMenu}>
          <span
            className={cn(styles.iconMenu, {
              [styles.iconMenuLight]: theme === 'light',
            })}
          ></span>
        </button>
      </div>

      <div className={styles.icons}>
        <NavLink to="/favourites" className={getIconLinkClass}>
          <div className={styles.iconWrapper}>
            <span
              className={cn({
                [styles.iconFavourite]: theme === 'dark',
                [styles.iconFavouriteLight]: theme === 'light',
              })}
            ></span>

            {favourites.length > 0 && (
              <span className={styles.itemsAmount}>{favourites.length}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getIconLinkClass}>
          <div className={styles.iconWrapper}>
            <span
              className={cn({
                [styles.iconCart]: theme === 'dark',
                [styles.iconCartLight]: theme === 'light',
              })}
            ></span>

            {cart.length > 0 && (
              <span className={styles.itemsAmount}>{cart.length}</span>
            )}
          </div>
        </NavLink>
      </div>

      <BurgerMenu />
    </div>
  );
};
