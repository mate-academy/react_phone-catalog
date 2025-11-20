import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../modules/shared/i18n/i18n';
import { useTheme } from '../../modules/shared/context/ThemeContext';
import styles from './Header.module.scss';
import { Button } from '../UI/Button/Button';
import { useCart } from '../../modules/shared/context/CartContext';
import { useFavorites } from '../../modules/shared/context/FavoriteContext';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const logoSrc = theme === 'dark' ? './logo/logo.png' : './logo/logo_dark.png';
  const menuIcon =
    theme === 'dark' ? './img/icons/menu.png' : './img/icons/menu_dark.png';
  const closeIcon =
    theme === 'dark' ? './img/icons/close.png' : './img/icons/close_dark.png';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (!isMobileMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoAndNav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoSrc} alt="Logo" className={styles.logoImage} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            {t('home')}
          </Link>
          <div
            className={styles.dropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              to="/category/phones"
              className={`${styles.dropdownToggle} ${location.pathname.startsWith('/category') ? styles.active : ''}`}
            >
              {t('category')}
            </Link>
            <div
              className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}
            >
              <Link
                to="/category/phones"
                className={`${styles.dropdownMenuLink} ${location.pathname === '/category/phones' ? styles.active : ''}`}
              >
                {t('phones')}
              </Link>
              <Link
                to="/category/tablets"
                className={`${styles.dropdownMenuLink} ${location.pathname === '/category/tablets' ? styles.active : ''}`}
              >
                {t('tablets')}
              </Link>
              <Link
                to="/category/accessories"
                className={`${styles.dropdownMenuLink} ${location.pathname === '/category/accessories' ? styles.active : ''}`}
              >
                {t('accessories')}
              </Link>
            </div>
          </div>
          <Link
            to="/cart"
            className={`${styles.navLink} ${location.pathname === '/cart' ? styles.active : ''}`}
          >
            {t('cart')}
            {cart.length > 0 && (
              <span className={styles.counter}>{cart.length}</span>
            )}
          </Link>
          <Link
            to="/favorites"
            className={`${styles.navLink} ${location.pathname === '/favorites' ? styles.active : ''}`}
          >
            {t('favorites')}
            {favorites.length > 0 && (
              <span className={styles.counter}>{favorites.length}</span>
            )}
          </Link>
        </nav>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          {theme === 'dark' ? '🌞' : '🌙'}
        </Button>
        <div className={styles.actionsDivider}></div>
        <select
          id="language-select"
          name="language"
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
          className={styles.lang}
        >
          <option value="en">EN</option>
          <option value="ua">UA</option>
        </select>
      </div>

      <div
        className={styles.burger}
        onClick={toggleMobileMenu}
        style={{ backgroundImage: `url(${menuIcon})` }}
      ></div>
      <div
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
      >
        <div className={styles.mobileHeader}>
          <Link to="/">
            <img src={logoSrc} alt="Logo" className={styles.logoImage} />
          </Link>
          <div
            className={styles.mobileClose}
            onClick={toggleMobileMenu}
            style={{ backgroundImage: `url(${closeIcon})` }}
          ></div>
        </div>
        <div className={styles.mobileNav}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            onClick={toggleMobileMenu}
          >
            {t('home')}
          </Link>
          <div className={styles.mobileDropdown}>
            <Link
              to="/"
              className={`${styles.dropdownToggle} ${location.pathname.startsWith('/category') ? styles.active : ''}`}
              onClick={toggleDropdown}
            >
              {t('category')}
            </Link>
            <div
              className={`${styles.mobileDropdownMenu} ${isDropdownOpen ? styles.open : ''}`}
            >
              <Link
                to="/category/phones"
                className={`${styles.dropdownMenuLink} ${location.pathname === '/category/phones' ? styles.active : ''}`}
                onClick={toggleMobileMenu}
              >
                {t('phones')}
              </Link>
              <Link
                to="/category/tablets"
                className={`${styles.dropdownMenuLink} ${location.pathname === '/category/tablets' ? styles.active : ''}`}
                onClick={toggleMobileMenu}
              >
                {t('tablets')}
              </Link>
              <Link
                to="/category/accessories"
                className={`${styles.dropdownMenuLink} ${location.pathname === '/category/accessories' ? styles.active : ''}`}
                onClick={toggleMobileMenu}
              >
                {t('accessories')}
              </Link>
            </div>
          </div>
          <Link
            to="/cart"
            className={`${styles.navLink} ${location.pathname === '/cart' ? styles.active : ''}`}
            onClick={toggleMobileMenu}
          >
            {t('cart')}
            {cart.length > 0 && (
              <span className={styles.counter}>{cart.length}</span>
            )}
          </Link>
          <Link
            to="/favorites"
            className={`${styles.navLink} ${location.pathname === '/favorites' ? styles.active : ''}`}
            onClick={toggleMobileMenu}
          >
            {t('favorites')}
            {favorites.length > 0 && (
              <span className={styles.counter}>{favorites.length}</span>
            )}
          </Link>
        </div>
        <div className={styles.mobileActions}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              toggleTheme();
              toggleMobileMenu();
            }}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </Button>
          <select
            id="mobile-language-select"
            name="mobile-language"
            className={styles.lang}
            value={i18n.language}
            onChange={e => {
              i18n.changeLanguage(e.target.value);
              toggleMobileMenu();
            }}
          >
            <option value="en">EN</option>
            <option value="ua">UA</option>
          </select>
        </div>
      </div>
    </header>
  );
};
