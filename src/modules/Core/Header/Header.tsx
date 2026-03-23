import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import cl from 'classnames';

import { BurgerMenuIcon } from '../../../components/Icons/BurgerMenuIcon';
import { CloseIcon } from '../../../components/Icons/CloseIcon';
import { CartIcon } from '../../../components/Icons/CartIcon';
import { FavouritesIcon } from '../../../components/Icons/FavouritesIcon/';
import { scrollToTop } from '../../../utils/scrollToTop';
import { ThemeSwitcher } from './components';
import { useFavourites } from '../../../hooks/useFavourites';
import { useCart } from '../../../hooks/useCart';
import { useTheme } from '../../../hooks/useTheme';

import logoLight from '../../../assets/icons/logo/LogoLight.svg';
import logoDark from '../../../assets/icons/logo/LogoDark.svg';

import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme } = useTheme();
  const { favourites } = useFavourites();
  const { cartItems } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cl(styles.navLink, {
      [styles.isActive]: isActive,
    });

  const getIconButtonClass = ({ isActive }: { isActive: boolean }) =>
    cl(styles.iconButton, {
      [styles.isActive]: isActive,
    });

  const getActionButtonClass = ({ isActive }: { isActive: boolean }) =>
    cl(styles.actionsButton, {
      [styles.isActive]: isActive,
    });

  const handleMobileClick = () => {
    scrollToTop();
    closeMenu();
  };

  const favCount = favourites.length;
  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

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

  const LOGO = theme === 'light' ? logoLight : logoDark;

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
            <ThemeSwitcher />

            <NavLink
              to="/favourites"
              className={getIconButtonClass}
              onClick={scrollToTop}
            >
              <FavouritesIcon isFilled={false} />

              {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
            </NavLink>

            <NavLink
              to="/cart"
              className={getIconButtonClass}
              onClick={scrollToTop}
            >
              <CartIcon />

              {totalCartCount > 0 && (
                <span className={styles.badge}>{totalCartCount}</span>
              )}
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
              <NavLink
                to="/"
                className={getLinkClass}
                onClick={handleMobileClick}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/phones"
                className={getLinkClass}
                onClick={handleMobileClick}
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/tablets"
                className={getLinkClass}
                onClick={handleMobileClick}
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/accessories"
                className={getLinkClass}
                onClick={handleMobileClick}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.bottomActions}>
          <NavLink
            to="/favourites"
            className={getActionButtonClass}
            onClick={handleMobileClick}
          >
            <div className={styles.iconWrapper}>
              <FavouritesIcon isFilled={false} />

              {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={getActionButtonClass}
            onClick={handleMobileClick}
          >
            <div className={styles.iconWrapper}>
              <CartIcon />

              {totalCartCount > 0 && (
                <span className={styles.badge}>{totalCartCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
