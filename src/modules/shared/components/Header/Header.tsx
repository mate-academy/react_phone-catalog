import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { scrollToTop } from '../../utils/functions';
import { useFavourites } from '../../contexts/FavouritesContext';
import { useCart } from '../../contexts/CartContext';
import { useEffect, useState } from 'react';

export const Header = () => {
  const location = useLocation();
  const { favIconsId } = useFavourites();
  const { totalQuantity } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className={styles.header}>
      <Link
        to=""
        className={classNames(styles.navbarTitle, styles.navbarLogo)}
        onClick={scrollToTop}
      >
        <img src={`${import.meta.env.BASE_URL}/img/Logo.svg`} alt="logo" />
      </Link>

      <div className={classNames(styles.navbar, styles.navbarStart)}>
        <NavLink
          to="home"
          className={classNames(styles.navbarTitle, {
            [styles.active]: location.pathname === '/',
          })}
          onClick={scrollToTop}
        >
          Home
        </NavLink>
        <NavLink
          to="phones"
          className={classNames(styles.navbarTitle, {
            [styles.active]: location.pathname === '/phones',
          })}
          onClick={scrollToTop}
        >
          Phones
        </NavLink>
        <NavLink
          to="tablets"
          className={classNames(styles.navbarTitle, {
            [styles.active]: location.pathname === '/tablets',
          })}
          onClick={scrollToTop}
        >
          Tablets
        </NavLink>
        <NavLink
          to="accessories"
          className={classNames(styles.navbarTitle, {
            [styles.active]: location.pathname === '/accessories',
          })}
          onClick={scrollToTop}
        >
          Accessories
        </NavLink>
      </div>

      <div className={styles.navbar}>
        <Link
          to={'favorites'}
          className={classNames(styles.navbarEnd, 'icons', {
            [styles.activeIcon]: location.pathname === '/favorites',
          })}
        >
          <img
            src={`${import.meta.env.BASE_URL}/img/like.svg`}
            alt="logo"
            className={classNames(styles.headerIcon)}
          />
          {favIconsId.length > 0 && (
            <span className={styles.badge}>{favIconsId.length}</span>
          )}
        </Link>
        <Link
          to={'cart'}
          className={classNames(styles.navbarEnd, 'icons', {
            [styles.activeIcon]: location.pathname === '/cart',
          })}
        >
          <img
            src={`${import.meta.env.BASE_URL}/img/buy.svg`}
            alt="logo"
            className={classNames(styles.headerIcon)}
          />
          {totalQuantity > 0 && (
            <span className={styles.badge}>{totalQuantity}</span>
          )}
        </Link>
      </div>
      <button
        type="button"
        className={classNames(styles.navbarEnd, 'icons', styles.menu)}
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <img
          src={`${import.meta.env.BASE_URL}/img/Menu.svg`}
          alt="logo"
          className="logo"
        />
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuTop}>
            <Link
              to=""
              className={styles.navbarLogo}
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/Logo.svg`}
                alt="logo"
              />
            </Link>
            <button
              type="button"
              className={styles.mobileMenuClose}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/close.svg`}
                alt="close"
              />
            </button>
          </div>

          <nav className={styles.mobileMenuNav}>
            <NavLink
              to="home"
              className={classNames(styles.mobileMenuLink, {
                [styles.active]: location.pathname === '/',
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="phones"
              className={classNames(styles.mobileMenuLink, {
                [styles.active]: location.pathname === '/phones',
              })}
            >
              Phones
            </NavLink>
            <NavLink
              to="tablets"
              className={classNames(styles.mobileMenuLink, {
                [styles.active]: location.pathname === '/tablets',
              })}
            >
              Tablets
            </NavLink>
            <NavLink
              to="accessories"
              className={classNames(styles.mobileMenuLink, {
                [styles.active]: location.pathname === '/accessories',
              })}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileMenuBottom}>
            <Link
              to="favorites"
              className={classNames(styles.mobileMenuBottomLink, {
                [styles.activeIcon]: location.pathname === '/favorites',
              })}
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/like.svg`}
                alt="favorites"
                className={styles.headerIcon}
              />
              {favIconsId.length > 0 && (
                <span className={styles.badge}>{favIconsId.length}</span>
              )}
            </Link>
            <Link
              to="cart"
              className={classNames(styles.mobileMenuBottomLink, {
                [styles.activeIcon]: location.pathname === '/cart',
              })}
            >
              <img
                src={`${import.meta.env.BASE_URL}/img/buy.svg`}
                alt="cart"
                className={styles.headerIcon}
              />
              {totalQuantity > 0 && (
                <span className={styles.badge}>{totalQuantity}</span>
              )}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
