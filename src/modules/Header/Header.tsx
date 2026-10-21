import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import menuIcon from '../../img/icons/Menu.svg';
import closeIcon from '../../img/icons/Close.svg';
import { useFavorites } from '../context/FavoritesContext';
import styles from './Header.module.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

const getActionClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.action} ${styles.active}` : styles.action;

const getMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.menuLink} ${styles.active}` : styles.menuLink;

const getMenuActionClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.menuAction} ${styles.active}` : styles.menuAction;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalCount: cartCount } = useCart();
  const { totalCount: favoritesCount } = useFavorites();
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)');

    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" end className={styles.logo}>
          <img src="/img/icons/Logo.svg" alt="Nice Gadgets" />
        </NavLink>

        <nav className={styles.navigation}>
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/phones" end className={getNavLinkClass}>
            Phones
          </NavLink>

          <NavLink to="/tablets" className={getNavLinkClass}>
            Tablets
          </NavLink>

          <NavLink to="/accessories" className={getNavLinkClass}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={getActionClass}
            aria-label="Favorites"
          >
            <img src="/img/icons/Stroke.svg" alt="Favorite" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={getActionClass} aria-label="Cart">
            <img src="/img/icons/Cart.svg" alt="Cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <img src={isMenuOpen ? closeIcon : menuIcon} alt="" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={
          isMenuOpen ? `${styles.menu} ${styles.menuOpen}` : styles.menu
        }
      >
        <nav className={styles.menuNavigation}>
          <NavLink to="/" end className={getMenuLinkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink
            to="/phones"
            className={getMenuLinkClass}
            onClick={closeMenu}
          >
            Phones
          </NavLink>

          <NavLink
            to="/tablets"
            className={getMenuLinkClass}
            onClick={closeMenu}
          >
            Tablets
          </NavLink>

          <NavLink
            to="/accessories"
            className={getMenuLinkClass}
            onClick={closeMenu}
          >
            Accessories
          </NavLink>
        </nav>

        <div className={styles.menuActions}>
          <NavLink
            to="/favorites"
            className={getMenuActionClass}
            aria-label="Favorites"
            onClick={closeMenu}
          >
            <img src="/img/icons/Stroke.svg" alt="" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={getMenuActionClass}
            aria-label="Cart"
            onClick={closeMenu}
          >
            <img src="/img/icons/Cart.svg" alt="" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
