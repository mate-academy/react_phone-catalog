import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';

import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';

import logoLight from '@/assets/logo/Logo.svg';
import logoDark from '@/assets/logo/Logo-dark.svg';
import CloseIcon from '@/assets/icons/Close.svg';
import MenuIcon from '@/assets/icons/Menu.svg';
import CartIcon from '@/assets/icons/Cart.svg';
import FavoritesIcon from '@/assets/icons/Favorites.svg';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const NAV_LINKS = [
    { id: 'home', title: 'Home', path: '/' },
    { id: 'phones', title: 'Phones', path: '/phones' },
    { id: 'tablets', title: 'Tablets', path: '/tablets' },
    { id: 'accessories', title: 'Accessories', path: '/accessories' },
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.nav__link, { [styles.nav__linkActive]: isActive });

  return (
    <header className={styles.header} id="top">
      <div className={styles.header__inner}>
        <NavLink to="/" className={styles.logoContainer} onClick={closeMenu}>
          <img
            src={isDark ? logoDark : logoLight}
            alt="Nice Gadgets"
            className={styles.header__logo}
          />
        </NavLink>

        <button className={styles.menuButton} onClick={toggleMenu}>
          <img
            src={isMenuOpen ? CloseIcon : MenuIcon}
            alt="menu toggle"
            className={styles.icon}
          />
        </button>
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
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.actions__item}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>

          <NavLink
            to="/favorite"
            className={styles.actions__item}
            onClick={closeMenu}
          >
            <img src={FavoritesIcon} alt="Favorites" className={styles.icon} />
          </NavLink>

          <NavLink
            to="/cart"
            className={styles.actions__item}
            onClick={closeMenu}
          >
            <img src={CartIcon} alt="Cart" className={styles.icon} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
