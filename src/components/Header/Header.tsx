import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, { [styles.isActive]: isActive });

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'visible';
  }, [location]);

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => {
      const newState = !prev;

      document.body.style.overflow = newState ? 'hidden' : 'visible';

      return newState;
    });
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            {/* ✅ Poprawna ścieżka do public/img/logo.svg */}
            <img src="/img/logo.svg" alt="Nice Gadgets" />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink to="/" className={getLinkClass}>
                  Home
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/phones" className={getLinkClass}>
                  Phones
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/tablets" className={getLinkClass}>
                  Tablets
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/accessories" className={getLinkClass}>
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <div className={styles.desktopIcons}>
              <NavLink to="/favorites" className={styles.iconBtn}>
                {/* ✅ Jeśli ikony są w public/img/icons/, dodaj /icons/ do ścieżki */}
                <img src="/img/icons/favourites.svg" alt="Favorites" />
              </NavLink>
              <NavLink to="/cart" className={styles.iconBtn}>
                <img src="/img/icons/cart.svg" alt="Cart" />
              </NavLink>
            </div>

            <button
              type="button"
              className={styles.burgerBtn}
              onClick={handleToggleMenu}
            >
              <img
                src={
                  /* ✅ USUNIĘTO "public" ze ścieżki - to był błąd */
                  isMenuOpen ? '/img/icons/close.svg' : '/img/icons/menu.svg'
                }
                alt="Toggle menu"
              />
            </button>
          </div>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
