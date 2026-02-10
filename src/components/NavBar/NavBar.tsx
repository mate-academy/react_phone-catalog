import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../utils/hooks';
import { selectTotalQuantity } from '../../features/cart';
import { selectFavoritesCount } from '../../features/favorites';
import { useTheme } from '../../context/ThemeContext';

export const NavBar: React.FC = () => {
  const productsInCart = useAppSelector(state => selectTotalQuantity(state));
  const productsInFavorite = useAppSelector(state =>
    selectFavoritesCount(state),
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const { theme, toggleTheme } = useTheme();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navigation__link, {
      [styles['navigation__link--active']]: isActive,
    });
  };

  const getButtonClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navigation__button, {
      [styles['navigation__button--active']]: isActive,
    });
  };

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navigation__mobileMenu__link, {
      [styles['navigation__mobileMenu__link--active']]: isActive,
    });
  };

  const getMobileButtonClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navigation__mobileMenu__button, {
      [styles['navigation__mobileMenu__button--active']]: isActive,
    });
  };

  return (
    <div className={styles.navigation}>
      <Link to="/" className={styles.navigation__logo}>
        <img src="/img/Logo.svg" alt="logo: Nice Gadgets" />
      </Link>
      <div className={styles.navigation__links}>
        <NavLink className={getLinkClass} to="/">
          <span>Home</span>
        </NavLink>
        <NavLink className={getLinkClass} to="/phones">
          <span>Phones</span>
        </NavLink>
        <NavLink className={getLinkClass} to="/tablets">
          <span>Tablets</span>
        </NavLink>
        <NavLink className={getLinkClass} to="/accessories">
          <span>Accessories</span>
        </NavLink>
      </div>
      <div className={styles.navigation__rightButtons}>
        <button
          className={styles.navigation__themeChanger}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <img src="/img/icons/sun-icon.png" alt="Light mode" />
          ) : (
            <img src="/img/icons/moon-icon.png" alt="Dark mode" />
          )}
        </button>
        <div className={styles.navigation__desktopButtons}>
          <NavLink to="/favourites" className={getButtonClass}>
            <div className={styles.navigation__iconContainer}>
              {productsInFavorite > 0 && (
                <div className={styles.navigation__iconContainer__counter}>
                  {productsInFavorite}
                </div>
              )}
              <img
                src="/img/icons/favourites(heart-like).svg"
                alt="Favourite icon"
              />
            </div>
          </NavLink>
          <NavLink to="/cart" className={getButtonClass}>
            <div className={styles.navigation__iconContainer}>
              {productsInCart > 0 && (
                <div className={styles.navigation__iconContainer__counter}>
                  {productsInCart}
                </div>
              )}
              <img src="/img/icons/shopping-bag(cart).svg" alt="Cart icon" />
            </div>
          </NavLink>
        </div>

        <button className={styles.navigation__burger} onClick={toggleMenu}>
          {isMenuOpen ? (
            <img src="/img/icons/close.svg" alt="Close" />
          ) : (
            <img src="/img/icons/menu.svg" alt="Menu" />
          )}
        </button>
      </div>

      <div
        className={classNames(styles.navigation__mobileMenu, {
          [styles.isOpen]: isMenuOpen,
        })}
      >
        <div className={styles.navigation__mobileMenu__list}>
          <NavLink className={getMobileLinkClass} to="/" onClick={closeMenu}>
            <span>Home</span>
          </NavLink>
          <NavLink
            className={getMobileLinkClass}
            to="/phones"
            onClick={closeMenu}
          >
            <span>Phones</span>
          </NavLink>
          <NavLink
            className={getMobileLinkClass}
            to="/tablets"
            onClick={closeMenu}
          >
            <span>Tablets</span>
          </NavLink>
          <NavLink
            className={getMobileLinkClass}
            to="/accessories"
            onClick={closeMenu}
          >
            <span>Accessories</span>
          </NavLink>
        </div>

        <div className={styles.navigation__mobileMenu__bottom}>
          <NavLink
            to="/favourites"
            className={getMobileButtonClass}
            onClick={closeMenu}
          >
            <div className={styles.navigation__iconContainer}>
              {productsInFavorite > 0 && (
                <div className={styles.navigation__iconContainer__counter}>
                  {productsInFavorite}
                </div>
              )}
              <img
                src="/img/icons/favourites(heart-like).svg"
                alt="Favourite icon"
              />
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={getMobileButtonClass}
            onClick={closeMenu}
          >
            <div className={styles.navigation__iconContainer}>
              {productsInCart > 0 && (
                <div className={styles.navigation__iconContainer__counter}>
                  {productsInCart}
                </div>
              )}
              <img src="/img/icons/shopping-bag(cart).svg" alt="Cart icon" />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
