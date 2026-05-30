import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';

import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from './components/ThemeToggle';

import LogoLight from '@/assets/logo/Logo.svg?react';
import LogoDark from '@/assets/logo/Logo-dark.svg?react';
import CloseIcon from '@/assets/icons/Close.svg?react';
import MenuIcon from '@/assets/icons/Menu.svg?react';
import CartIcon from '@/assets/icons/Cart.svg?react';
import FavoritesIcon from '@/assets/icons/Favorites.svg?react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Search } from '../Search';


export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { totalQuantity } = useCart();
  const { t } = useTranslation();

  const favoritesCount = favorites.length;
  const cartCount = totalQuantity;

   useEffect(() => {
     document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';

     return () => {
       document.body.style.overflow = 'unset';
     };
   }, [isMenuOpen]);

   useEffect(() => {
     setIsMenuOpen(false);
   }, [location.pathname]);

  const isDark = theme === 'dark';
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NAV_LINKS = [
    { id: 1, title: 'nav.home', path: '/' },
    { id: 2, title: 'nav.phones', path: '/phones' },
    { id: 3, title: 'nav.tablets', path: '/tablets' },
    { id: 4, title: 'nav.accessories', path: '/accessories' },
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.nav__link, { [styles.nav__linkActive]: isActive });

  const getActionLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.actions__item, { [styles.actions__itemActive]: isActive });

  return (
    <header className={styles.header} id="top">
      <div className={styles.header__inner}>
        <NavLink to="/" className={styles.logoContainer} onClick={closeMenu}>
          {isDark ? (
            <LogoDark className={styles.logo} />
          ) : (
            <LogoLight className={styles.logo} />
          )}
        </NavLink>

        <div className={styles.mobileActions}>
          <div className={styles.searchMobileWrapper}>
            <Search onClose={closeMenu} />
          </div>

          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? (
              <CloseIcon className={styles.icon} />
            ) : (
              <MenuIcon className={styles.icon} />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(styles.menuContent, {
          [styles.menuContentVisible]: isMenuOpen,
        })}
      >
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {NAV_LINKS.map(({ id, title, path }) => (
              <li key={id} className={styles.nav__item}>
                <NavLink
                  to={path}
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  {t(title)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.searchDesktopWrapper}>
            <Search />
          </div>

          <div className={styles.actions__item}>
            <ThemeToggle
              isDark={isDark}
              onToggle={toggleTheme}
              onClick={closeMenu}
            />
          </div>

          <NavLink
            to="/favorites"
            className={getActionLinkClass}
            onClick={closeMenu}
          >
            <div className={styles.iconWrapper}>
              <FavoritesIcon className={styles.icon} />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={getActionLinkClass}
            onClick={closeMenu}
          >
            <div className={styles.iconWrapper}>
              <CartIcon className={styles.icon} />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
          </NavLink>

          <LanguageSwitcher onClose={closeMenu} />
        </div>
      </div>
    </header>
  );
};
