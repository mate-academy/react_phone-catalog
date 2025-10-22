import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../../../contexts/CartContext';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { ROUTES } from '../../constants/routes';
import { CATEGORIES, CATEGORY_NAMES } from '../../constants/categories';
import styles from './Header.module.scss';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: favoritesState } = useFavorites();
  const location = useLocation();

  const cartItemsCount = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const favoritesCount = favoritesState.items.length;

  const isActiveLink = (path: string) => location.pathname === path;
  const isCategoryActive = (category: string) =>
    location.pathname.startsWith(`/${category}`);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.header__logo}>
          <img
            src="img/logo.png"
            alt="Nice Gadgets Logo"
            className={styles.header__logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.header__nav}>
          <Link
            to={ROUTES.HOME}
            className={classNames(styles.header__navLink, {
              [styles.header__navLink_active]: isActiveLink(ROUTES.HOME),
            })}
          >
            Home
          </Link>

          <Link
            to={ROUTES.PHONES}
            className={classNames(styles.header__navLink, {
              [styles.header__navLink_active]: isCategoryActive(
                CATEGORIES.PHONES,
              ),
            })}
          >
            {CATEGORY_NAMES.phones}
          </Link>

          <Link
            to={ROUTES.TABLETS}
            className={classNames(styles.header__navLink, {
              [styles.header__navLink_active]: isCategoryActive(
                CATEGORIES.TABLETS,
              ),
            })}
          >
            {CATEGORY_NAMES.tablets}
          </Link>

          <Link
            to={ROUTES.ACCESSORIES}
            className={classNames(styles.header__navLink, {
              [styles.header__navLink_active]: isCategoryActive(
                CATEGORIES.ACCESSORIES,
              ),
            })}
          >
            {CATEGORY_NAMES.accessories}
          </Link>
        </nav>

        {/* Desktop Icons */}
        <div className={styles.header__icons}>
          {/* Favorites Icon */}
          <Link
            to={ROUTES.FAVORITES}
            className={classNames(
              styles.header__iconLink,
              styles.header__iconLink_favorites,
              {
                [styles.header__iconLink_active]: isActiveLink(
                  ROUTES.FAVORITES,
                ),
              },
            )}
          >
            <div className={styles.header__iconWrapper}>
              <img
                src="img/icons/heart.png"
                alt="Favorites"
                className={styles.header__icon}
              />
              {favoritesCount > 0 && (
                <span className={styles.header__badge}>{favoritesCount}</span>
              )}
            </div>
          </Link>

          {/* Cart Icon */}
          <Link
            to={ROUTES.CART}
            className={classNames(styles.header__iconLink, {
              [styles.header__iconLink_active]: isActiveLink(ROUTES.CART),
            })}
          >
            <div className={styles.header__iconWrapper}>
              <img
                src="img/icons/icon-shopping-bag.png"
                alt="Shopping Cart"
                className={styles.header__icon}
              />
              {cartItemsCount > 0 && (
                <span className={styles.header__badge}>{cartItemsCount}</span>
              )}
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.header__menuButton}
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <img
            src={
              isMenuOpen
                ? 'img/icons/icon-close.png'
                : 'img/icons/icon-menu.png'
            }
            alt="Menu"
            className={styles.header__menuIcon}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={classNames(styles.header__mobileMenu, {
          [styles.header__mobileMenu_open]: isMenuOpen,
        })}
      >
        <nav className={styles.header__mobileNav}>
          <Link
            to={ROUTES.HOME}
            className={classNames(styles.header__mobileNavLink, {
              [styles.header__mobileNavLink_active]: isActiveLink(ROUTES.HOME),
            })}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to={ROUTES.PHONES}
            className={classNames(styles.header__mobileNavLink, {
              [styles.header__mobileNavLink_active]: isCategoryActive(
                CATEGORIES.PHONES,
              ),
            })}
            onClick={closeMenu}
          >
            {CATEGORY_NAMES.phones}
          </Link>

          <Link
            to={ROUTES.TABLETS}
            className={classNames(styles.header__mobileNavLink, {
              [styles.header__mobileNavLink_active]: isCategoryActive(
                CATEGORIES.TABLETS,
              ),
            })}
            onClick={closeMenu}
          >
            {CATEGORY_NAMES.tablets}
          </Link>

          <Link
            to={ROUTES.ACCESSORIES}
            className={classNames(styles.header__mobileNavLink, {
              [styles.header__mobileNavLink_active]: isCategoryActive(
                CATEGORIES.ACCESSORIES,
              ),
            })}
            onClick={closeMenu}
          >
            {CATEGORY_NAMES.accessories}
          </Link>
        </nav>

        <div className={styles.header__mobileIcons}>
          {/* Favorites Icon */}
          <Link
            to={ROUTES.FAVORITES}
            className={classNames(styles.header__iconLink, {
              [styles.header__iconLink_active]: isActiveLink(ROUTES.FAVORITES),
            })}
            onClick={closeMenu}
          >
            <div className={styles.header__iconWrapper}>
              <img
                src="img/icons/heart.png"
                alt="Favorites"
                className={styles.header__icon}
              />
              {favoritesCount > 0 && (
                <span className={styles.header__badge}>{favoritesCount}</span>
              )}
            </div>
          </Link>

          {/* Cart Icon */}
          <Link
            to={ROUTES.CART}
            className={classNames(styles.header__iconLink, {
              [styles.header__iconLink_active]: isActiveLink(ROUTES.CART),
            })}
            onClick={closeMenu}
          >
            <div className={styles.header__iconWrapper}>
              <img
                src="img/icons/icon-shopping-bag.png"
                alt="Shopping Cart"
                className={styles.header__icon}
              />
              {cartItemsCount > 0 && (
                <span className={styles.header__badge}>{cartItemsCount}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
