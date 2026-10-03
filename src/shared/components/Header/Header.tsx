import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { Menu } from '../Menu';
import { useCart, useFavorites } from '../../context';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalCount } = useCart();
  const { totalFavorites } = useFavorites();

  useEffect(() => {
    setIsMenuOpen(false);
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

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.isActive : ''}`;

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconLink} ${isActive ? styles.iconActive : ''}`;

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftSide}>
          <Link to="/">
            <img src="img/icons/Logo.svg" alt="Logo" className={styles.logo} />
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getNavLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getNavLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getNavLinkClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.rightSideDesktop}>
          <NavLink to="/favorites" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <img
                src="img/icons/Favourites.svg"
                alt="Favorites"
                className={styles.icon}
              />
              {totalFavorites > 0 && (
                <span className={styles.badge}>{totalFavorites}</span>
              )}
            </div>
          </NavLink>

          <NavLink to="/cart" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <img
                src="img/icons/ShoppingBag.svg"
                alt="Shopping bag"
                className={styles.icon}
              />
              {totalCount > 0 && (
                <span className={styles.badge}>{totalCount}</span>
              )}
            </div>
          </NavLink>
        </div>

        <button
          className={styles.burgerButton}
          onClick={e => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <img
              src="img/icons/Close.svg"
              alt="Close menu"
              className={styles.icon}
            />
          ) : (
            <img
              src="img/icons/Union.svg"
              alt="Open menu"
              className={styles.icon}
            />
          )}
        </button>
      </header>
      {isMenuOpen && <Menu onClose={handleClose} />}
    </>
  );
};
