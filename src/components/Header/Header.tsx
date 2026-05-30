import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { useCart, useFavorites, useBodyScrollLock } from '../../hooks';

import { Logo } from '../Logo';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Navigation } from '../Navigation';
import { BurgerMenuIcon, CartIcon, CloseIcon, HeartIcon } from '../icons';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useBodyScrollLock(isMobileMenuOpen);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderQuantityBadge = (count: number) =>
    !!count && <span className={styles.quantity}>{count}</span>;

  const getHeaderLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__button, {
      [styles['header__button--active']]: isActive,
    });

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['mobile-menu__button'], {
      [styles['mobile-menu__button--active']]: isActive,
    });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Logo className={styles.header__logo} onClick={closeMobileMenu} />

          <nav className={styles.header__nav}>
            <Navigation />
          </nav>
        </div>

        <div className={styles.header__right}>
          <ThemeSwitcher />

          <div className={styles.header__links}>
            <NavLink to="/favorites" className={getHeaderLinkClass}>
              <HeartIcon />
              {renderQuantityBadge(favorites.length)}
            </NavLink>

            <NavLink to="/cart" className={getHeaderLinkClass}>
              <CartIcon />
              {renderQuantityBadge(cart.length)}
            </NavLink>
          </div>

          <button
            className={classNames(
              styles.header__button,
              styles['header__menu-btn'],
            )}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <BurgerMenuIcon />}
          </button>
        </div>
      </header>

      <aside
        className={classNames(styles['mobile-menu'], {
          [styles['mobile-menu--open']]: isMobileMenuOpen,
        })}
      >
        <Navigation
          className={styles['mobile-menu__nav']}
          onClick={closeMobileMenu}
          isVertical
        />

        <div className={styles['mobile-menu__buttons']}>
          <NavLink
            to="/favorites"
            className={getMobileLinkClass}
            onClick={closeMobileMenu}
          >
            <HeartIcon />
            {renderQuantityBadge(favorites.length)}
          </NavLink>

          <NavLink
            to="/cart"
            className={getMobileLinkClass}
            onClick={closeMobileMenu}
          >
            <CartIcon />
            {renderQuantityBadge(cart.length)}
          </NavLink>
        </div>
      </aside>
    </>
  );
};
