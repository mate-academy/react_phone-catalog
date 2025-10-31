import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useMyContext } from 'components/Contexts/Contexts';
import Logo from 'assets/icons/logo.svg';
import Menu from 'assets/icons/burger-menu.svg';
import Close from 'assets/icons/close.svg';
import Fav from 'assets/icons/favourites.svg';
import Cart from 'assets/icons/shopping-cart.svg';
import MobMenu from 'components/BurgerMenu/MobMenu';
import { useAppContext } from 'components/Contexts/AppDataContext';
import { useCategory } from 'components/Contexts/CategoryContext';

export const NavBar: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useMyContext();
  const { currentCategory } = useCategory();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuId = 'mobile-navigation';
  const { favourites, cart, getCartItemsCount } = useAppContext();

  const links = [
    { path: '/', title: 'Home' },
    { path: '/phones', title: 'phones' },
    { path: '/tablets', title: 'tablets' },
    { path: '/accessories', title: 'accessories' },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 0);
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link
            to="/"
            className={styles.logo_link}
            onClick={() => setIsMenuOpen(false)}
          >
            <img className={styles.logo_image} src={Logo} alt="site logo" />
          </Link>
        </div>

        <button
          className={styles.burger}
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <img
            className={styles.burger_image}
            src={isMenuOpen ? Close : Menu}
            alt={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </button>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map(link => (
            <Link
              key={link.title}
              to={link.path}
              className={`${styles.navLink} ${
                currentCategory === link.title.toLowerCase()
                  ? styles.isActive
                  : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopActions}>
          <Link to="/favourites" className={styles.iconBtn}>
            <div className={styles.miniContainer}>
              <img src={Fav} alt="Favorites" />
              {favourites.length > 0 && (
                <span className={styles.badge}>{favourites.length}</span>
              )}
            </div>
          </Link>
          <Link to="/cart" className={styles.iconBtn}>
            <div className={styles.miniContainer}>
              <img src={Cart} alt="Cart" />
              {cart.length > 0 && (
                <span className={styles.badge}>{getCartItemsCount()}</span>
              )}
            </div>
          </Link>
        </div>

        <MobMenu />
      </div>
    </header>
  );
};
