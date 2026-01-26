import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';

export const Header = () => {
  const { cartItems } = useCart();
  const { favItems } = useFav();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Klasy pomocnicze
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, { [styles.isActive]: isActive });

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.iconLink, { [styles.isActive]: isActive });

  const getMobileIconClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.mobileIconLink, { [styles.isActive]: isActive });

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img src="/img/logo.svg" alt="Nice Gadgets" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {['/', '/phones', '/tablets', '/accessories'].map(path => (
              <li className={styles.navItem} key={path}>
                <NavLink to={path} className={getLinkClass}>
                  {path === '/' ? 'Home' : path.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* DESKTOP ICONS */}
        <div className={styles.icons}>
          <NavLink to="/favourites" className={getIconClass}>
            <div className={styles.iconWrapper}>
              <img src="/img/icons/favourites.svg" alt="Fav" />
              {favItems.length > 0 && (
                <span className={styles.badge}>{favItems.length}</span>
              )}
            </div>
          </NavLink>
          <NavLink to="/cart" className={getIconClass}>
            <div className={styles.iconWrapper}>
              <img src="/img/icons/cart.svg" alt="Cart" />
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </div>
          </NavLink>
        </div>

        {/* MOBILE BURGER */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={isMenuOpen ? '/img/icons/close.svg' : '/img/icons/menu.svg'}
            alt="Menu"
          />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {['/', '/phones', '/tablets', '/accessories'].map(path => (
              <NavLink key={path} to={path} className={getLinkClass}>
                {path === '/' ? 'Home' : path.slice(1)}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileIcons}>
            <NavLink to="/favourites" className={getMobileIconClass}>
              <div className={styles.iconWrapper}>
                <img src="/img/icons/favourites.svg" alt="Fav" />
                {favItems.length > 0 && (
                  <span className={styles.badge}>{favItems.length}</span>
                )}
              </div>
            </NavLink>
            <NavLink to="/cart" className={getMobileIconClass}>
              <div className={styles.iconWrapper}>
                <img src="/img/icons/cart.svg" alt="Cart" />
                {cartItems.length > 0 && (
                  <span className={styles.badge}>{cartItems.length}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
