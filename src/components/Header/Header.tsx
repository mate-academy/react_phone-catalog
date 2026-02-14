import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState, useMemo, useCallback } from 'react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import React from 'react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, {
    [styles['nav__link--active']]: isActive,
  });

export const Header: React.FC = React.memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favouritesCount } = useFavourites();
  const { cartTotalItemsCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const logoUrl = useMemo(() => `img/icons/NiceGadgets-${theme}.png`, [theme]);

  useLockBodyScroll(isMenuOpen);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header--mobile']}>
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/">
              <img src={logoUrl} alt="Logo" />
            </Link>

            <button onClick={toggleTheme} className={styles.toggleThemeMobile}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              onClick={toggleMenu}
              className={styles.toggleButton}
              aria-label="Toggle menu"
            >
              <img src={`img/icons/menu-icon-${theme}.svg`} />
            </button>
          </div>
        </div>

        <aside
          className={classNames(styles.menu, { [styles.active]: isMenuOpen })}
        >
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/">
              <img src={logoUrl} alt="Logo" />
            </Link>

            <button onClick={toggleTheme} className={styles.toggleThemeDesktop}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              onClick={toggleMenu}
              className={styles.toggleButton}
              aria-label="Toggle menu"
            >
              <img src={`img/icons/close-icon-${theme}.svg`} />
            </button>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              {navItems.map(({ to, label }) => (
                <li key={to} className={styles.nav__item}>
                  <NavLink
                    to={to}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.menu__icons}>
            <NavLink
              to="/favourites"
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClassName}
            >
              <span className={styles.iconWrap}>
                <img
                  src={`img/icons/favorites-icon-${theme}.svg`}
                  alt="Favorites"
                  className={styles.icon}
                />
                {favouritesCount > 0 && (
                  <span className={styles.itemAmount}>{favouritesCount}</span>
                )}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClassName}
            >
              <span className={styles.iconWrap}>
                <img
                  src={`img/icons/cart-icon-${theme}.svg`}
                  alt="Cart"
                  className={styles.icon}
                />
                {cartTotalItemsCount > 0 && (
                  <span className={styles.itemAmount}>
                    {cartTotalItemsCount}
                  </span>
                )}
              </span>
            </NavLink>
          </div>
        </aside>
      </header>
    </>
  );
});
