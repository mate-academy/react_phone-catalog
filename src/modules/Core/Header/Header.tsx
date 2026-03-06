import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import cl from 'classnames';
import styles from './Header.module.scss';

import LOGO from '../../../assets/icons/logo/Logo.svg';
import { BurgerMenuIcon } from '../../../components/Icons/BurgerMenuIcon';
import { CloseIcon } from '../../../components/Icons/CloseIcon';
import { CartIcon } from '../../../components/Icons/CartIcon';
import { FavouritesIcon } from '../../../components/Icons/FavouritesIcon/';
import { scrollToTop } from '../../../utils/scrollToTop';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cl(styles.navLink, {
      [styles.isActive]: isActive,
    });

  const getActionButtonClass = ({ isActive }: { isActive: boolean }) =>
    cl(styles.actionsButton, {
      [styles.isActive]: isActive,
    });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <img src={LOGO} alt="Nice Gadjets logo" />
          </Link>

          <nav className={styles.desktopNav}>
            <ul className={styles.desktopNavList}>
              <li className={styles.navItem}>
                <NavLink to="/" className={getLinkClass} onClick={scrollToTop}>
                  Home
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to="/phones"
                  className={getLinkClass}
                  onClick={scrollToTop}
                >
                  Phones
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to="/tablets"
                  className={getLinkClass}
                  onClick={scrollToTop}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to="/accessories"
                  className={getLinkClass}
                  onClick={scrollToTop}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <NavLink
              to="/favourites"
              className={styles.iconButton}
              onClick={scrollToTop}
            >
              <FavouritesIcon />
            </NavLink>
            <NavLink
              to="/cart"
              className={styles.iconButton}
              onClick={scrollToTop}
            >
              <CartIcon />
            </NavLink>

            <button className={styles.burgerButton} onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <BurgerMenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <aside
        className={cl(styles.mobileMenu, {
          [styles.isOpen]: isMenuOpen,
        })}
      >
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <NavLink to="/" className={getLinkClass} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/phones"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/tablets"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/accessories"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.bottomActions}>
          <NavLink to="/favourites" className={getActionButtonClass}>
            <FavouritesIcon />
          </NavLink>
          <NavLink to="/cart" className={getActionButtonClass}>
            <CartIcon />
          </NavLink>
        </div>
      </aside>
    </>
  );
};
