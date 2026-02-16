import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import MobileMenu from '../MobileMenu';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { favourites } = useFavourites();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(
        `.${styles.active}`,
      ) as HTMLElement;

      if (activeLink) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      } else {
        setIndicatorStyle({
          left: 0,
          width: 0,
        });
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          <Link to="/" className={styles.header__logo}>
            <img src="icons/Logo.svg" alt="Gadget Catalog" />
          </Link>
          <div className={`container ${styles.header__inner}`}>
            <nav className={styles.header__nav} ref={navRef}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Home
              </NavLink>
              <NavLink
                to="/products/phones"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Phones
              </NavLink>
              <NavLink
                to="/products/tablets"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Tablets
              </NavLink>
              <NavLink
                to="/products/accessories"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Accessories
              </NavLink>
              <span
                className={styles.header__indicator}
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            </nav>
          </div>
          <div className={styles.header__actions}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `${styles.header__action} ${isActive ? styles.active : ''}`
              }
            >
              <img src="icons/Favourites (Heart Like).svg" alt="Favourites" />
              {favourites.length > 0 && (
                <span className={styles.header__badge}>
                  {favourites.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.header__action} ${isActive ? styles.active : ''}`
              }
            >
              <img src="icons/Shopping bag (Cart).svg" alt="Cart" />
              {cart.length > 0 && (
                <span className={styles.header__badge}>{cart.length}</span>
              )}
            </NavLink>
          </div>
          <button
            className={styles.header__burger}
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? 'icons/Close.svg' : 'icons/Menu.svg'}
              alt={isMenuOpen ? 'Close' : 'Menu'}
            />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        favouritesCount={favourites.length}
        cartCount={cart.length}
      />
    </>
  );
};

export default Header;
