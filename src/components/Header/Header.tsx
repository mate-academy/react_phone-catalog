import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useMenuCloseOnResize } from '../../hooks/useMenuCloseOnResize';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { FavouriteIcon } from '../ui/FavouriteIcon';
import { CartIcon } from '../ui/CartIcon';
import { BurgerMenu } from '../BurgerMenu';
import { CloseIcon } from '../ui/CloseIcon';
import { MenuIcon } from '../ui/MenuIcon';
import { ThemeToggler } from '../ui/ThemeToggler';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useLockBodyScroll(isMenuOpen);
  useMenuCloseOnResize(isMenuOpen, closeMenu);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__top}>
          <Link to="/" className={styles.header__link}>
            <Logo className={styles.header__logo} />
          </Link>

          <Nav className={styles.header__nav} />

          <div className={styles.header__actions}>
            <ThemeToggler />
            <NavLink to="/favorites" className={styles.header__iconLink}>
              <FavouriteIcon className={styles.header__icon} />
            </NavLink>
            <CartIcon className={styles.header__iconLink} />
          </div>
          <ThemeToggler className={styles.header__themeToggleMobile} />
          <button
            className={styles.header__menu}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      <BurgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};
