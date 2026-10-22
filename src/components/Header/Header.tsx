import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import { useFavorites } from '../../shared/context/FavoritesContext';
import { useCart } from '../../shared/context/CartContext';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { useLanguage } from '../../shared/context/LanguageContext';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useTheme } from '../../shared/context/ThemeContext';

import styles from './Header.module.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const { items: cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;
  const { theme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <NavLink to="/" replace className={styles.logo}>
          <img
            src={
              theme === 'dark'
                ? './img/logo/Logo.svg'
                : './img/logo/LogoLight.svg'
            }
            alt="Logo"
            className={styles.logoImage}
          />
        </NavLink>

        {/* Desktop navigation */}
        <nav className={styles.navDesktop}>
          <NavLink to="/" end className={getNavClass}>
            {t.navigation.home}
          </NavLink>

          <NavLink to="/phones" className={getNavClass}>
            {t.navigation.phones}
          </NavLink>

          <NavLink to="/tablets" className={getNavClass}>
            {t.navigation.tablets}
          </NavLink>

          <NavLink to="/accessories" className={getNavClass}>
            {t.navigation.accessories}
          </NavLink>
        </nav>

        {/* Actions */}
        <div className={styles.actionsButtons}>
          <LanguageSwitcher />
          <ThemeSwitcher />

          {/* Favorites */}
          <NavLink to="/favorites" className={styles.icon}>
            <div className={styles.iconInner}>
              <span
                className={`${styles.maskIcon} ${
                  favoritesCount === 0
                    ? styles.favoriteEmptyIcon
                    : styles.favoriteIcon
                }`}
                role="img"
                aria-label={t.navigation.favorites}
              />

              {favoritesCount > 0 && (
                <span className={styles.counter}>{favoritesCount}</span>
              )}
            </div>
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className={styles.icon}>
            <div className={styles.iconInner}>
              <span
                className={`${styles.maskIcon} ${
                  cartCount === 0 ? styles.cartEmptyIcon : styles.cartIcon
                }`}
                role="img"
                aria-label={t.navigation.cart}
              />

              {cartCount > 0 && (
                <span className={styles.counter}>{cartCount}</span>
              )}
            </div>
          </NavLink>
        </div>

        {/* Mobile burger */}
        <button
          className={styles.burger}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <img
            className={styles.burgerImage}
            src="./img/icons/Menu.svg"
            alt="Menu"
          />
        </button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            {/* Top bar */}
            <div className={styles.mobileTop}>
              <NavLink
                to="/"
                replace
                className={styles.mobileLogo}
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src={
                    theme === 'dark'
                      ? './img/logo/Logo.svg'
                      : './img/logo/LogoLight.svg'
                  }
                  alt="Logo"
                  className={styles.mobileLogoImage}
                />
              </NavLink>

              <button
                className={styles.close}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <img
                  className={styles.closeImage}
                  src="./img/icons/Close.svg"
                  alt="Close"
                />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className={styles.navMobile}>
              <NavLink
                to="/"
                end
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navigation.home}
              </NavLink>

              <NavLink
                to="/phones"
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navigation.phones}
              </NavLink>

              <NavLink
                to="/tablets"
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navigation.tablets}
              </NavLink>

              <NavLink
                to="/accessories"
                className={getNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navigation.accessories}
              </NavLink>
            </nav>

            {/* Mobile actions */}
            <div className={styles.mobileActions}>
              <LanguageSwitcher />
              <ThemeSwitcher />

              {/* Favorites */}
              <NavLink
                to="/favorites"
                className={styles.icon}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.iconInner}>
                  <span
                    className={`${styles.maskIcon} ${
                      favoritesCount === 0
                        ? styles.favoriteEmptyIcon
                        : styles.favoriteIcon
                    }`}
                    role="img"
                    aria-label={t.navigation.favorites}
                  />

                  {favoritesCount > 0 && (
                    <span className={styles.counter}>{favoritesCount}</span>
                  )}
                </div>
              </NavLink>

              {/* Cart */}
              <NavLink
                to="/cart"
                className={styles.icon}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.iconInner}>
                  <span
                    className={`${styles.maskIcon} ${cartCount === 0 ? styles.cartEmptyIcon : styles.cartIcon}`}
                    role="img"
                    aria-label={t.navigation.cart}
                  />

                  {cartCount > 0 && (
                    <span className={styles.counter}>{cartCount}</span>
                  )}
                </div>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
